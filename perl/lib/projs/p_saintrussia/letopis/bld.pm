
package projs::p_saintrussia::letopis::bld;

use strict;
use warnings;

use base qw(
	Plg::Projs::Prj
);

sub init {
	my ($self) = @_;

	$self->SUPER::init();

    my $h = {};
        
    my @k = keys %$h;

    for(@k){ $self->{$_} = $h->{$_} unless defined $self->{$_}; }

    return $self;
}

sub run {
	my ($self) = @_;

	return $self;
}

1;
 

