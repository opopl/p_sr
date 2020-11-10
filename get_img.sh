#!/bin/bash

export script="$PLG/projs/scripts/bufact/tex/get_img.pl"
export file="$P_SR/letopis.30_10_2020.news.ua.strana.2.maidan_dtp.tex"

#perl $script 
#perl $script 
#perl $script -f $file -d
#perl $script -p "letopis" -r "$P_SR" --reset
perl $script -p "letopis" -r "$P_SR"
