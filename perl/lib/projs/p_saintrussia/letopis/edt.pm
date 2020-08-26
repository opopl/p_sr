
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

sub fill_files {
    my ($self) = @_;

    $self->{files} = {};
    foreach my $ext (qw( tex pl dat )) {
        my $r = { 
            'exts' => [ $ext ],
        };
        $self->{files}->{$ext} = $self->_files($r);
    }

    return $self;
}

sub edit_tex {
    my ($self) = @_;

    my $root = $self->{root};
    my $proj = $self->{proj};

    my $files = $self->{files}->{tex} || [];
    foreach my $f (@$files) {
        my $file = catfile($root, $f);

        my @date = ($f =~ m/^(\d+)_(\d+)_(\d+)\./g);

        unless (-e $file) {
            warn sprintf( 'NO FILE: %s', $file ) . "\n";
            next;
        }

        my @lines = read_file($file);
        my @nlines;

        foreach(@lines) {
            chomp;

            s/(\s+)–(\s+)/$1---$2/g;
            s/(\d+)–(\d+)/$1-$2/g;

            if (@date) {
                # body...
            }

            push @nlines, $_;
        }
        write_file($file,join("\n",@nlines) . "\n");
    }

    return $self;
}

sub run {
    my ($self) = @_;

    my $root = $self->{root};
    my $proj = $self->{proj};

    $self
        ->fill_files
        ->edit_tex
        ;

    return $self;
}

1;
 

