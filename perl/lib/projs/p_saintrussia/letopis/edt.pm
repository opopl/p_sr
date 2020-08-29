
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

sub _sub_edit_line {
    my $self = shift;

    local $_ = shift;

    #s/^\s*//g;
    #s/\s*$//g;

    my ($ref,$run) = @_;

    my $re = $self->{re};

    s/(\s+)–(\s+)/$1---$2/g;
    s/(\d+)–(\d+)/$1-$2/g;

    s/index\.cities\.rus/cities.rus/g;
    #s/index\.names\.rus/names.rus/g;
    #s/index\.authors\.rus/authors.rus/g;
    #s/index\.rus/rus/g;
    #s/index\.eng/eng/g;

    my $date_sec = $ref->{date_sec} || {};
    my $is_date = keys %$date_sec ? 1 : 0;

    my $sec = $ref->{sec};

    if (/$re->{sec}/) {
        return $_ if $run->{sec_done};

        my @sec_plus; 

        push @sec_plus, 
               sprintf(q{\label{sec:%s}},$sec),
               ;

        my $sec_plus = join("\n",@sec_plus);

        my $secname  = $+{secname};
        my $sectitle = $+{sectitle};

        my $date_str = $ref->{date_str};

        my $new_sec = ($is_date && $date_str) ? $date_str : $sectitle;

        s/$re->{sec}/\\$secname\{$new_sec\}\n$sec_plus/g;

        $run->{sec_done} = 1;

        return $_;

    }

    s/^\\label\{sec:$sec\}.*//g;
    s/^\s*%edt\s*\n\s*\n//g;
    
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
        
    my @k = keys %$h;

    for(@k){ 
        $self->{$_} = $h->{$_} unless defined $self->{$_}; 
    }

    return $self;
}



1;
 

