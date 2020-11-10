#!/bin/bash

export script="$PLG/projs/scripts/bufact/tex/get_img.pl"

opts=""
opts="$opts --cmd count"
opts="$opts --proj letopis"
opts="$opts --root $P_SR"

perl $script $opts
