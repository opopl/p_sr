#!/bin/sh

export srv=$PLG/projs/web_scraping/py3/r_bs_srv.py
python3 $srv -c init_bs -y mix.yaml -z "../../letopis.zlan"
