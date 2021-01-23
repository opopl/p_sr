
import os,sys

def add_libs(libs):
  for lib in libs:
    if not lib in sys.path:
      sys.path.append(lib)

plg = os.environ.get('PLG')
add_libs([ os.path.join(plg,'projs','python','lib') ])
import Base.Util as util

class Page:
  def get_date(self,ref={}):
    soup = util.get(ref,'soup')
