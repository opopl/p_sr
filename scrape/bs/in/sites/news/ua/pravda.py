
import os,sys,re
import datetime
import cyrtranslit

import Base.DBW as dbw
import Base.Util as util
import Base.Const as const

from Base.Scraper.PageParser import RootPageParser

class PageParser(RootPageParser):



  def generate_ii(self,ref={}):
    super().generate_ii(ref)

    return self

  def get_author(self,ref={}):
    super().get_author(ref)

    app = self.app

    if util.get(app.page,'author_id'):
      return self

    d_parse = {}

    host = app.page.get('host','')
    m = re.match(r'^blogs\.',host)
    if m:
      el = app.soup.select_one('.bauthor a')
      if el:
        str = el.string.strip()
        d_parse['str'] = str
        if el.has_attr('href'):
          href = el['href']
          u = util.url_parse(href)
          if not u['netloc']:
            href = util.url_join(app.page.baseurl, href)

        d_parse['url'] = href

    self.auth_obj.parse(d_parse)

    return self

  def get_date_html(self,ref={}):
    super().get_date_html(ref)

    app = self.app

    if util.get(app.page,'date'):
      return self

    host = app.page.get('host','')
    m = re.match(r'^blogs\.',host)
    if m:
      sels = self._sels('get_date_html')
      for sel in sels:
        find = sel.get('find')
        sep  = sel.get('split',const.comma)

        if not find:
         continue

        el = app.soup.select_one(find)
        if el:
          date_s = el.string.strip().split(sep)[0]
          m = re.match(r'^(\d+)\s+(\w+)\s+(\d+)',date_s)
          if m:
            day       = m.group(1)
            month_gen = m.group(2)
            year      = m.group(3)
    
            for lang in self.langs:
              month = self.month_map_genitive.get(lang,{}).get(month_gen,'')
      
              if month:
                date = '_'.join([day,month,year])
                app.page.set({ 'date' :  date })
                return self

    return self

  def get_date(self,ref={}):
    super().get_date(ref)

    app = self.app
    if util.get(app.page,'date'):
      return self

    return self

  def get_date_url(self,ref={}):
    super().get_date_url(ref)

    app = self.app
    if util.get(app.page,'date'):
      return self

    m = re.match(r'^[/]*(\w+)/(\d{4})/(\d{2})/(\d{2})/',self.url_path)
    if m:
      category = m.group(1)
      year     = m.group(2)
      month    = m.group(3)
      day      = m.group(4)

      date = '_'.join([day,month,year])
      app.page.set({ 'date' :  date })
      return self

#    if len(self.url_parts) > 3:
      #if parts[0] in util.qw('news travel culture society'):
        #year  = parts[1]
        #month = parts[2]
        #day   = parts[3]

        #date = '_'.join([day,month,year])
        #app.page.set({ 'date' :  date })

    return self
