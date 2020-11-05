#!/bin/bash

export script="$PLG/projs/scripts/bufact/tex/list_img.pl"
export file="$P_SR/letopis.30_10_2020.news.ua.strana.2.maidan_dtp.tex"

perl $script -f $file
