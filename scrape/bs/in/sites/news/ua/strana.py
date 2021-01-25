
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

class Page:
  soup = None
  app = None
  date_format = ''

  def __init__(self,args={}):
    for k, v in args.items():
      setattr(self, k, v)

  def get_author(self,ref={}):
    els = self.soup.select('span.author-article a')

    auth_ids = []
    auth_list = []
    for e in els:
      auth = None

      auth_url  = urljoin(self.app.base_url, e['href'])
      auth_bare = e.string
      if auth_bare:
        aa = auth_bare.split(' ')
        if len(aa) == 2:
          first_name = aa[0]
          last_name  = aa[1]

          auth_id = f'{last_name}_{first_name}'.lower()
          auth_id = cyrtranslit.to_latin(auth_id,'ru')

          auth_db = self.app._db_get_auth({ 'auth_id' : auth_id })
          if not auth_db:
            auth_name = f'{last_name}, {first_name}'
          else:
            auth_name = auth_db.get('name')
            if not auth_url:
              auth_url = auth_db.get('url')

          auth_ids.append(auth_id)

          auth = {
            'id'   : auth_id,
            'name' : auth_name,
            'url'  : auth_url,
          }
          auth_list.append(auth)

          if not auth_db:
            d = {
              'db_file' : self.app.url_db,
              'table'   : 'authors',
              'insert'  : auth,
            }
            dbw.insert_dict(d)


    author_id = ','.join(auth_ids)

    self.app.page.update({ 'author_id' : author_id })

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
