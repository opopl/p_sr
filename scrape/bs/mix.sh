#!/bin/sh

export bs=$PLG/projs/web_scraping/py3/bs.py
python3 $bs -c run -y mix.yaml -z "../../letopis.zlan"
