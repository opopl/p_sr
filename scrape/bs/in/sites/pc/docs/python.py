
import os,sys,re
import datetime
import cyrtranslit

import Base.DBW as dbw
import Base.Util as util
import Base.String as string
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

    el = app.soup.select_one('.footer')
    if el:
      txt = el.get_text()
      lines = string.split_n_trim(txt)
      for line in lines:
        m = re.match(r'^Last updated on\s+(.*)\.\s*$',line)
        if m:
          date_bare = m.group(1)
          try:
            dt = datetime.datetime.strptime(date_bare,'%b %d, %Y')
            date = dt.strftime('%d_%m_%Y')
            app.page.set({ 'date' : date })
          except:
            pass

    return self
