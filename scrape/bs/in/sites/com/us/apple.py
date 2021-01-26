# ----------------------------
import os,sys
import datetime

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
    soup = self.soup
    app  = self.app

    return self

  def get_date(self,ref={}):
    soup = self.soup
    app  = self.app

    e = soup.select_one('.mod-date time')

    if e and e.has_attr('datetime'):
      s = e['datetime']

      f = "%Y-%m-%d"
      d = datetime.datetime.strptime(s,f)
      date = d.strftime('%d_%m_%Y')
      self.app.page['date'] = date

    return self
