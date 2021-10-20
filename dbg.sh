#!/bin/sh

proj="letopis"
act="compile"
config="xelatex"
trg="_buf.20_10_2021.fb.titarenko_lubov.1.s_durakom_ne_sporjte"

perl -d $proj.bld.pl $act -c $config -t $trg
