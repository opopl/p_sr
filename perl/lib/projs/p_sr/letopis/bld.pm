
package projs::p_sr::letopis::bld;

use utf8;
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

    my @keys = qw( entry chat chat_public );
    my $s_lines = {
       'entry' => sub {
           my ($friend, $fdir) = @_;
           return [
              '','\ifcmt',' import',
              ' @path ' . $fdir,
              ' @match p.png',
              ' @tags scrn,profil,demidov,ok_ru,profil_img',
              sprintf(' @tags ok.user.%s', $friend),
              '\fi'
           ];
        },
    };

    my $map_key_secs = {
       'chat' => 'Чат',
       'chat_public' => 'Чат - Публичное',
    };
    foreach my $key (@keys) {
       next if $key eq 'entry';

       my $sec_key = $map_key_secs->{$key};

       $s_lines->{$key} = sub {
           my ($friend, $fdir) = @_;
           return [
              '',sprintf('\subsubsection{%s}',$sec_key),
              '','\ifcmt',' import',
              ' @path ' . $fdir,
              ' @match Screenshot*.png',
              ' @tab cols=2,no_fig,center',
              sprintf(' @tags scrn,profil,demidov,ok_ru,%s', $key),
              sprintf(' @tags ok.user.%s', $friend),
              '\fi'
           ];
       };
    }
    
    my @friends = $rule->in($root_dir);
    foreach my $friend (@friends) {
        foreach my $key (@keys) {
            my @a_key = $key eq 'entry' ? () : $key;
            my $fsec  = join('.' => $root_sec, $friend, @a_key );
            my $fdir  = catfile($root_dir, $friend, @a_key);

            next unless -d $fdir;

            my $parent = @a_key ? join('.' => $root_sec, $friend) : $root_sec;

            my $sd = $bld->_sec_data({
               proj => $proj,
               sec  => $fsec,
            });
 
            unless($sd && $bld->_sec_exist({ sd => $sd })){
                my $flines = $s_lines->{$key}->($friend, $fdir);

                print qq{creating child section: $fsec} . "\n";
                $DB::single = 1;
    
                $bld->sec_new_child({
                   proj  => $proj,
                   sec   => $parent,
                   child => $fsec,
                   lines => $flines
                });
            }
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
