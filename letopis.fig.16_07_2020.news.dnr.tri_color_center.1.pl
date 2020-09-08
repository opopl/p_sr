#!/usr/bin/env perl 

use strict;
use warnings;
use utf8;

use Data::Dumper qw(Dumper);

use base qw(
    Plg::Projs::Prj::Img
);

my $r = {
	tags_img_new => [ qw( 16_07_2020.news.dnr.tri_color_center.1 ) ],
	num_cols     => 3,
	range        => [( 1 .. 7 )],
	width_cell   => 0.3,
	width_last   => 0.5,
	load_pwg     => 1,
};

__PACKAGE__->new(%$r)->run;
