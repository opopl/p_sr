#!/bin/bash

export script="$PLG/projs/scripts/bufact/tex/get_img.pl"

#export file="$P_SR/letopis.30_10_2020.news.ua.strana.2.maidan_dtp.tex"

#perl $script -f $file -d
#perl $script -p "letopis" -r "$P_SR" --reset
#perl -d $script -p "letopis"

#perl $script -p "letopis"
#export file="$P_SR/letopis.12_09_2021.fb.semesjuk_ivan.1.chelovek_prividenie.tex"

#export file="letopis.24_12_2021.stz.news.ru.kp.1.doneck_jolka.pic.1.tex"
#export sec="29_01_2022.fb.druzenko_gennadiy.1.chy_bude_vijna"
#export sec="29_01_2022.fb.druzenko_gennadiy.1.chy_bude_vijna"

#export sec="topics.vojna.my.12.profil.friends.tetjana_rudenko.chat"
#export sec="topics.vojna.my.12.profil.friends.tetjana_rudenko"
#export sec="topics.vojna.my.12.profil.friends.petr_petrov.chat"
#export sec="topics.vojna.my.12.profil.friends.alla_nodj.chat"
#export sec="topics.vojna.my.12.profil.friends.maria_mazur_stasjuk.chat"
#export sec="topics.vojna.my.12.profil.friends.ksusha_ukraine.chat"
#export sec="topics.vojna.my.12.profil.friends.gusev_valera.chat_public"
#export sec="topics.vojna.my.12.profil.friends.guculka_ksenja.chat"
#export sec="topics.vojna.my.12.profil.friends.reverso_context.chat"
#export sec="topics.vojna.my.12.profil.friends.kalina.chat"
#export sec="topics.vojna.my.12.profil.friends.ukraina_najkrascha_kraina.chat"
#export sec="18_11_2022.fb.golovanj_andrij.ua.mariupol.muzykant.1.koncert_herson"
#export sec="topics.vojna.my.7.matrica.pics.nashe.potok"
#export sec="topics.vojna.my.7.matrica.pics.vragi"
export sec="18_11_2022.fb.podoljanchuk_diana.ua.1.zvit"
export file="letopis.$sec.tex"
#on-perl-db
#prj-get-img -f $file --img_root img_root --with_children
prj-get-img -f $file --img_root img_root
