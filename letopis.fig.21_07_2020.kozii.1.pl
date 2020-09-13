#!/usr/bin/env perl 

use strict;
use warnings;
use utf8;

use Data::Dumper qw(Dumper);

use base qw(
    Plg::Projs::Prj::Img
);

my $r = {
	tags_img_new => [ qw( 21_07_2020.kozii.1 ) ],
	num_cols     => 2,
	range        => [( 1 .. 2 )],
	width_cell   => 0.3,
	width_last   => 0.5,
	load_pwg     => 1,
};

__PACKAGE__->new(%$r)->run;
