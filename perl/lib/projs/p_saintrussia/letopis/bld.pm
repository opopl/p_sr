
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

    return $self;
}

sub run_pdflatex {
	my ($self) = @_;

    local @ARGV = ();

	my $x = Plg::Projs::Build::PdfLatex->new(
		skip_get_opt => 1,
		proj         => $self->{proj},
		root         => $self->{root},
		root_id      => $self->{root_id},
		cmd          => 'build_pwg',
	);

	$x->run;

	return $self;
}


sub run {
	my ($self) = @_;

	$self->run_pdflatex;


	return $self;
}

1;
 

