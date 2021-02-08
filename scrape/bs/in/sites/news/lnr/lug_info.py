
import os,sys,re
import datetime
import cyrtranslit

import Base.DBW as dbw
import Base.Util as util
import Base.Const as const

from Base.Scraper.PageParser import RootPageParser

class PageParser(RootPageParser):

  month_map = {
    'января'   : '01',
    'февраля'  : '02',
    'марта'    : '03',
    'апреля'   : '04',
    'мая'      : '05',
    'июня'     : '06',
    'июля'     : '07',
    'августа'  : '08',
    'сентября' : '09',
    'октября'  : '10',
    'ноября'   : '11',
    'декабря'  : '12',
  }

  def __init__(self,ref={}):
    super().__init__(ref)

    self.months = list(self.month_map.keys())

  def generate_ii(self,ref={}):
    super().generate_ii(ref)

    return self

  def get_date(self,ref={}):
    super().get_date(ref)

    app = self.app
    soup = app.soup

    date = None

    ss = soup.select_one('.middle_news_date p').string.strip()
    sa = ss.split()
    while len(sa):
      s = sa.pop(0)

      m = re.match(r'(\d{2})',s)

    import pdb; pdb.set_trace()

    if date:
      app.page.set({ 'date' : date })

    return self
