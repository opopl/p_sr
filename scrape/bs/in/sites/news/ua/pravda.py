
import os,sys,re
import datetime
import cyrtranslit

import Base.DBW as dbw
import Base.Util as util
import Base.Const as const

from Base.Scraper.PageParser import RootPageParser

class PageParser(RootPageParser):
  def generate_ii(self,ref={}):
    super().generate_ii(ref)

    return self

  def get_date(self,ref={}):
    super().get_date(ref)

    app = self.app

    if util.get(app.page,'date'):
      return self

    url = app.page.url

    u = util.url_parse(url)

    path = u['path']
    parts = path.split('/')

    f = filter(lambda x: len(x) > 0, path.split('/') )
    parts = list(f)

    if len(parts) > 3:
      if parts[0] in util.qw('news travel'):
        year  = parts[1]
        month = parts[2]
        day   = parts[3]

        date = '_'.join([day,month,year])
        app.page.set({ 'date' :  date })

    return self
