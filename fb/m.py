#!/usr/bin/env python3

from Base.Scraper.Models import mAuthors, mProjs, mPages
import os,sys,re

import Base.Util as util

url = 'https://www.facebook.com/permalink.php?story_fbid=3032849666973660&id=100007459690216'
#a = list(mAuthors.select().where(mAuthors.id.contains('oleg')).dicts())

u = util.url_parse(url,{ 'rm_query' : 0 })

a = list(mProjs.select().where(mProjs.url == url).dicts())
b = list(mPages.select().where(mPages.url == url).dicts())

import pdb; pdb.set_trace()
