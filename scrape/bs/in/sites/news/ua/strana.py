
import os,sys,re
import datetime
import cyrtranslit

from urllib.parse import urlparse
from urllib.parse import urljoin

def add_libs(libs):
  for lib in libs:
    if not lib in sys.path:
      sys.path.append(lib)

plg = os.environ.get('PLG')
add_libs([ os.path.join(plg,'projs','python','lib') ])
import Base.Util as util

class Page:
  soup = None
  app = None
  date_format = ''

  def __init__(self,args={}):
    for k, v in args.items():
      setattr(self, k, v)

  def get_author(self,ref={}):
    els = self.soup.select('span.author-article a')

    for e in els:
      author_url = urljoin(self.app.base_url, e['href'])
      author_bare = e.string
      if author_bare:
        aa = author_bare.split(' ')
        if len(aa) == 2:
          first_name = aa[0]
          last_name  = aa[1]
          author = f'{last_name}, {first_name}'
          author_id = f'{last_name}_{first_name}'.lower()
          author_id = cyrtranslit.to_latin(author_id,'ru')
        

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
