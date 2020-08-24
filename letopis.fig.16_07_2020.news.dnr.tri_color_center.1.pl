#!/usr/bin/env perl 

use strict;
use warnings;
use utf8;

use Data::Dumper qw(Dumper);

package sec;

use Plg::Projs::Piwigo::SQL;
use base qw(
    Plg::Projs::Prj
);

sub init {
    my ($self) = @_;

    $self->SUPER::init();

    my @tags_base;
    push @tags_base,
        @{$self->{tags_img}},
        qw(16_07_2020.news.dnr.tri_color_center.1),
        ;

    my $h = {
        tags_base => [@tags_base]
    };
        
    my @k = keys %$h;

    for(@k){ $self->{$_} = $h->{$_} unless defined $self->{$_}; }

    return $self;
}

sub run {
    my ($self) = @_;

    my $pwg = $self->{pwg};
    my @tags_base = @{$self->{tags_base}};
    
    my @range = ( 1 .. 6 );
    
    my @tex_lines;
    
    my $cols = 3;
    
    push @tex_lines,sprintf(q{\begin{tabular}{%s}},'c' x $cols);
    
    my $w = 0.3;
    
    foreach my $num (@range) {
        my $eol = ( $num % $cols == 0 ) ? q{\\\\} : q{&};
    
        push @tex_lines,
            $pwg->_img_include_graphics({ 
                 width => $w, 
                 tags  => [ @tags_base, $num] }),
            $eol,
            '%' . 'x' x 50,
            ;
    }

    push @tex_lines,
        q{\end{tabular}},
        $pwg->_img_include_graphics({ 
                width => 0.5, 
                align => 'center',
                tags  => [ @tags_base, 7 ] 
        });
    
    my $tex = join("\n",@tex_lines);
    print $tex . "\n";

}

package main;

sec->new->run;
