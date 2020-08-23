#!/usr/bin/env perl 

use strict;
use warnings;
use utf8;

use Data::Dumper qw(Dumper);
use FindBin qw($Bin $Script);
use File::Basename qw(basename dirname);

my ($proj)  = ($Script =~ m/^(\w+)\..*$/);
my $root_id = basename($Bin);
my $root    = $Bin;

use Plg::Projs::Piwigo::SQL;

my @tags_base;
push @tags_base,
    qw(projs),
    ($proj, $root_id),
    qw(16_07_2020.news.dnr.tri_color_center.1)
    ;

my @range = ( 1 .. 6 );

my $pwg = Plg::Projs::Piwigo::SQL->new;

my @tex_lines;

my $cols = 3;

push @tex_lines,sprintf(q{\begin{tabular}{%s}},'c' x $cols);

my $w = 0.3;
my $pic_opts = sub { sprintf(q{width=%s\textwidth},shift); };

sub _include_graphics {
    my ($ref) = @_;

    my $w        = $ref->{width};
    my $rel_path = $ref->{rel_path};

    my @tex;
    push @tex,
        sprintf(q{\def\picpath{\imgroot/%s}},$rel_path),
        sprintf(q{\includegraphics[%s]{\picpath}},$pic_opts->($w))
        ;

    return @tex;
}

foreach my $num (@range) {
    my @tags;

    push @tags,
        @tags_base,$num;

    my @img = $pwg->_img_by_tags({ tags => [@tags] });
    my $first = shift @img;

    my $rel_path = $first->{rel_path};

    my $eol = ( $num % $cols == 0 ) ? q{\\\\} : q{&};

    push @tex_lines,
        _include_graphics({ width => $w, rel_path => $rel_path }),
        $eol,
        '%' . 'x' x 50,
        ;
}
push @tex_lines,q{\end{tabular}};

my $tex = join("\n",@tex_lines);
print $tex . "\n";
