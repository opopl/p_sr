
package projs::p_saintrussia::letopis::edt;

use strict;
use warnings;

use Data::Dumper qw(Dumper);

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

    my $files = $self->_files;
    print Dumper($files) . "\n";

    return $self;
}

1;
 

