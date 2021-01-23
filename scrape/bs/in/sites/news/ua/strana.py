
import os,sys,re
import datetime

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

  def get_date(self,ref={}):
    e = self.soup.select_one('time.date span.strana-adate')
    if e and e.has_attr('data-time'):
      s = e['data-time']
      f = "%Y-%m-%d %H:%M:%S"
      d = datetime.datetime.strptime(s,f)
      date = d.strftime('%d_%m_%Y')

    return self
