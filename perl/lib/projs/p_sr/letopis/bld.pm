
package projs::p_sr::letopis::bld;

use utf8;
use strict;
use warnings;

use FindBin qw($Bin $Script);
use Data::Dumper qw(Dumper);

use File::Spec::Functions qw(catfile);
use Getopt::Long qw(GetOptions);

use File::Spec::Functions qw(catfile);
use File::Path qw(mkpath);
use File::Copy qw(copy);
use File::Slurp::Unicode qw(
  write_file
);
use Encode qw(encode);

use Data::Dumper qw(Dumper);
use DateTime;
use Clone qw(clone);

use YAML::XS qw();
use Text::Template;

use Base::Arg qw(
    hash_update
    varval
);

use base qw(
    Plg::Projs::Prj::Builder
);

use Base::DB qw(
    dbh_do
    dbi_connect
    dbh_create_tables
    dbh_select_as_list
    dbh_select
    dbh_select_fetchone
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
              'scr_profil'  => sub { $bld->act_scr_profil; },
              'img'         => sub { $bld->act_img; },
              'fill_vojna'  => sub { $bld->act_fill_vojna; },
              'db_dates'    => sub { $bld->act_db_dates; },
              'db_sql'      => sub { $bld->act_db_sql; },
              'db_auth'     => sub { $bld->act_db_auth; },
              'update_html' => sub { $bld->act_update_html; },
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

sub sec_create_topics_vojna_day {
    my ($bld, $dict) = @_;
    $dict ||= {};

    # sections
    my ( $sec_date, $sec_day, $sec_week) = @{$dict}{qw( sec_date sec_day sec_week )};

    # DateTime instance
    my ( $dt ) = @{$dict}{qw( dt )};

    # count data
    my ( $c_day, $c_week, $c_day_w ) = @{$dict}{ qw( day week day_w )};

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

    #my $now = DateTime->now;
    my $now = DateTime->new(day => 20, month => 11, year => 2023 );
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
                  $bld->sec_create_topics_vojna_day($dict);

               } elsif ($k eq 'week') {
                  #$bld->sec_create_topics_vojna_week({ week => $count->{week} })
               }
            }
        }

        #sec_day should be a child of sec_week

        $dt->add(days => 1);
    }
    #print Dumper([@secs]) . "\n";

    return $bld;
}


sub act_img_url2md5_select {
    my ($bld, $ref) = @_;
    $ref ||= {};

    my $imgman = $bld->{imgman};
    my $dbh_img = $imgman->{dbh};
    my $img_root = $imgman->{img_root};

    my $tm_dir    = catfile($ENV{PLG}, qw( projs templates perl ));

    my $y_file = catfile($bld->{root},qw(in img_url2md5_select.yaml ));
    return $bld unless -f $y_file;

    my $y_data = YAML::XS::LoadFile($y_file);

    my ($limit, $q);

    my $limit_s = $limit ? qq{ LIMIT $limit } : '';
    my ($md5_cond, @md5_cond_and);

    my @md5_exclude = @{varval('md5.exclude',$y_data) || []};
    my @md5_include = @{varval('md5.include',$y_data) || []};

    push @md5_cond_and, sprintf('I.md5 NOT IN (%s)',join("," => map { qq{'$_'} } @md5_exclude) )
        if @md5_exclude;
    push @md5_cond_and, sprintf('I.md5 IN (%s)',join("," => map { qq{'$_'} } @md5_include) )
        if @md5_include;
    $md5_cond = join(" AND ", map { qq{( $_ )} } @md5_cond_and) if @md5_cond_and;
    $md5_cond = 'WHERE ' . $md5_cond if $md5_cond;

    $q = Text::Template
                ->new(SOURCE => catfile($tm_dir,qw( sql imgs.psql )))
                ->fill_in(HASH => {
                        md5_cond => $md5_cond,
                        limit_s => $limit_s
                 });

    my $ref_db = {
        dbh => $dbh_img,
        q => $q,
        p => [],
    };

    my ($rows) = eval { dbh_select($ref_db); };
    if ($@) {
        warn $@;
        return $bld;
    }
    #print Dumper($rows) . "\n";
    #$DB::single = 1;

    my $js_root   = catfile($ENV{REPOSGIT}, qw( js_root ));
    my $tm_file   = catfile($tm_dir, qw( html imgs.phtml ));
    my $tm = Text::Template->new(TYPE => 'FILE', SOURCE => $tm_file);
    my $vars = {
        rows => $rows,
        #dlm => $dlm,
        cols => [qw( rowid inum md5 url img )],
        img_root => $img_root,
    };
    my $html_imgs = $tm->fill_in(HASH => $vars);

    my $tm_file_page =  catfile($tm_dir, qw( html page.phtml ));

    my $page_vars = {
       body => $html_imgs,
       js_root => $js_root,
    };
    my $html = Text::Template
                ->new(SOURCE => $tm_file_page)
                ->fill_in(HASH => $page_vars)
                ;
    #$imgman->_db_img_one({ where => { md5 => $md5 }});

    $DB::single = 1;
    my $html_dir = catfile(@{$bld}{qw( htmlout rootid proj )}, qw(tmp));
    mkpath $html_dir unless -d $html_dir;
    my $html_file = catfile($html_dir, qw( img.html ));

    $ref->{res} ||= $html;
    $ref->{status} = 200;

    write_file($html_file, $html);
    #my $html_dir = catfile($ENV{HTMLOUT},$);

    return $bld;
}

sub act_img_url2md5_mtime {
    my ($bld) = @_;

    my $imgman = $bld->{imgman};
    my $dbh_img = $imgman->{dbh};

    #my $q = q{
        #INSERT INTO url2md5
        #SELECT umo.url, umo.md5, umo.sec, umo.proj, i.mtime FROM url2md5_old umo
        #INNER JOIN imgs i
        #ON umo.md5 = i.md5
    #};
#    my $q = q{
        #INSERT INTO url2md5
        #SELECT umo.url, umo.md5, umo.sec, umo.proj, i.mtime FROM url2md5_old umo
        #INNER JOIN imgs i
        #ON umo.md5 = i.md5
    #};

    #dbh_do({
        #dbh => $dbh_img,
        #q => $q,
        #p => [],
    #});
    #
#    dbh_do({
        #dbh => $dbh_img,
        #q => q{
                #-- DROP VIEW IF EXISTS ii;
                #-- CREATE VIEW IF NOT EXISTS vfs AS
                   #-- SELECT catfile(env('IMG_ROOT'),img) img_file, md5, url FROM imgs;

                #update imgs
                #set mtime = file_mtime(catfile(env('IMG_ROOT'),img))
                #where mtime is null
        #},
        #p => [],
    #});
    #
#    dbh_do({
        #dbh => $dbh_img,
        #q => q{
            #-- insert into url2md5
            #-- select url, md5, mtime, sec, proj
            #-- from imgs;

            #insert into url2md5
            #select
                #umo.url url,
                #umo.md5 md5,
                #i.mtime mtime,
                #umo.sec sec,
                #umo.proj proj
              #from url2md5_old
                   #umo
              #inner join imgs
                         #i
              #on umo.md5 = i.md5
            #on conflict(url) do update set mtime=excluded.mtime
        #},
        #p => [],
    #});

#todo
    #my ($rows) = dbh_select({
        #dbh => $dbh_img,
        #q => q{ SELECT COUNT(*) FROM imgs WHERE mtime IS NULL },
#        q => q{
            #select
                #umo.url url,
                #umo.md5 md5,
                #i.mtime mtime,
                #umo.sec sec,
                #umo.proj proj
              #from url2md5_old AS umo
              #inner join imgs AS i
              #on umo.md5 = i.md5
              #limit 10
        #}
        #q => q{ SELECT COUNT(*) FROM imgs WHERE mtime IS NULL },
   #     q => q{
                #SELECT
                    #vfs.md5,
                    #file_mtime(img_file) mtime_fs,
                    #file_stat(img_file,'ctime') ctime_fs,
                    #i.mtime mtime_db
                #FROM vfs
                #INNER JOIN imgs i
                #ON i.md5 = vfs.md5
                #-- WHERE i.mtime is not mtime_fs and i.mtime is not null
                #WHERE ctime_fs > mtime_fs
                #LIMIT 10

                #-- SELECT catfile(env('IMG_ROOT'),img) img_file FROM imgs
                #-- LIMIT 1
                #-- from imgs
                #-- where not is_file(img_file)

                #},
        #p => [],
    #});
    #print Dumper($rows) . "\n";

    return $bld;
}


sub act_img_url2md5_insert {
    my ($bld) = @_;

    my $imgman = $bld->{imgman};
    my $dbh_img = $imgman->{dbh};

    my $q = q{
         CREATE TABLE IF NOT EXISTS url2md5 (
             url TEXT NOT NULL UNIQUE,
             md5 TEXT NOT NULL,
             FOREIGN KEY(md5) REFERENCES imgs(md5) ON DELETE CASCADE ON UPDATE CASCADE
         );

         PRAGMA foreign_keys=ON;
         -- INSERT OR IGNORE INTO url2md5
         INSERT OR REPLACE INTO url2md5
         SELECT url, md5, sec, proj FROM imgs WHERE url IS NOT NULL AND md5 IS NOT NULL;
    };

    #$q = q{
         #DROP TABLE url2md5;
         #PRAGMA foreign_keys=ON;
         #PRAGMA foreign_key_check;
    #};

    dbh_do({
        dbh => $dbh_img,
        q => $q,
        p => [],
    });

    return $bld;
}

sub act_img {
    my ($bld,$ref) = @_;
    $ref ||= {};

    $bld
        ->act_img_url2md5_mtime
        #->act_img_url2md5_insert
        #->act_img_dpl
        #->act_img_fk($ref)
        #->act_img_url2md5_select($ref)
        ;

    return $bld;
}

sub act_img_fk {
    my ($bld) = @_;

    my $imgman = $bld->{imgman};
    my $dbh_img = $imgman->{dbh};

    print 'check foreign keys for img database' . "\n";
    dbh_do({
        dbh => $dbh_img,
        q => q{
            PRAGMA foreign_keys = ON;
            PRAGMA foreign_key_check;
        },
    });

    return $bld;
}

sub act_img_dpl {
    my ($bld) = @_;

    my $imgman = $bld->{imgman};
    my $dbh_img = $imgman->{dbh};
    my $img_root = $imgman->{img_root};
    my $img_dir_dpl = catfile($img_root, qw(duplicates inum));
    mkpath $img_dir_dpl unless -d $img_dir_dpl;
    my $yml_dpl = catfile($img_dir_dpl,qw(dpl.yaml));

    my $q = q{
        SELECT * FROM imgs
        GROUP BY md5
        HAVING COUNT(*) > 1;
    };
    my $ref = {
        dbh => $dbh_img,
        q => $q,
        p => [],
    };

    my ($duplicates) = dbh_select($ref);
    return $bld unless $duplicates && @$duplicates;

    my @rows_dpl;

    dbh_do({
        dbh => $dbh_img,
        q => q{ PRAGMA foreign_keys = OFF; },
    });

    my (@lines_duplicate, @secs_duplicate);
    foreach my $duplicate (@$duplicates) {
        my ($inum_dpl, $md5_dpl, $img) = @{$duplicate}{qw(inum md5 img)};

        my ($rr) = dbh_select({
           dbh => $dbh_img,
           q => q{ SELECT * FROM imgs WHERE md5 = ? },
           #p => [ $inum_dpl ],
           p => [ $md5_dpl ],
        });
        next unless $rr && @$rr;

#        my $img_file = catfile($img_root, $img);
        #my $img_file_dpl = catfile($img_dir_dpl, $img);
        ##copy($img_file, $img_file_dpl);

        #push @rows_dpl, @$rr;
        my $first = shift @$rr;

        while(@$rr) {
            my $rx = shift @$rr;
            my $url = $rx->{url};
            next unless $url;
            dbh_do({
                dbh => $dbh_img,
                q => q{ DELETE FROM imgs WHERE url = ? },
                fk => 0,
                p => [$url],
            });
        }

#        while(@$rr) {
            #my $rx = shift @$rr;
            #my $url = $rx->{url};
            #my $sec_dpl = $rx->{sec} || '';

            #push @secs_duplicate, $sec_dpl
                #unless grep { /^$sec_dpl$/ } @secs_duplicate;

            #push @lines_duplicate,
                #'% duplicate inum = ' . $inum_dpl,
                #'% duplicate sec = ' . $sec_dpl,
                #' pic ' . $url,
                #' @reload 1',
                #' ',
                #;

#            my $inum_free = dbh_select_fetchone({
                #dbh => $dbh_img,
                #q => q{ SELECT MAX(inum) FROM imgs },
            #});
            #$inum_free++;

#            if ($rx->{md5} eq $first->{md5}) {
                #dbh_do({
                    #dbh => $dbh_img,
                    #q => q{ DELETE FROM imgs WHERE url = ? },
                #});
            #}
        #}
    }

    #YAML::XS::DumpFile($yml_dpl => {
        #rows => \@rows_dpl,
    #});
        $DB::single = 1;1;
#    my $sec = 'pics.util.duplicates';
    #$bld->sec_insert({
        #sec   => $sec,
        ##lines => [ '\ifcmt', @lines_duplicate, '\fi' ]
        #lines => [ @secs_duplicate ]
    #});

    return $bld;
}

sub act_img_0 {
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

sub act_update_html {
    my ($bld, $ref) = @_;
    $ref ||= {};

    my $proj  = $ref->{proj} || $bld->{proj};

    my $secs = $bld->_secs;
    my $r = {
        dbh => $bld->{dbh},
        q => q{ SELECT sec FROM projs WHERE proj = ? AND LENGTH(url) > 0 },
        p => [ $proj ],
    };
    my $out_dir_html = $bld->{out_dir_html};
    my $data = {};

    $secs = dbh_select_as_list($r);
    foreach my $sec (@$secs) {
        my $target = qq{_buf.$sec};
        my $html_dir = catfile($out_dir_html,$target);
        my $html_file = catfile($html_dir,'jnd_ht.html');
        next unless -f $html_file;
        $data->{$sec} = $html_file;
    }

    $DB::single = 1;

    return $bld;
}

sub act_db_auth {
    my ($bld) = @_;

    my ($date, $sec, $author_id, $q, $p);

    my $dbh = $bld->{dbh};
    my $sql_dir = catfile($ENV{PLG},qw( projs data sql ));

    dbh_do({
        dbh    => $dbh,
        q => q{
            DROP TABLE auth_details;
            DROP TABLE authors;
        }
    });

    dbh_create_tables({
       dbh         => $dbh,
       sql_dir     => $sql_dir,
       table_order => [qw( authors auth_details )],
    });

    my $dbfile_auth = catfile($ENV{HTML_ROOT},qw(h.db));
    #my $dbh_auth = dbi_connect({ dbfile => $dbfile_auth });

    dbh_do({
        dbh    => $dbh,
        q => qq{
            ATTACH DATABASE "$dbfile_auth" AS auth;
            INSERT INTO authors SELECT * FROM auth.authors;
            INSERT INTO auth_details SELECT * FROM auth.auth_details;
        }
    });

            #-- DELETE FROM auth.authors WHERE id = 'kazarin_pavel';
            #-- DELETE FROM auth.auth_details WHERE id = 'kazarin_pavel';
#    my $ref = {
        #dbh    => $dbh,
        #t => qq{auth.authors},
        #q => q{ SELECT * FROM auth.authors },
        #p => [  ],
        #limit => 10,
        ##cond => q{ WHERE  },
    #};

    #my ($rows, $cols, $q, $p) = dbh_select($ref);
    #print Dumper($rows) . "\n";


    return $bld;
}

sub act_db_sql {
    my ($bld) = @_;

    my ($date, $sec, $author_id, $q, $p);


    return $bld;
}

sub act_db_dates {
    my ($bld) = @_;

    my $pat = '^(\d+_\d+_\d+)\.';
    my $q = qq{
        UPDATE projs SET date = RGX("$pat", sec, 'g', 1) WHERE RGX("$pat",sec)
    };

    my $ref = {
        dbh    => $bld->{dbh},
        q      => $q,
    };
    my $ok = dbh_do($ref);

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
