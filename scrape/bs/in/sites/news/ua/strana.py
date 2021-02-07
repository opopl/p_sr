
import os,sys,re
import datetime
import cyrtranslit

from urllib.parse import urlparse
from urllib.parse import urljoin

import Base.DBW as dbw
import Base.Util as util
import Base.Const as const

from Base.Scraper.PageParser import RootPageParser
from Base.Scraper.Author import Author

class PageParser(RootPageParser):

  def get_date_html(self,ref={}):
    super().get_date_html(ref)

    return self
