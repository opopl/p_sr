#!/usr/bin/env python3

from lxml import etree
import lxml.html
import lxml.html.html5parser as h5

import Base.Util as util

file = 'post.html'
etree = lxml.html.parse(file)
#etree = h5.parse(file)
root = etree.getroot()
links = list(root.iterlinks())
#links = list(root.xpath('.//a'))

j = 0
for link in links:
  l = link[0]

  t = l.tag
  #if ( t in util.qw('a script link i') ):
    #continue

  j += 1
  if j == 10:
    break
  
  #c = l.getparent().text_content()
  #c = l.xpath()
  print(l.keys())
  print(l.__repr__())
  print(l.tag)
  print('parent tag - ' + l.getparent().tag)
  print(link[1])
  print(link[2])

#with open(file,'r') as f:
  #html = f.read()
