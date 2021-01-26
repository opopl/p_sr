
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

from Base.Scraper.SitePage import SitePage
from Base.Scraper.Author import Author

class Page(SitePage):

  def get_author(self,ref={}):
    sel = ref.get('sel','')
    sel = 'span.author-article a'

    auth_obj = Author({ 'spage' : self, 'app' : self.app })

    els = self.soup.select(sel)

    auth_ids = []
    auth_list = []
    for e in els:
      auth = None

      auth_url  = urljoin(self.app.base_url, e['href'])
      auth_bare = e.string
      if auth_bare:
        auth_obj.parse({ 'str' : auth_bare })

    return self

  def get_date(self,ref={}):
    e = self.soup.select_one('time.date span.strana-adate')
    if e and e.has_attr('data-time'):
      s = e['data-time']
      s = s.split(' ')[0]
      f = "%Y-%m-%d"
      d = datetime.datetime.strptime(s,f)
      date = d.strftime('%d_%m_%Y')
      self.app.page['date'] = date

    return self
