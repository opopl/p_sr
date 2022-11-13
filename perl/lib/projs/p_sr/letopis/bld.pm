
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
    my ($bld) = @_;
    
    my $h = {
        trg_list => [qw(usual)],
        tex_exe  => 'pdflatex',
        callbacks => {
          maker => {
          }
        },
        custom => {
           maps_act => {
              'scr' => sub { $bld->act_scr; },
           }
        },
    };

    hash_inject($bld, $h);

    $DB::single = 1;
    $bld->SUPER::init();

    return $bld;
}

sub act_scr {
    my ($bld) = @_;

    print qq{scr} . "\n";

    return $bld;
}

1;
