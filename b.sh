#!/bin/bash

#perl letopis.bld.pl compile -t nov_2020

#perl letopis.bld.pl compile -t vojna
#perl letopis.bld.pl compile -t vojna.volonter
#perl letopis.bld.pl compile -t vojna.herson
#perl letopis.bld.pl compile -t vojna.harkov
#perl letopis.bld.pl compile -t poetry
#perl letopis.bld.pl compile -t ki

#perl -d letopis.bld.pl compile -t topics.vojna.my.9.gruppa

#prj-get-img -a ~/Documents/lts/rashizm/ok_ru/special
#prj-get-img -c db_add_md5
#prj-lts -a db_img_md5 -c run
#prj-lts -c run -a author_db_pages_util

sec="24_11_2022.fb.filatov_boris.2.nastroenia_v_gorode"
t="_buf.$sec"
prj-bld letopis compile -c htx,box -t $t
