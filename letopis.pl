#!/usr/bin/env perl
#
#
package letopis;

use warnings;
use strict;
use Data::Dumper qw(Dumper);
use utf8;

binmode STDOUT,':encoding(utf8)';

use base qw(
    Plg::Projs::Prj
);

use Base::Arg qw( hash_inject );

sub init {
    my ($self) = @_;
    
    $self->SUPER::init();
    
    my $h = {
    };
        
    hash_inject($self, $h);
    return $self;
}

sub run {
    my ($self) = @_;

    return $self;
}

package main;

letopis->new->run;
