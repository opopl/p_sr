#!/usr/bin/env perl 

use strict;
use warnings;
use utf8;

use Data::Dumper qw(Dumper);
use projs::p_sr::letopis::bld;

my %n = (
   skip_get_opt => 1,
   act => 'web',
);
my $bld = projs::p_sr::letopis::bld->new(%n);

use Dancer2;
get '/img' => sub { 
	my $ref = {};
	$bld->act_img_url2md5_select($ref);

	$ref->{res};
};
dance; 

