
package projs::p_saintrussia::letopis::bld;

use strict;
use warnings;

use base qw(
    Plg::Projs::Prj
);
use File::Spec::Functions qw(catfile);
 
use Plg::Projs::Scripts::RunPdfLatex;

sub init {
    my ($self) = @_;

    $self->SUPER::init();



    my $h = {
    };
        
    my @k = keys %$h;

    for(@k){ $self->{$_} = $h->{$_} unless defined $self->{$_}; }

    $self->init_maker;

    return $self;
}

sub init_maker {
    my ($self) = @_;

    my @secs_include;
    push @secs_include,
        #'13_07_2020',
        #'14_07_2020',
        #'15_07_2020',
        ;

    my $x = Plg::Projs::Build::PdfLatex->new(
        skip_get_opt => 1,
        proj         => $self->{proj},
        root         => $self->{root},
        root_id      => $self->{root_id},
        cmd          => 'build_pwg',
        join_lines   => {
            include_below => [qw(section)]
        },
        sections => {
            include => \@secs_include,
        }
    );

    $self->{maker} = $x;

    return $self;
}

sub run_maker {
    my ($self) = @_;

    local @ARGV = ();
    $self->{maker}->run;

    return $self;
}


sub run {
    my ($self) = @_;

    $self->run_maker;

    return $self;
}

1;
 

