
import os,sys,re
import datetime
import cyrtranslit

from urllib.parse import urlparse
from urllib.parse import urljoin

# ----------------------------
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

from Base.Scraper.PageParser import RootPageParser
from Base.Scraper.Author import Author

class PageParser(RootPageParser):

  def get_date(self,ref={}):
    e = self.soup.select_one('time.date span.strana-adate')
    if e and e.has_attr('data-time'):
      s = e['data-time']
      s = s.split(' ')[0]
      f = "%Y-%m-%d"
      d = datetime.datetime.strptime(s,f)
      date = d.strftime('%d_%m_%Y')
      self.app.page.set({ 'date' : date })

    return self
