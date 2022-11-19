
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
use DateTime;
use Clone qw(clone);

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
              'scr_profil' => sub { $bld->act_scr_profil; },
              'img' => sub { $bld->act_img; },
              'fill_vojna' => sub { $bld->act_fill_vojna; },
           }
        },
    };

    hash_inject($bld, $h);

    $bld->SUPER::init();

    return $bld;
}

sub sec_create_topics_vojna_month {
    my ($bld, $month_s) = @_;

    # month_s = jan, feb ...

    return $bld;
}

sub sec_create_topics_vojna_date {
    my ($bld, $dict) = @_;
    $dict ||= {};

    # sections
    my ( $sec_date, $sec_day, $sec_week) = @{$dict}{qw( sec_date sec_day sec_week )};

    # DateTime instance
    my ( $dt ) = @{$dict}{qw( dt )};

    # count data
    my ( $c_day, $c_week, $c_day_w ) = @{$dict}{ qw( day week day_w )};

    my ($day, $month, $month_s, $year) = ($dt->day, $dt->month, lc $dt->month_abbr, $dt->year);
    my $sec_month = join("_", $month_s, $year);

    (my $title = $sec_date ) =~ s/_/-/g;
    my $seccmd = 'section';

    #my @m = ( 1 .. 12 );
    #my %ma;
    #foreach my $m (@m) {
        #my $dd = DateTime->new( month => $m, year => $year );
        #$ma{$m} = lc $dd->month_abbr;
    #}

    my @prepend;
    push @prepend,
        '',
        '% topics.vojna',
        sprintf('%% topics.vojna.day.%s',$c_day ),
        sprintf('%% topics.vojna.week.%s', $c_week ),
        sprintf('%% week.%s.%s', $c_week, $c_day_w ),
        ;
    my $cm = $bld->_sec_children({ sec => $sec_month });
    $DB::single = 1;
    $bld->sec_new({
        sec => $sec_date,
        parent => $sec_month,

        seccmd => $seccmd,
        title => $title,

        prepend => [@prepend],
    });

    return $bld;
}

sub sec_create_topics_vojna_week {
    my ($bld, $ref) = @_;
    $ref ||= {};

    my ($week, $append) = @{$ref}{qw( week append )};

    my $parent = 'topics.vojna.weeks';

    my $sec = sprintf('topics.vojna.week.%d', $week);
    my $sd = $bld->_sec_data({ sec => $sec });
    my $ex = $bld->_sec_exist({ sec => $sec, sd => $sd });
    return $bld unless $ex;

    $bld->sec_new({
        sec    => $sec,
        parent => $parent,

        seccmd => '',
        title => '',
        append => $append,
    });

    return $bld;
}

sub act_fill_vojna {
    my ($bld) = @_;

    my ($proj, $root, $rootid) = @{$bld}{qw( proj root root_id )};
    my $start = '24.02.2022';

    ( $start =~ /^(?<day>\d+)\.(?<month>\d+)\.(?<year>\d+)$/ );

    my $now = DateTime->now;
    my ($dt_start);
    if (keys %+) {
       $dt_start = DateTime->new(map { $_ => $+{$_} } keys %+ );
    }
    return $bld unless $dt_start;

    my $j = 0;

    # week number, full day, day of week
    my $count;
    for(qw( week day day_w )){
       $count->{$_} = 1;
    }
    my @secs;

    my $dt = clone($dt_start);
    while ($dt->epoch < $now->epoch) {
        $j++;

        #last if $j == 200;

        # duration in days from the start
        my $du = $dt->delta_days($dt_start);

        my $elapsed = {
            days => $du->in_units('days'),
            weeks => $du->in_units('weeks'),
            days_week => $du->days,
        };

        $count = {
            week  => $elapsed->{weeks} + 1,
            day   => $elapsed->{days} + 1,
            day_w => $elapsed->{days_week} + 1,
        };

        my $sec_date = $dt->strftime('%d_%m_%Y');

        my $dict = {
           sec_date => $sec_date,
           sec_day  => sprintf('topics.vojna.day.%d' , $count->{day}),
           sec_week => sprintf('topics.vojna.week.%d', $count->{week}),
           dt => $dt,
           %$count
        };
        push @secs, $dict;
###sec_date
        #if ($sec_date eq '11_08_2022') {
        #if ($sec_date eq '19_11_2022') {
            #print Dumper({ %$dict, dt => undef }) . "\n";
        #}

        foreach my $k (qw( date day week )) {
            my $sec_key = 'sec_' . $k;
            my $sec = $dict->{$sec_key};

            my $sd = $bld->_sec_data({ sec => $sec });
            my $ex = $bld->_sec_exist({ sec => $sec, sd => $sd });

            unless ($ex) {
               if ($k eq 'date') {
                  $bld->sec_create_topics_vojna_date($dict);

                  print Dumper({ %$dict, dt => undef }) . "\n";

               } elsif ($k eq 'day') {
                  #$bld->sec_create_topics_vojna_week({ week => $count->{week} })
               } elsif ($k eq 'week') {
               }
            }
        }

        #sec_day should be a child of sec_week

        $dt->add(days => 1);
    }
    #print Dumper([@secs]) . "\n";

    return $bld;
}

sub act_img {
    my ($bld) = @_;

    my ($proj, $root, $rootid) = @{$bld}{qw( proj root root_id )};
    my $imgman = $bld->{imgman};

    my $sec = '12_11_2022.fb.kokotjuha_andrij.1.donbass_zvilnemo_nam_radi';

    my @tags_a = qw( scrn );
    my $imgs = $imgman->_db_imgs({
        tags => { and => \@tags_a },
        fields => [qw( url name_orig tags )],
        mode => 'rows',
        where => {
            sec => $sec,
            proj => $proj,
        },
        limit => 10
    });
    $DB::single = 1;

    return $bld;
}

sub act_scr_profil {
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
            $imgman->load_file({ sec => $fsec });
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
