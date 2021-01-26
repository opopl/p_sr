
# ----------------------------
import os,sys,re
import datetime
import cyrtranslit

def add_libs(libs):
  for lib in libs:
    if not lib in sys.path:
      sys.path.append(lib)

plg = os.environ.get('PLG')
add_libs([ os.path.join(plg,'projs','python','lib') ])

import Base.DBW as dbw
import Base.Util as util
import Base.Const as const
# ----------------------------

from Base.Scraper.SitePage import SitePage

class Page(SitePage):
  def get_author(self,ref={}):
    app  = self.app
    soup = self.soup

    return self

  def generate_ii(self,ref={}):
    app = self.app

    if app.title:
      tt = app.page['title_h']
      tt = re.sub(r'\s', '_', tt)
      ttl = cyrtranslit.to_latin(tt,'ru').lower()
      ttl = re.sub(r'[\W\']+', '', ttl)
      app.ii = ttl

    return self

  def get_date(self,ref={}):
    app = self.app

    url = self.app.url

    u = util.url_parse(url)

    parts = u.path.split('/')

    f = filter(lambda x: len(x) > 0, u.path.split('/') )
    parts = list(f)

    if len(parts) > 3:
      if parts[0] in util.qw('articles news photo'):
        year  = parts[1]
        month = parts[2]
        day   = parts[3]

        date = '_'.join([day,month,year])
        app.page['date'] = date

    return self

