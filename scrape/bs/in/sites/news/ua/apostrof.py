
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

    for part in self.url_parts:
      m = re.match(r'^(\d{4})-(\d{2})-(\d{2})$', part)
      if m:
        year  = m.group(1)
        month = m.group(2)
        day   = m.group(3)
        date = '_'.join([day,month,year])
        app.page.set({ 'date' : date })
        break

    return self

  def clean(self,ref={}):
    super().clean(ref)

    app = self.app
    soup = app.soup

    return self
