#!/usr/bin/env perl 

use strict;
use warnings;
use utf8;

use Data::Dumper qw(Dumper);

use Plg::Projs::Piwigo::SQL;

my @tags_base;
push @tags_base,
    qw(projs letopis p_saintrussia),
    qw(16_07_2020.news.dnr.tri_color_center.1)
    ;

my @range = ( 1 .. 6 );

my $pwg = Plg::Projs::Piwigo::SQL->new;

my @tex_lines;

push @tex_lines,q{\begin{tabular}{ccc}};
foreach my $num (@range) {
    my @tags;

    push @tags,
        @tags_base,$num;

    local @ARGV = qw( -c img_by_tags );
    push @ARGV, 
        qw( -t ), join("," => @tags);

    $pwg->run;

    my @img = @{$pwg->{img} || []};
    my $first = shift @img;
}
push @tex_lines,q{\end{tabular}{ccc}};

my $tex = join("\n",@tex_lines);
print $tex . "\n";
