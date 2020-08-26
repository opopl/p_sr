
package Config::GoossensLATEXWEB;

use strict;
use warnings;

use File::Slurp qw( edit_file edit_file_lines read_file write_file );
use File::Spec::Functions qw(catfile rel2abs curdir );

use OP::Base qw( :vars :funcs );
use OP::PaperConf qw( 
        :vars 
);

sub init_vars(){

  $bkey="GoossensLATEXWEB";

  OP::PaperConf::init_vars();

  push( @$pfiles, "p.$bkey.djvu.tex" );

  OP::PaperConf::update_config(
    {
		include_tex_parts 	=> [ qw( tabs figs ) ],
		exclude_tex_parts 	=> [ qw( not eqs ) ],
		include_lists_start => [ qw( )],
		include_abstract	=> 1,
		edit_figs 			=> 0,
		titpage_width 		=> 6,
		tex_textwidth 		=> "6in",
        viewfiles           => {}
    }
    , mode  => 'append'
  );

  $config->{include_tex_parts}=[qw( tabs )];

  $config->{use_packs}=[qw(geometry)];
  $config->{pack_opts}={
      'geometry'  => 'a4paper,left=1cm,right=3cm',
  };

  my %a=(
    "ﬂ"  => "fl",
    "ﬁ"  => "fi",
    "”"   => '"',
    "—"   => '-',
  );

  %SUBSYMS=( %SUBSYMS, %a );

}

sub tex_nice_local(){

  my @cmds=qw(tableofcontents TocAt);

  OP::PaperConf::tex_nice_base();

  foreach my $pfile (@$pfiles) {
    edit_file_lines{
      s/^page//g;
    } $pfile;

    my @lines=read_file $pfile;
    foreach (@lines){
        chomp;
        next if /^\s*%/;
        
        s/documentc1ass/documentclass/g;
        s/artic1e/article/g;
        s/externa1/external/g;
        s/too1bar/toolbar/g;
        s/tit1e/title/g;
        s/ur1/url/g;
        s/1abe1/label/g;
        s/1abel/label/g;
        s/labe1/label/g;
        s/hyper1ink/hyperlink/g;
        s/1inks/links/g;
        s/sty1e/style/g;
        s/inc1ude/include/g;
        s/Fie1d/Field/g;
        s/ldlzel/label/g;
        s/ldl7el/label/g;
        s/widt\/J/width/g;
        s/widt\/a/width/g;
        s/\/aeig\/at/height/g;
        s/\/Jeig\/at/height/g;
        s/1ine/line/g;
        s/co1or/color/g;
        s/1ength/length/g;
        s/defau1t/default/g;
        s/trave1/travel/g;
        s/Specia1/Special/g;
        s/_\]avaScript/Javascript/g;
        s/1ogo/logo/g;
        s/S1ant/Slant/g;
        s/1eve1/level/g;
        s/pdf\\ \\TeX/\\pdfTEX/g;
        s/tokem/tokens/g;
        s/1ink/link/g;
        s/pdf\\TeX/\\pdfTEX/g;

        s///g;
        s///g;
        s///g;

        /^(?<before>.*)(?<old>(?<env>Figure|Table|Section)\s+(?<num>[\d\.]+))(?<after>.*)$/ && do {
            my $num=$+{num};
            my $before=$+{before};
            my $after=$+{after};
            my $env=$+{env};
            my $old=$+{old};

            ( my $newnum=$num ) =~ s/\./-/g;

            my %senv=(
              'Table'  => 'reftab',
              'Figure'  => 'reffig',
              'Section'  => 'refsec',
            );
            my $val=$old;

            if ($env eq "Section"){
                my %secnums=readhash('secdata.' . $bkey);
                $newnum=$secnums{$num} // '';
            }

            $val= "\\" . $senv{$env} . '{' . $newnum . '}' if $newnum;

            $_=$before . $val  . $after;
        };
            
    }
    write_file($pfile,join("\n",@lines) . "\n");
  }
 

}

sub main(){
  &init_vars();
  OP::PaperConf::readdat();
}

BEGIN {
  &main();
}

1;
