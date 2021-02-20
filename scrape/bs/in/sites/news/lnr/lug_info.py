
import os,sys,re
import datetime
import cyrtranslit

import Base.DBW as dbw
import Base.Util as util
import Base.Const as const

from Base.Scraper.PageParser import RootPageParser

class PageParser(RootPageParser):

  def __init__(self,ref={}):
    super().__init__(ref)

  def clean(self,ref={}):
    super().clean(ref)

    app = self.app
    soup = app.soup

    return self

  def generate_ii(self,ref={}):
    super().generate_ii(ref)

    return self

  def get_date(self,ref={}):
    super().get_date(ref)

    app = self.app
    soup = app.soup

    app = self.app
    if app.page.get('date'):
      return self

  def get_date_html(self,ref={}):
    super().get_date_html(ref)

    app = self.app
    if app.page.get('date'):
      return self

    self.get_date_html_front(ref)

    return self

  def _date_from_bare(self,sel):
    date = super()._date_from_bare(sel)
    if date:
      return date

    app = self.app
    date = None

    dt_now = datetime.datetime.today()
    d = {
      'year' : str(dt_now.year)
    }

    s = self.date_bare

    m = re.match(r'^(\w+)$',s)
    if m:
      ds      = m.group(1)
      if ds == 'сегодня':
        date = dt_now.strftime(self.date_fmt)
        return date

      if ds == 'вчера':
        dt = dt_now - datetime.timedelta(days=1)
        date = dt.strftime(self.date_fmt)
        return date

    m = re.match(r'^(\d+)\s+(\w+)\s+(\d+)$',s)
    if m:
      day       = int(m.group(1))
      year      = int(m.group(3))

      month_gen = m.group(2)

      month = None
      for lang in self.langs:
        month = self.month_map_genitive.get(lang,{}).get(month_gen,'')
        if month:
          break

      if month:
        month = int(month)
        dt = datetime.datetime(year,month,day)
        date = dt.strftime(self.date_fmt)

    return date
