
package projs::p_sr::plach_materi::bld;

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

1;

