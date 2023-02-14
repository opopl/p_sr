
// css
//require('../../css/form.css');
//require('../../css/dropdown.css');

// js
//window.$ = require('jquery');
require('webpack-jquery-ui');
require('webpack-jquery-ui/css');
require('jquery-validation');

import { PrjMan } from './PrjMan.js';

$(function(){
  window.prjman =  new PrjMan();
  prjman.run();
});

