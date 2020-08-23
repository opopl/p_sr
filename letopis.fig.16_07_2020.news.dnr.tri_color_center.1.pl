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
foreach my $num (@range) {
    my @tags;

    push @tags,
        @tags_base,$num;

    local @ARGV = qw( -c img_by_tags );
    push @ARGV, 
        qw( -t ), join("," => @tags);

    $pwg->run;

    my @img = @{$pwg->{img} || []};
    my $first = shift @img;

    my $rel_path = $first->{rel_path};

    my $eol = ( $num % $cols == 0 ) ? q{\\\\} : q{&};

    push @tex_lines,
        sprintf(q{\def\picpath{\imgroot/%s}},$rel_path),
        sprintf(q|\def\picopts{width=%s\textwidth}|,$w),
        sprintf(q{\includegraphics[\picopts]{\picpath}}),
        $eol,
        '%' . 'x' x 50,
        ;
}
push @tex_lines,q{\end{tabular}};

my $tex = join("\n",@tex_lines);
print $tex . "\n";
