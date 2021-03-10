
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
    import pdb; pdb.set_trace()

    app = self.app
    if app.page.get('date'):
      return self

    parts = self.url_parts
    path  = self.url_path

    sels = []
    sels.extend( app._cnf('PageParser.get_date.sels',[]) )
    sels.extend( app._site_data('PageParser.get_date.sels',[]) )

    for sel in sels:
      find = sel.get('find')
      if find:
        el = app.soup.select_one(find)
        if el:
          parts = self._el_date_parts(el,{ 'sep' : '|' })
          if len(parts):
            date_str = parts[0]
            try:
              dt = datetime.datetime.strptime(date_str,'%d.%m.%Y')
              date = dt.strftime('%d_%m_%Y')
              app.page.set({ 'date' : date })
            except:
              app.log(f'WARN[get_date] site: {app.page.site} failure to parse input date string: {date_str}')
              pass

    return self

  def clean(self,ref={}):
    super().clean(ref)

    app = self.app
    soup = app.soup

    return self
