#!/usr/bin/env perl 

use strict;
use warnings;
use utf8;

use Data::Dumper qw(Dumper);
use FindBin qw($Bin $Script);

use File::Find qw(find);
use File::Slurp::Unicode;

my @files;
my @exts=qw( bld.pl pm );
my @dirs;
push @dirs,$Bin;

find({ 
    wanted => sub { 
        foreach my $ext (@exts) {
            if (/\.$ext$/) {
                push @files,$File::Find::name;
            }
        }
    } 
},@dirs
);

print Dumper(\@files) . "\n";
foreach my $file (@files) {
    edit_file { 
        s/p_saintrussia/p_sr/g;
    } $file;
}
