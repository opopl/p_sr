
package projs::p_saintrussia::letopis::edt;

use strict;
use warnings;

use Data::Dumper qw(Dumper);
use File::Slurp::Unicode;
use File::Spec::Functions qw(catfile);

use utf8; 
use Encode;
binmode STDOUT, ":utf8";

use base qw(
    Plg::Projs::Prj::Edit
);

sub init {
    my ($self) = @_;

    $self->SUPER::init();

    my $h = {
        subs => {
            process_file => sub {
                my $ref = shift;

                my $f = $ref->{f};

                my @date = ($f =~ m/^(\d+)_(\d+)_(\d+)\./g);

                return $ref;
            },
            edit_line => sub {
                local $_ = shift;

                my $ref = shift;

                my @date = @{$ref->{date} || []};

                s/(\s+)–(\s+)/$1---$2/g;
                s/(\d+)–(\d+)/$1-$2/g;
    
                s/index\.cities\.rus/cities.rus/g;
                s/index\.names\.rus/names.rus/g;
                s/index\.authors\.rus/authors.rus/g;
                s/index\.rus/rus/g;
                s/index\.eng/eng/g;

                if (@date) {
                    # body...
                }

                return $_;
            }
        }
    };
        
    my @k = keys %$h;

    for(@k){ $self->{$_} = $h->{$_} unless defined $self->{$_}; }

    return $self;
}



1;
 

