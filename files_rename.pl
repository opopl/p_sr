#!/usr/bin/env perl 

use strict;
use warnings;
use utf8;

use Data::Dumper qw(Dumper);
use FindBin qw($Bin $Script);

use File::Find qw(find);
use File::Slurp qw(edit_file);
use File::Copy qw(copy move);

my @files;
my $dir = $Bin;

find({ 
    wanted => sub { 
       return unless /bld\.(\w+)\.xml/;
               
	   push @files,$_;
    } 
},$dir
);

print Dumper(\@files) . "\n";
foreach my $old (@files) {
	(my $new = $old ) =~ s/\.xml$/.tml/g;
	move($old, $new);
}
