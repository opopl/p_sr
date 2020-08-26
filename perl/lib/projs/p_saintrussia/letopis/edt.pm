
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

    my $r = { 
        'exts' => [ qw( ) ],
    };

    my $root = $self->{root};
    my $proj = $self->{proj};

    my $files = $self->_files($r);

    print Dumper($files) . "\n";

    return $self;
}

1;
 

