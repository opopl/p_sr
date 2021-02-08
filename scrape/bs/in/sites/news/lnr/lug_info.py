
import os,sys,re
import datetime
import cyrtranslit

import Base.DBW as dbw
import Base.Util as util
import Base.Const as const

from Base.Scraper.PageParser import RootPageParser

class PageParser(RootPageParser):

  month_map_genitive = {
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

    self.month_list_genitive = list(self.month_map_genitive.keys())

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

    date = None

    dt_now = datetime.datetime.now()
    d = {
      'year' : str(dt_now.year)
    }

    # --------------------------------------------------
    el = soup.select_one('.data_news_center p')
    if el:
      txt = re.sub(r'[\s\n]', '', el.text).strip()
      sa = txt.split(',')
      while len(sa):
        s = sa.pop(0)
        m = re.match('вчера',s)
        #if m:
          #day = dt_now.day - 1

    # --------------------------------------------------
    ss = soup.select_one('.middle_news_date p').string.strip()
    sa = ss.split()

    while len(sa):
      s = sa.pop(0)

      m = re.match(r'(\d{2})',s)
      if m:
        d['day'] = m.group(1)

      m = re.match(r'(\w+)',s)
      if m:
        word = m.group(1)
        if word in self.month_list_genitive:
          d['month'] = self.month_map_genitive.get(word)

    if d['day'] and d['month'] and d['year']:
      kk = util.qw('day month year')
      date = '_'.join( list(map(lambda x: d[x], kk )) )

    if date:
      app.page.set({ 'date' : date })

    return self
