
package projs::p_saintrussia::letopis::bld;

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
        insert => { 
            hyperlinks => 1,
            titletoc   => 1,
        },
        opts_maker => {
            load_dat => {
                ii_include => 0,
            },
            sections => {
                include          => [qw(
                    _base_
                    defs
                )],
                include_with_children => [qw(
                    preamble
                    titlepage
                )],
            },
        }
    };

    hash_inject($self, $h);

    $self->SUPER::init();

    return $self;
}

#sub trg_inj_usual {
    #my ($self) = @_;

    #$self->SUPER::_trg_inj_usual();
    
    #my $h = {
        #tex_exe => 'pdflatex',
        #insert => { 
            #hyperlinks => 1,
            #titletoc   => 1,
        #},
        #opts_maker => {
            #load_dat => {
                #ii_include => 1,
            #},
            #sections => {
                #include => [],
            #}
        #}
    #};

    #$self->trg_inject('usual' => $h);

    #return $self;
#}



1;
 

