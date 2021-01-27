#!/bin/sh

export bs=$PLG/projs/web_scraping/py3/bs.py
python3 $bs -y mix.yaml -z "../../letopis.zlan"
