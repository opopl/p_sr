
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

#    el = app.soup.select_one('.block-doc__date')
    #if el:
      #date_s = el.string.strip().split(',')[0]
      #m = re.match(r'^(\d+)\s+(\w+)\s+(\d+)',date_s)
      #if m:
        #day       = m.group(1)
        #month_gen = m.group(2)
        #year      = m.group(3)
  
        #month = self.month_map_genitive['rus'].get(month_gen,'')
  
        #if month:
          #date = '_'.join([day,month,year])
          #app.page.set({ 'date' :  date })
          #return self

    return self

  def clean(self,ref={}):
    super().clean(ref)

    app = self.app
    soup = app.soup

    return self
