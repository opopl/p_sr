
package projs::p_saintrussia::letopis::edt;

use strict;
use warnings;

use Data::Dumper qw(Dumper);
use File::Slurp::Unicode;
use File::Spec::Functions qw(catfile);

use utf8; 
use Encode;
#use open qw(:utf8 :std);
binmode STDOUT, ":utf8";

use base qw(
    Plg::Projs::Prj::Edit
);

sub init {
    my ($self) = @_;

    $self->SUPER::init();

    my $h = {
        subs => {
            edit_line => sub {
                local $_ = shift;

                my $ref = shift;

                s/(\s+)–(\s+)/$1---$2/g;
                s/(\d+)–(\d+)/$1-$2/g;
    
                s/index\.cities\.rus/cities.rus/g;
                s/index\.names\.rus/names.rus/g;
                s/index\.authors\.rus/authors.rus/g;
                s/index\.rus/rus/g;
                s/index\.eng/eng/g;
            }
        }
    };
        
    my @k = keys %$h;

    for(@k){ $self->{$_} = $h->{$_} unless defined $self->{$_}; }

    return $self;
}



1;
 

