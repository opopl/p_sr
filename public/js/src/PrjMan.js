
const pretty = require('pretty')
const _ = require('lodash')

//https://stackoverflow.com/questions/5347357/jquery-get-selected-element-tag-name
jQuery.fn.tagName = function() {
  return this.prop("tagName").toLowerCase()
};

function PrjMan(){

//@@ run
  this.run = function(){
    console.log('[PrjMan] start run');

    this
        .init()
    ;

    return this;
  }

//@@ init
  this.init = function(){
    const app = this

		$('#tabs_sec').tabs()

    return this
  }

}

//eof
module.exports = { PrjMan }
//export default App

