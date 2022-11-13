
package projs::p_sr::letopis::bld;

use strict;
use warnings;

use FindBin qw($Bin $Script);
use Data::Dumper qw(Dumper);

use File::Spec::Functions qw(catfile);
use Getopt::Long qw(GetOptions);

use File::Spec::Functions qw(catfile);
use Data::Dumper qw(Dumper);

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

    $bld->SUPER::init();

    return $bld;
}

sub act_scr {
    my ($bld) = @_;
    
    my ($proj, $root, $rootid) = @{$bld}{qw( proj root root_id )};
    my $imgman = $bld->{imgman};

    my $sec = 'topics.vojna.my.12.profil';
    my $root_dir = catfile($ENV{HOME},qw( Documents lts secs ), $sec, qw(friends) );
    my $root_sec = "$sec.friends";
    my $rule = File::Find::Rule->new;
    $rule->directory;
    $rule->relative;
    $rule->maxdepth(1);
    
    my @friends = $rule->in($root_dir);
    foreach my $friend (@friends) {
        my $fsec = sprintf(q{%s.%s}, $root_sec, $friend);
        my $fdir = catfile($root_dir, $friend);
        my $flines = [];
        push @$flines,
            '','\ifcmt',' import',
            ' @path ' . $fdir,
            ' @match p.png',
            sprintf(' @tags scrn,profil,demidov,ok_ru,%s,profil_img',$friend),
            '\fi';

        my $sd = $bld->_sec_data({ 
           proj => $proj,
           sec  => $fsec,
        });

        unless($sd && $bld->_sec_exist({ sd => $sd })){
            print qq{creating child section: $fsec} . "\n";
            $DB::single = 1;

            $bld->sec_new({
               proj  => $proj,
               parent => $root_sec,
               sec => $fsec,
            });
 
            $bld->sec_insert_child({
               proj  => $proj,
               sec   => $root_sec,
               child => $fsec,
            });

            $bld->sec_insert({
               proj  => $proj,
               sec => $fsec,
               lines => $flines,
            });
        }
    }

    my @tags_a = qw( ok_ru chat );
    my $imgs = $imgman->_db_imgs({
        tags => { and => \@tags_a },
        fields => [qw( url name_orig )],
        mode => 'rows',
        where => {},
        limit => 10
    });
    $DB::single = 1;

    return $bld;
}

1;
