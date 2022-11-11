#!/usr/bin/env perl

use warnings;
use strict;

use FindBin qw($Bin $Script);
use lib "$Bin/perl/lib/";

use base qw(
    projs::p_sr::letopis::bld
);

__PACKAGE__->new->run;
