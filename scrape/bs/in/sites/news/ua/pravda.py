
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

    m = re.match(r'^[/]*(\w+)/(\d{4})/(\d{2})/(\d{2})/',self.url_path)
    if m:
      category = m.group(1)
      year     = m.group(2)
      month    = m.group(3)
      day      = m.group(4)

      date = '_'.join([day,month,year])
      app.page.set({ 'date' :  date })

#    if len(self.url_parts) > 3:
      #if parts[0] in util.qw('news travel culture society'):
        #year  = parts[1]
        #month = parts[2]
        #day   = parts[3]

        #date = '_'.join([day,month,year])
        #app.page.set({ 'date' :  date })

    return self
