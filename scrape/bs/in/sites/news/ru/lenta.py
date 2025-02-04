
# ----------------------------
import os,sys,re
import datetime
import cyrtranslit

import Base.DBW as dbw
import Base.Util as util
import Base.Const as const
# ----------------------------

from Base.Scraper.PageParser import RootPageParser

class PageParser(RootPageParser):

  def generate_ii(self,ref={}):

    app = self.app

    if app.page.title:
      tt = app.page.get('title_h')
      if tt:
        tt = re.sub(r'\s', '_', tt)
        ttl = cyrtranslit.to_latin(tt,'ru').lower()
        ttl = re.sub(r'[\W\']+', '', ttl)
        app.page.ii = ttl

    return self

  def get_date(self,ref={}):
    super().get_date(ref)

    app = self.app

    if app.page.get('date'):
      return self

    parts = self.url_parts

    if len(parts) > 3:
      if parts[0] in util.qw('articles news photo brief'):
        year  = parts[1]
        month = parts[2]
        day   = parts[3]

        date = '_'.join([day,month,year])
        app.page.set({ 'date' :  date })

    return self

