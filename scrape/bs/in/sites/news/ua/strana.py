
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
    site = self.app.site

    sel = ref.get('sel','')
    auth_sel = util.get( self.app, [ 'sites', site, 'sel', 'author' ] )
    if not auth_sel:
     return self

    if type(auth_sel) is dict:
      css  = auth_sel.get('css')
      attr = auth_sel.get('attr')

      import pdb; pdb.set_trace()

      auth_obj = Author({ 
        'spage' : self, 
        'app'   : self.app 
      })
  
      els = self.soup.select(css)
  
      for e in els:
        auth = None
  
        auth_url  = urljoin(self.app.base_url, e[attr])
        auth_bare = e.string
        if auth_bare:
          auth_obj.parse({ 
            'str' : auth_bare,
            'url' : auth_url
          })

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
