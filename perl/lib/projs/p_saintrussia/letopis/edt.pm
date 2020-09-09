
package projs::p_saintrussia::letopis::edt;

use strict;
use warnings;

use Data::Dumper qw(Dumper);
use File::Slurp::Unicode;
use File::Spec::Functions qw(catfile);

use utf8; 
use Encode;
binmode STDOUT, ":utf8";

use Base::RE::TeX;
use Date::Manip;

use Base::Arg qw( hash_update );

use base qw(
    Plg::Projs::Prj::Edit
);
use Data::Dumper qw(Dumper);

sub _sub_process_file {
    my ($self, $ref) = @_;
    
    my $sec = $ref->{sec};
    
    if($sec =~ m/^(?<day>\d+)_(?<month>\d+)_(?<year>\d+)$/g){
        $ref->{date_sec} = {%+};
    
        my @date;
        push @date, 
            @+{qw(year month day)},
            qw( 0 0 0 )
            ;
    
        my $dt = $self->{dt};
        $dt->set('date',\@date);
    
        my $str = eval { $dt->printf("%d %B %Y, %A"); };
    
        if ($str) {
            $ref->{date_str} = $str;
        }
    }
    
    return $ref;
}

sub _sub_edit_line_replace {
    my $self = shift;

    local $_ = shift;

    s/(\s+)–(\s+)/$1---$2/g;
    s/(\d+)–(\d+)/$1-$2/g;

    s/index\.cities\.rus/cities.rus/g;
    s/index\.names\.rus/names.rus/g;
    s/index\.authors\.rus/authors.rus/g;
    s/index\.rus/rus/g;
    s/index\.eng/eng/g;

    return $_;
}

sub _sub_edit_line {
    my $self = shift;

    local $_ = shift;

    #s/^\s*//g;
    #s/\s*$//g;

    my ($ref,$run) = @_;

    my $re = $self->{re};

    $_ = $self->_sub('edit_line_replace',$_);

    my $date_sec = $ref->{date_sec} || {};
    my $is_date  = keys %$date_sec ? 1 : 0;

    my $sec = $ref->{sec};

    if (/$re->{sec}/) {
        return $_ if $run->{sec_done};

        $run->{sec_line} = 1;

        my @sec_plus; 

        #push @sec_plus, ;

        my $sec_plus = join("\n",@sec_plus);

        my $secname  = $+{secname};
        my $sectitle = $+{sectitle};

        my $date_str = $ref->{date_str};

        my $new_sec = ($is_date && $date_str) ? $date_str : $sectitle;

        $run->{new_sec}   = $new_sec;
        $run->{new_label} = sprintf(q{\label{sec:%s}},$sec);

        s/$re->{sec}/\\$secname\{$new_sec\}\n$sec_plus/g;

        $run->{sec_done} = 1;

        return $_;

    }


    my $new_label = $run->{new_label};
    if (/$re->{label}/) {
        if ($new_label) {
            s/$re->{label}/\\label\{sec:$sec\}/g;
        }
        $run->{new_label} = undef;
        $run->{label_done} = 1;

        return $_;
    }

    if ($run->{sec_line}) {
        $run->{sec_line} = 0;
        $run->{label_done} = 1;

        s/^(.*)$/\\label\{sec:$sec\}\n$1/g;

        return $_;
    }
    
    return $_;

}

sub init {
    my ($self) = @_;

    $self->SUPER::init();

    my $re = Base::RE::TeX->new;
    my $dt = Date::Manip::Date->new;
    $dt->config('Language' => 'russian');

    my $h = {
        re => $re,
        dt => $dt,
        subs => { }
    };

    hash_update($self, $h, { keep_already_defined => 1 });

    return $self;
}



1;
 

