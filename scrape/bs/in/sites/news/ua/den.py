
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

    return self

  def get_date_html(self,ref={}):
    super().get_date_html(ref)

    app = self.app
    if app.page.get('date'):
      return self

    return self

  # import date from input string
  def _date_from_bare(self,sel = {}):
    date = super()._date_from_bare(sel)
    if date:
      return date

    m = re.match(r'^(\d+)\s+(\w+),\s+(\d+)',self.date_bare)
    if m:
      day       = m.group(1)
      month_gen = m.group(2)
      year      = m.group(3)

      for lang in util.qw('ukr rus'):
        month = self.month_map_genitive[lang].get(month_gen,'')
    
        if month:
          date = self._date_dmy(day,month,year)
          break

    #date = None
    return date
