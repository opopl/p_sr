
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
                titletoc => [
					{
	                    scts    => [qw( section )],
	                    lines => [
		                    ' ',
		                    '\startcontents[subsections]',
		                    '\printcontents[subsections]{l}{2}{}',
		                    ' ',
							#'\setcounter{tocdepth}{2}',
	                    ]
					},
					{
	                    scts    => [qw( chapter )],
	                    lines => [
		                    ' ',
		                    '\startcontents[sections]',
							#'\printcontents[sections]{l}{1}{}',
							'\printcontents[sections]{l}{3}{}',
		                    ' ',
							#'\setcounter{tocdepth}{0}',
	                    ]

#\printcontents[hnamei]{hprefix i}{hstart-level i}[htoc-depthi]{htoc-codei}
#Print the current partial toc of hnamei kind. The format of the main toc entries are used,
#except if there is a hprefix i. In such a case, the format of hprefix ihlevel i is used, provided it is
#defined. For example, if prefix is l and the format of lsection is defined, then this definition
#will be used; otherwise, the format is that of section. The hstart-level i parameter sets the top
#level of the tocs—for a part toc it would be 0 (chapter), for a chapter toc 1 (section), and so
#on. The htoc-codei is local code for the current toc; it may be used to change the
#\contentsmargin, for instance. New 2.11 Finally, htoc-depthi sets the tocdepth locally (in
#former versions it was suggested setting this value with \setcounter in the last argument, but
#that was wrong, because this command set counters globally).
#A simple usage might look like (provided you are using titlesec as well):
						
					}
                ]
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
 

