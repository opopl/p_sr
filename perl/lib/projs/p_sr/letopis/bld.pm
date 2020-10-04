
package projs::p_sr::letopis::bld;

use strict;
use warnings;

use FindBin qw($Bin $Script);
use Data::Dumper qw(Dumper);

use File::Spec::Functions qw(catfile);
use Getopt::Long qw(GetOptions);

use Base::Arg qw(
    hash_update
);

use base qw(
    Plg::Projs::Prj::Builder
);

use Base::Arg qw( hash_inject );

sub init {
    my ($self) = @_;
    
    my $h = {
        trg_list => [qw(usual)],
        tex_exe => 'pdflatex',
    };

    hash_inject($self, $h);

    $self->SUPER::init();

    return $self;
}

1;
