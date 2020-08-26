
package projs::p_saintrussia::letopis::bld;

use strict;
use warnings;

use base qw(
    Plg::Projs::Prj
);
use FindBin qw($Bin $Script);
use Data::Dumper qw(Dumper);

use File::Spec::Functions qw(catfile);
 
use Plg::Projs::Scripts::RunPdfLatex;

sub init {
    my ($self) = @_;

    $self->SUPER::init();

    unless (@ARGV) {
        print qq{
            LOCATION:
                $0
            USAGE:
                $Script ACT
        } . "\n";
        exit 1;
    }
    my $act = shift @ARGV || 'compile';
    $self->{act} = $act; 

    my $h = {
    };
        
    my @k = keys %$h;

    for(@k){ $self->{$_} = $h->{$_} unless defined $self->{$_}; }

    $self->init_maker;

    return $self;
}

sub _insert_titletoc {
	my $self = shift;

	my @d;
	push @d,
			{
###ttt_section
             scts    => [qw( section )],
             lines => [
                 ' ',
                 '\startcontents[subsections]',
 	'\printcontents[subsections]{l}{2}{\addtocontents{ptc}{\setcounter{tocdepth}{3}}}',

             ],
             lines_stop => [
                 '\stopcontents[subsections]',
 			]
 		},
 		{
             scts    => [qw( chapter )],
             lines => [
                 ' ',
                 '\startcontents[sections]',
 	'\printcontents[sections]{l}{1}{\addtocontents{ptc}{\setcounter{tocdepth}{1}}}',
                 ' ',
             ],
             lines_stop => [
                 '\stopcontents[sections]',
 			]
 		},
		;
	return [@d];
}

sub init_maker {
    my ($self) = @_;

    my @secs_include;
    #push @secs_include,
        #'13_07_2020',
        #'14_07_2020',
        #'15_07_2020',
        ;

    my $maps_act = {
        'compile' => 'build_pwg',
        'join'    => 'insert_pwg',
    };

    my $act = $self->{act};
    my $cmd = $maps_act->{$act} || '';


    local @ARGV = ();
    my $x = Plg::Projs::Build::PdfLatex->new(
        skip_get_opt => 1,
        proj         => $self->{proj},
        root         => $self->{root},
        root_id      => $self->{root_id},
        cmd          => $cmd,
        join_lines   => {
            include_below => [qw(section)]
        },
        sections => {
            include => \@secs_include,
            insert => {
                titletoc => $self->_insert_titletoc
            },
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
 

