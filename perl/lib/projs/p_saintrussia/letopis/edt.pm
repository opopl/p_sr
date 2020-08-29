
package projs::p_saintrussia::letopis::edt;

use strict;
use warnings;

use Data::Dumper qw(Dumper);
use File::Slurp::Unicode;
use File::Spec::Functions qw(catfile);

use utf8; 
use Encode;
binmode STDOUT, ":utf8";

use base qw(
    Plg::Projs::Prj::Edit
);
use Data::Dumper qw(Dumper);

sub init {
    my ($self) = @_;

    $self->SUPER::init();

    my $h = {
        subs => {
            process_file => sub {
                my ($ref) = @_;

                my $sec = $ref->{sec};

                if($sec =~ m/^(?<day>\d+)_(?<month>\d+)_(?<year>\d+)$/g){
                    $ref->{date_sec} = {%+};
                }

                return $ref;
            },
            edit_line => sub {
                local $_ = shift;

                my ($ref,$run) = @_;

                my $date_sec = $ref->{date_sec} || {};
                my $is_date = keys %$date_sec ? 1 : 0;

                if ($is_date) {
                    my $new_sec = sprintf(
                            '\DTMdisplaydate{%s}{%s}{%s}{1}',
                            @{$date_sec}{qw(year month day)});

                    s/^\\section\{(.*)\}\s*$/\\section{$new_sec}/g;
                }

                s/(\s+)–(\s+)/$1---$2/g;
                s/(\d+)–(\d+)/$1-$2/g;
    
                s/index\.cities\.rus/cities.rus/g;
                s/index\.names\.rus/names.rus/g;
                s/index\.authors\.rus/authors.rus/g;
                s/index\.rus/rus/g;
                s/index\.eng/eng/g;

                if (keys %$date_sec) {
                }

                return $_;
            }
        }
    };
        
    my @k = keys %$h;

    for(@k){ 
        $self->{$_} = $h->{$_} unless defined $self->{$_}; 
    }

    return $self;
}



1;
 

