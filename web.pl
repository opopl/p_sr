#!/usr/bin/env perl

use strict;
use warnings;
use utf8;

use Data::Dumper qw(Dumper);
use projs::p_sr::letopis::bld;
use Dancer2;
use JSON::XS ();
use File::Spec::Functions qw(catfile);
use Image::Info qw(
    image_info
    image_type
);
use Image::ExifTool qw(ImageInfo);

#set serializer => 'JSON';
set 'logger'       => 'console';
set 'log'          => 'debug';

my $jsn = JSON::XS->new->utf8->pretty->allow_nonref;

my %n = (
   skip_get_opt => 1,
   act => 'web',
   #root => $ENV{P_SR},
);
my $bld = projs::p_sr::letopis::bld->new(%n);

my $imgman = $bld->{imgman};
my $img_root = $imgman->{img_root};

### GET /
get '/' => sub {
    redirect '/act/img/html';
};

### GET /img/raw/:inum
get '/img/raw/:inum' => sub {
    my $inum = route_parameters->get('inum');

    my $img_db = $imgman->_db_img_one({
        where => { inum => $inum },
        fields => [qw(*)],
    });
    my $img = $img_db->{img};
    my $img_file = catfile($img_root, $img);
    if (-f $img_file) {
        my $if = image_info($img_file);
        my $ct = sprintf($if->{file_media_type});
        response->content_type($ct) if $ct;
        open( my $fh, $img_file ) || die "Can't Open $img_file\n";
        binmode($fh);
        my $buffer = "";
        my $out = "";
        while (read($fh, $buffer, 10240)) {
            $out .= $buffer;
        }
        return $out;
    }
};

### GET /img/data/:inum
get '/img/data/:inum' => sub {
    my $inum = route_parameters->get('inum');

    my $img_db = $imgman->_db_img_one({
        where => { inum => $inum },
        fields => [qw(*)],
    });
    response->content_type('application/json');
    $jsn->encode($img_db);
};

### GET /act/:act
get '/act/:act/html' => sub {
    my $act = route_parameters->get('act');
    my $sub = sprintf(q{act_%s},$act);
    my $ref = {};
    $bld->$sub($ref) if $bld->can($sub);

    response->content_type('text/html');

    $ref->{res} // 'err';
};
dance;

