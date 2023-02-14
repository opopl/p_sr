
var pretty = require('pretty');

var util = require('./util.js');
var _ = require('lodash');
//
//
//
//var jcl = require('jcarousellite');
//var jcl = require('./../../node_modules/jcarousellite/jcarousellite.min.js');

//require('../../css/aria-dropdown.css');
//require('../../css/img.css');

require('../../css/jquery.dataTables.css');

require('../../sass/context-menu.scss');
require('../../sass/app.scss');
require('../../sass/flex.scss');

require('../../sass/prj.scss');
require('../../sass/prj/toggle.scss');

//require('./aria-dropdown.js');

require( 'datatables.net' );
require( 'datatables.net-dt' );
//require( 'datatables.net-buttons-dt' );
//require( 'datatables.net-buttons/js/buttons.html5.js' );

// does not work
//require( 'datetimepicker' );
const jsdatepicker = require('js-datepicker')


//const fs = require('fs');
const yaml = require('js-yaml');

const merge = require('deepmerge')

const imageinfo = require('imageinfo')
//const imageDataURI = require('image-data-uri')

//https://stackoverflow.com/questions/5347357/jquery-get-selected-element-tag-name
jQuery.fn.tagName = function() {
  return this.prop("tagName").toLowerCase()
  //return this.get(0).tagName.toLowerCase()
};

//https://stackoverflow.com/questions/14645806/get-all-attributes-of-an-element-using-jquery
/*(function(old) {*/
  //$.fn.attr = function() {
    //if(arguments.length === 0) {
      //if(this.length === 0) {
        //return null;
      //}

      //var obj = {};
      //$.each(this[0].attributes, function() {
        //if(this.specified) {
          //obj[this.name] = this.value;
        //}
      //});
      //return obj;
    //}

    //return old.apply(this, arguments);
  //};
/*})($.fn.attr);*/

function isObject(objValue) {
  return objValue && typeof objValue === 'object' && objValue.constructor === Object;
}

function PrjMan(){

//@set_header
  this.set_header = function(){
    console.log('[App] set_header');

      //var header = document.createElement('div');
      //header.className = 'flex-row';
      //this.$header = $(header);

      this.$header = $('<div/>').addClass('flex-row');

      var els = [
        this.$$btn({
          value : 'Reload',
          id    : 'btn_reload',
        }),
        this.$$input({
          id  : 'inp_css_delete',
          plc : 'CSS (Del)',
          css : {
            'background-color' : 'red',
            'color'            : 'white',
          }
        }),
        this.$$input({
          id  : 'inp_css_show',
          plc : 'CSS (Show)',
          css : {
            'background-color' : 'blue',
            'color'            : 'white',
          }
        }),
        this.$$input({
          id  : 'inp_xpath_delete',
          plc : 'XPATH (Del)',
          css : {
            'background-color' : 'red',
            'color'            : 'white',
          }
        }),
        this.$$input({
          id  : 'inp_xpath_show',
          plc : 'XPATH (Show)',
          css : {
            'background-color' : 'blue',
            'color'            : 'white',
          }
        }),
      ];

      for (let el of els) {
        this.$header.append(el);
      };

      return this;
  };

//@@ set_pane
  this.set_pane = function(){
      console.log('[App] set pane');

      this.$pane = $('<div/>').addClass('flex-row');
      this.$pane.css({ background : 'green' });

      return this;
  };

//@@ ajax_bld_delete
  this.ajax_bld_delete = function(){
    const app = this

    const ts = new Date().getTime()
    $.ajax({
        method  : 'POST',
        data    : { ts },
        url     : `/prj/bld/delete`,
        success : function(data){
          app.bldUpdate()
        },
        error   : function(data){},
    })
    return this
  };

//@@ ajax_pdf_info
  this.ajax_pdf_info = function({ $tab, sec, proj }){
    const app = this

    sec = sec ? sec : app.page.sec
    proj = proj ? proj : _.get(app,'config.proj')
    if (!sec || !proj || !$tab) { return app }

    const ts = new Date().getTime()
    $.ajax({
        method  : 'POST',
        data    : { sec, proj, ts },
        url     : `/prj/sec/pdf/info`,
        success : function(data){
          const info = _.get(data, 'info')
          if (!info) { return }
          const nPages = _.get(info, 'nPages')
          $tab.find('input[name="maxPage"]').val(nPages)
        },
        error   : function(data){},
    })

    return app
  }

//@@ ajax_sec_tree_html
  this.ajax_sec_tree_html = function({ sec, proj, $tree, options }){
    const app = this

    if (!$tree) { return app }

    const ts = new Date().getTime()
    $.ajax({
      method  : 'GET',
      data    : { sec, proj, ts },
      url     : `/prj/sec/tree/html`,
      success : function(html){
        $tree.append(html)
        $tree.find('.prj-sec-bare').each(function(){
          const $sci = $(this)
          const args = { $sci, sec }

          const { $btn_collapse, $btn_expand,
                  $btn_exclude, $btn_include, $below, dbRef } =
            app.getTreeData(args)

          if (!$below.length) {
            $btn_collapse.hide().prop('disabled',true)
            $btn_expand.hide().prop('disabled',true)
          }

          const collapsed = _.get(options || {}, dbRef.collapse, false)
          if (collapsed) { app.treeCollapse(args) }

          const excluded = _.get(options || {}, dbRef.exclude, false)
          if (excluded) { app.treeExclude(args) }

          $btn_collapse.click(function(){ app.treeCollapse(args) })
          $btn_expand.click(function(){ app.treeExpand(args) })
          $btn_exclude.click(function(){ app.treeExclude(args) })
          $btn_include.click(function(){ app.treeInclude(args) })

          $sci.click(function(){
            $sci.toggleClass('prj-sec-bare-chosen')
          })
        })
      },
      error   : function(data){},
    })

    return app
  }

//@@ ajax_sec_data
  this.ajax_sec_data = function({ sec, proj, more, on_success, on_fail, on_complete }){
    const app = this

    on_complete = on_complete ? on_complete : function(data){}
    on_fail = on_fail ? on_fail : function(data){}

    const ts = new Date().getTime()
    const url = `/prj/sec/data`
    let data = more ? { ...more } : {}
    data = { ...data, sec, proj, ts }
    const dataJson = JSON.stringify(data)
    $.ajax({
      method  : 'POST',
      data : { data : dataJson },
      url,
      success : on_success,
      error   : on_fail,
    }).always(on_complete)

    return app
  }

//@@ ajax_prj_act
  this.ajax_prj_act = function({ act, cnf, target, on_success, on_fail, on_complete }){
      const app = this

      const ts = new Date().getTime()
      on_complete = on_complete ? on_complete : function(){}
      var r = $.ajax({
         url : '/prj/act',
         method : 'POST',
         data : { act, cnf, target, ts },
         dataType : 'json',
         async: true,
         success : on_success,
         error : on_fail,
      }).always(on_complete)

      return this;
  };

//@@ $$radio
  this.$$radio = function({ radioList, idPrefix, name }){
      const $radio = $('<div/>')

      name = name ? name : 'selector'

      radioList.forEach(function(x){
        const label = x.name
        const id   = x.id
        $radio.append($(`
            <input type="radio" id="${idPrefix}${id}" name="${name}">
            <label for="${idPrefix}${id}">${label}</label>
        `))
      })

      return $radio;
  };

//@@ $$select
  this.$$select = function(ref={}){
      var id    = util.get(ref,'id','');
      var items = util.get(ref,'items',[]);
      var css   = util.get(ref,'css',{});

      var selected   = util.get(ref,'selected','');

      var $slc = $('<select/>');
      $slc
       .addClass('prj-select')
       .css({
           width              : '100px',
           'background-color' : 'white',
           'color'            : 'black',
           ...css
       })

      if (id) { $slc.attr({ id : id }); }
      for (var i = 0; i < items.length; i++) {
         let val = items[i];

         let $opt = $('<option/>');
         $opt.text(val);

         if (selected == val) {
           $opt.attr({ selected : 1 });
         }

         $slc.append($opt);
      };

      return $slc;
  };

//@@ $$menu
  this.$$menu = function(ref={}){
      var id    = util.get(ref,'id','');
      var items = util.get(ref,'items',[]);

      var $menu = $('<div/>');
      if (id) { $menu.attr({ id : id }); }

      for(let item of items){
         let $li = $('<li/>');
         $li.append($(item));
         $menu.append($li);
      }

      var m = $menu.menu();
      m.menu('collapseAll');

      return $menu;
  };

//@@ $$btn
  this.$$btn = function(ref={}){
      var value = util.get(ref,'value','');
      var id    = util.get(ref,'id','');
      var css   = util.get(ref,'css',{});
      var attr  = util.get(ref,'attr',{});

      var btn = document.createElement('input');
      btn.type  = 'button';

      if (id) { btn.id = id; }
      if (value) { btn.value = value; }

      $(btn).addClass('prj-btn').css({
        width: '10%',
        ...css
      });
      $(btn).attr(attr);

      return $(btn);
  };

//@@ $$a_href
  this.$$a_href = function(ref={}){

      var href  = util.get(ref,'href','');
      var txt   = util.get(ref,'txt','');
      var css   = util.get(ref,'css',{});

      var $a = $('<a/>');

      if (txt) { $a.text(txt); }
      if (href) { $a.attr({ href : href }); }

      $a.addClass('block').css({
        width: '10%',
        ...css
      });

      return $a;
  };

//@@ $$input
  this.$$input = function(ref={}){

      var id  = util.get(ref,'id');
      var plc = util.get(ref,'plc');
      var txt = util.get(ref,'txt');
      var css = util.get(ref,'css',{});

      var inp = document.createElement('input');

      inp.type  = 'text';

      if (id) { inp.id = id; }
      if (plc) { inp.placeholder = plc; }
      if (txt) { inp.value = txt; }

      $(inp)
        .addClass('block')
        .css({
           width              : '10%',
           'color'            : 'white',
           'background-color' : 'white',
           'font-size'        : '25px',
           'justify-content'  : 'space-between',
           ...css
        });

      return $(inp);
  };

//@@ on_enter
  this.on_enter = function(){
      const app = this

      this
        .register_on_enter('#sec_date', this.func_enter_date())

      return this;
  };

//@@ register_on_enter
  this.register_on_enter = function(sel,func){

     var $i = $(sel);

     $i.bind("enterKey",func);

     $i.keyup(function(e){
        if(e.keyCode == 13) {
          $(this).trigger("enterKey");
        }
     });

     return this;
  };

//@@ func_enter_date
  this.func_enter_date = function(){
     var app = this;

     return function(e){
        app.date = $(this).val();
        window.location = `/prj/sec/html?sec=${app.date}`
     };

     return this;
  };

//@@ on_click_radio
  this.on_click_radio = function(){
    const app = this
    const sec = app.page.sec
    if (!sec) { return this }

    const a = [
           'orig', 'view', 'unwrap', 'parse',
           'content', 'article', 'comments',
           'cmttex'
    ]
    a.forEach( function(x){
      $(`#radio_saved_${x}`).on('click', function(){
         $('#iframe_saved').attr({ src: `/prj/sec/saved/html?sec=${sec}&use=${x}` })
      })
    })


    return this;
  };

//@@ on_click_btn
  this.on_click_btn = function(){
    const app = this

    $('.prj-btn-tag-link').on('click', function(){
      const tag = $(this).val()
      if (!tag) { return }
      const link = `/prj/tag/html?tag=${tag}`
      window.location = link
    })

    const sec = _.get(app,'page.sec')
    if (!sec) { return this }

    const proj = _.get(app,'config.proj')

    return this;
  };

//@@ on_click_a
  this.on_click_a = function(){
     const app = this

     $('.prj-link').on('click', function(){
       const $link = $(this)

       //const re = /^\/prj\/(?<type>\w+)\/html/g
       //const m = re.exec(href)
       //if (!m) { return true }

       const href = $link.attr('href')
       const type = $link.attr('type')
       const target_ext = $link.attr('target_ext')

       const { sec, author_id,
              target,
              is_date, skip_ex } = app._href_data({ href, type, target_ext })

       console.log({ sec, author_id, target, type });

       if (!target) { return false }
       console.log({ target });

       const t_data = app._target_data({ target })
       const output_ex = _.get(t_data,`output.${target_ext}`,0)

       if (output_ex || skip_ex) {
          window.location = href;
          return false;
       }

       $(`.loading[target="${target}"]`).remove()

       var $msg = $(`<span class="loading" target="${target}">Compiling...</span>`)
       $link.parent().append($msg)

       const cnf = (target_ext == 'html') ? 'htx' : 'pdf'
       const act = 'compile'
       const on_success = function(data){
           var code = data.code
           var stdout = data.stdout

           if (code == 0) {
             $(`.loading[target="${target}"]`).text('success')
             app.link_status({ $link, output_ex : 1 })
           }else{
             $(`.loading[target="${target}"]`).text('fail')
             app.link_status({ $link, output_ex : 0 })
           }
           console.log({ stdout });
           const $code = $('<pre/>')
           $code.text(stdout.join('\n'))
           $('#logging').children().remove()
           $('#logging').append($code)
       }

       const on_fail = function(data){
           $('span.loading').text('fail')
       }

       app.ajax_prj_act({ act, cnf, target, on_success, on_fail })

       return false;
    })

    return this;
  };

//@@ on_click_img
  this.on_click_img = function(){
    const app = this

    $('.prj-img').mousedown(function(event) {
      switch (event.which) {
          case 1:
              //alert('Left mouse button is pressed');
              break;
          case 2:
              //alert('Middle mouse button is pressed');
              break;
          case 3:
              //alert('Right mouse button is pressed');
              break;
          default:
              alert('Nothing');
      }
    });

    return this;
  }

//@@ on_click
  this.on_click = function(){

     this
        .on_click_a()
        .on_click_radio()
        .on_click_btn()
        .on_click_tab()
        .on_click_img()

     return this;
  };

//@@ render_pics
  this.render_pics = function({ sec, limit, offset }){
     const app = this

     const $tab = $('#tab_pics_view')

     let tags = []
     const map = {
        scr_cmt  : { tags : [ 'scrn', 'orig.cmt' ] },
        scr_orig : { tags : [ 'scrn', 'orig.post' ] },
        ui_import : { tags : [ 'ui.import' ] },
        all      : { tags : [] },
     }
     Object.keys(map).forEach(function(x){
         const checked = $(`#radio_pics_${x}`).prop('checked')
         if (!checked) { return }

         const d = _.get(map,x,{})
         const d_tags = _.get(d,'tags',[])

         tags = d_tags
     })

     const where = { tags }

     //todo
     const dataJson = JSON.stringify({ sec, where, limit, offset })
     var jx = $.ajax({
       method  : 'POST',
       data    : { data: dataJson },
       dataType    : 'json',
       url     : `/prj/sec/pic/data`,
       success : function(pics){
         const id = 'render_pics'
         $(`#${id}`).remove()

         var ok = true
         ok = ok && pics
         ok = ok && typeof(pics) == 'object'
         ok = ok && Object.keys(pics).length
         if (!ok) { return }

         const cols = $tab.find('select[name="cols"]').val()
         app.picsInsert({ pics, $into : $tab, id, cols })

         app.ui_menu_img()
       },
       error   : function(data){},
     })

     return this
  }

//@@ on_click_tab
  this.on_click_tab = function(){
     const app = this

     const sec = app.page.sec
     if (!sec) { return this }

     const cols = 3

     $('a[href="#tab_pics_view"').on('click',function(){
        if ($('#render_pics').length){ return }

        app.render_pics({ sec })
     })


     return this;
  };

//@@ on_submit
  this.on_submit = function(){
     const app = this



     return this;
  };

//@@ on_change
  this.on_change = function(){
     const app = this

     const sec = app.page.sec
     if (!sec) { return this }

     $('#input_file_saved').change(function(e){
         const file = e.target.files[0];
         const fdata = new FormData();
         fdata.append( 'file', file );

         $.ajax({
           cache : false,
           data : fdata,
           url : `/prj/sec/saved/upload?sec=${sec}`,
           type : 'post',
           processData : false,
           contentType : false,
           success : function(data){
              $('#iframe_saved').attr({ src: `/prj/sec/saved/html?sec=${sec}&use=orig` })
           },
           error   : function(data){
           },
         })
     })

     return this;
  };

  this.link_status = function({ $link, output_ex }){
    const type = $link.attr('type')

    if (output_ex != undefined) {
       $link.attr({ output_ex })
    }else{
       output_ex = $link.attr('output_ex')
    }

    const color = Number(output_ex) ? 'green' : 'blue'
    const css = ( type == 'sec' && $link.get(0).nodeName == 'BUTTON') ? {
       'background-color' : color,
       color : 'white',
    } : {}

    $link.css(css)

    return this
  }

//@@ _href_data
  this._href_data = function({ href, type, target_ext }){
     var app = this

     const hrefFull = app.pageOrigin + href
     const hrefUrl = new URL(hrefFull)

     let params = {}
     hrefUrl.searchParams.forEach(function(value, key){
        params[key] = value
     })
     const sec = (type == 'sec' && 'sec' in params) ? params.sec : ''
     const author_id = (type == 'auth' && 'id' in params) ? params.id : ''
     const tag = (type == 'tag' && 'tag' in params) ? params.tag : ''

     var is_date = (sec && /^(\d+)_(\d+)_(\d+)$/.test(sec)) ? 1 : 0
     var skip_ex = ( is_date || !sec || author_id || tag) ? 1 : 0

     var target

     if (sec) {
       target = `_buf.${sec}`
     }else if(author_id){
       target = `_auth.${author_id}`
     }else if(tag){
       target = `_tag.${tag}`
     }else{
       target = _.get(params,'target')
     }

     return { sec, author_id, is_date, skip_ex, target }
  }

//@@ _pic_list
  this._pic_list = function(){
     const pic_list = $('#pic_list a').map(function(x){
       const url = $(this).attr('href')
       const caption = $(this).attr('caption')
       return { url, caption }
     }).get()

     return pic_list
  }

//@@ _img_inum
  this._img_inum = function({ url }){
     var inum

     if (!url) { return }
     var urlEnc
     urlEnc = encodeURIComponent(url)
     //try {
     //} catch(e) {
         //console.error(`error: encodeURIComponent`);
     //}

     try {
       $.ajax({
         method    : 'GET',
         data      : {},
         dataType  : 'json',
         async : false,
         url     : `/img/data/url/${urlEnc}`,
         success : function(data){
            var ok = true
            ok = ok && data
            ok = ok && typeof(data) == 'object'
            ok = ok && Object.keys(data).length
            if (ok) { inum = _.get(data,'inum') }
         },
         error   : function(data){},
       });
     //} catch(e) { console.error(e); }
     } catch(e) { }

     console.log({ inum });

     return inum
  }

//@@ getFormSubs
  this.getFormSubs = function({ formId }){
    const app = this

    const formSubsAny = app.getSub({ path : 'forms.@any' }) || {}
    const formSubsThis = app.getSub({ path : [ 'forms', formId ] }) || {}
    const formSubs = merge(formSubsAny, formSubsThis)

    return formSubs
  }

//@@ getSub
  this.getSub = function({ path }){
    const app = this

    const subs = {
      events : {
        bind : {
          contextmenu : {
//@c sub.events.bind.contextmenu.prj_img
            prj_img : function({ fetched } = {}){
              return function(e){
                const $img = $(this)
                const src  = $img.attr('src')
                const url  = $img.attr('url')
                const urlEnc = encodeURIComponent(url)

                var top  = e.pageY+5;
                var left = e.pageX;

                $('#dialog_img_edit .prj-img-url').val(url)
                $('#dialog_img_delete .prj-img-url').val(url)

                let imgData = {}, imgInfo = {}
                if (fetched) {
                  const attributes = $img.get(0).attributes
                  $.each(attributes, function() {
                    if(this.specified) {
                      imgData[this.name] = this.value;
                    }
                  })
                  imgData.caption = $img
                    .parents('.prj-img-figure')
                    .find('figcaption').text()
                }else{
                  imgData = app.getImgData({ url }, { dpl : true }) || {}
                  //imgInfo = app.getImgInfo({ url }) || {}
                }
                const caption = imgData.caption || ''

                const imgDataMore = imgData.more || {}

                $('#dialog_img_edit .prj-img-caption').val(caption)

                $('#dialog_img_data input').each(function(){
                  const name = $(this).attr('name')
                  const val = _.get(imgData, name, '')
                  $(this).val(val)
                })
                $('#dialog_img_data #cbx_img_has_dpl').each(function(){
                  const has_dpl = imgDataMore.has_dpl
                  $(this).prop('checked',has_dpl)
                })
                const is_main = imgDataMore.is_main
                $('#dialog_img_data #radio_img_main').each(function(){
                  $(this).prop('checked',is_main)
                })
                $('#dialog_img_data #radio_img_dpl').each(function(){
                  $(this).prop('checked',!is_main)
                })

                // Show contextmenu
                $(".context-menu").toggle(200).css({
                   top: top + "px",
                   left: left + "px"
                })

                // disable default context menu
                return false;
              }
            }
          },
        },
        autocomplete : {
//@c sub.events.autocomplete.source
          source: function({ urlComplete, formState, field, cache }){
            return function( request, response ) {
               var words = request.term.split(',').filter(x => x.length)
               var term = words.pop()
               var prev = words.join(',')
               //if ( term in cache ) {
                 //response( cache[ term ] );
                 //return;
               //}

               const regex = `^${term}`
               const params = { regex }
               if (formState && field) {
                 const selected = _.get(formState, field, [])
                 if(Array.isArray(selected)){
                   const exclude = selected.join(',')
                   if (exclude) { Object.assign(params,{ exclude }) }
                 }
               }
               $.getJSON( urlComplete, params, function( data, status, xhr ) {
                 const choices = data.map(x => [ ...words, x ].join(',') )
                 if (cache) { cache[ term ] = choices }
                 response( choices );
               });
            }
           }
        },
//@c sub.events.keypress.prj_input_tags
        keypress : {
          prj_input_tags : function({ formState }){
            return function(e){
              const $tags = $(this)
              const tagStr = $tags.val()
              if (e.keyCode == '13') {
                e.preventDefault()
                if (tagStr) {
                  tagStr.split(',').map(x => {
                    if (formState.tags.includes(x)) { return }

                    formState.tags.push(x)
                    $('<button/>')
                      .addClass('prj-btn-tag')
                      .attr({ type : 'button' }).text(x)
                      .insertAfter($tags)
                  })
                  $tags.val('')
                }
              }
              return true
            }
          }
        },
        on : {
          click: {
//@c sub.events.on.click.prj_img
            prj_img : function(e){
              const $img = $(this)

              $('#cmenu_img').hide()
              $img.toggleClass('prj-img-selected')

              const $container = $img.parents('.prj-img-container')

              if ($container) {
                const numSelected = app.getImgNumSelected({ $container })
                $container.find('.prj-status-line').text(`Selected ${numSelected} images`)
              }
            }
          },
        },
      },
      forms : {
//@c sub.forms.@any
        '@any' : {
          find : {
            '.prj-btn-form-reset' : {
              'click' : function({ $form, formState }){
                 return function(){
                   $form.trigger("reset")
                   $form.find(':checked[name=use]').click()
                   return true
                 }
              }
            },
            'button.prj-input-url-clear' : {
              'click' : function({ $form, formState }){
                 return function(){
                   var vld = $form.data('validator')
                   if (vld) { vld.destroy() }
                   $form.find('.prj-input-url').val('')
                 }
              }
            },
            'button.prj-input-file-clear' : {
              'click' : function({ $form, formState }){
                 return function(){
                   $form.find('.prj-input-file').val('')
                 }
              }
            },
            'button.prj-input-tags-clear' : {
              'click' : function({ $form, formState }){
                 return function(){
                   $form.find('.prj-btn-tag').remove()
                   $form.find('.prj-input-tags').val('')
                   formState.tags = []
                   //; cache = {}
                 }
              }
            }
          },
        },
        form_img_new : {
//@c sub.forms.form_img_new.find
//
//@c sub.forms.form_sec_new.find.:radio[name=use]
          find : {
             ':radio[name=use]' : {
                each : function({ $form, formState }){

                  const formId = $form.attr('id')

                  const $rowsUrl = $form.find('.prj-form-row').filter(function(){
                    return $.contains(this, $form.find('.prj-input-url').get(0))
                  })

                  const $rowsFile = $form.find('.prj-form-row').filter(function(){
                    return $.contains(this, $form.find('.prj-input-file').get(0))
                  })

                  return function(){
                    const $radio = $(this)

                    $radio.click(function(){
                        const val = $radio.val()

                        var vld = $form.data('validator')
                        if (vld) { vld.destroy() }
                        //$form.data('validator',null)

                        const hide=[], show=[]
                        if (val == 'url') {
                          show.push($rowsUrl)
                          app.valOpts[formId].rules.url.required = true

                          hide.push($rowsFile)
                          app.valOpts[formId].rules.file.required = false
                        }
                        else if (val == 'file') {
                          show.push($rowsFile)
                          app.valOpts[formId].rules.file.required = true

                          hide.push($rowsUrl)
                          app.valOpts[formId].rules.url.required = false
                        }

                        show.map((x) => { x.show().prop('disabled',false) })
                        hide.map((x) => { x.hide().prop('disabled',true) })
                    })

                    if ($radio.prop('checked')) { $radio.click() }
                  }
                }
             }
          },
        },
//@c sub.forms.form_saved_import
        form_saved_import : {
          submit : {
            ajax : {
              success : function({ $form, data }){
                const $dialog = $('#dialog_saved_import')
                $dialog.dialog("close")

                const $tab = $('#tab_saved')

                const bn = data.bn
                const sec = data.sec

                const $iframe = $tab.find('#iframe_saved')
                const $saved = $tab.find('select[name="saved_files"]')
                const saved_list = $saved ? $.map($saved.find('option'),function(option) {
                   return option.value
                }) : []
                if (!saved_list.includes(bn)) {
                  saved_list.push(bn)
                  const $bno = $('<option/>').val(bn).text(bn)
                  $saved.append($bno)
                }
                $saved.find(`option[value="${bn}"]`).prop('selected',true)

                const src = `/prj/sec/saved/html?sec=${sec}&use=orig&bn=${bn}`
                $iframe.attr({ src, bn })
                //const jsonBnList = $dialog.find('.bnListSave').text()
              }
            }
          }
        },
        form_sec_new : {
          submit : {
            ajax : {
//@c sub.forms.form_sec_new.submit.ajax.success
              success : function({ $form, data }){
                const sec = data.sec
                console.log({ sec })
                $form.find('.prj-status-line').text(sec)
                window.location = `/prj/sec/html?sec=${sec}`
              }
            }
          }
        },
        form_img_search : {
          submit : {
            ajax : {
//@c sub.forms.form_img_search.submit.ajax.success
              success : function({ $form, data, ...args }){
                if(Array.isArray(data)){
                   for(let rw of data){
                      const url = rw.url
                      const urlEnc = encodeURIComponent(url)
                      const src =  `/img/raw/url/${urlEnc}`
                      const width = '20%'
                      const $fig = $('<figure/>')
                      const $img = $('<img/>')
                          .attr({ src, url, width })
                          .addClass('prj-img')
                      $fig.append($img)
                      //$('.prj-img-show').append($fig)
                      $('.prj-img-show').append($img)
                      $('.prj-img-show').append($('<span>  </span>'))
                   }
                   app.ui_menu_img()
                }
              }
            }
          }
        }
      }
    }

    const sub = _.get(subs, path)

    return sub
  }

//@@ $prjImgFigure
  this.$prjImgFigure = function({ url, src, caption } = {}){
    const app = this

    const urlEnc = encodeURIComponent(url)
    src = src ? src : `/img/raw/url/${urlEnc}`

    const $figure = $('<figure/>').addClass('prj-img-figure')
    const $img = $("<img/>")
         .attr({ url, src, width : '100%' })
         .addClass('prj-img')

    $figure.append($img)
    $figure.append(`<figcaption>${caption}</figcaption>`)

    return $figure
  }

//@@ picsInsert
  this.picsInsert = function({ pics, $into, id, cols }){
    const app = this

    const html = app.getHtmlPiece({ piece : 'img_container' })
    const $render_pics = $(html)
      .attr({ id })

    const $table = $('<table/>')
    let $row = $('<tr/>')

    pics.map( function(pic, i){
      const picIndex = i+1
      const picIndexCaption = ( 'picIndex' in pic ) ? pic.picIndex + 1 : picIndex

      const url = pic.url
      const caption = pic.caption ? `(${picIndexCaption}) ${pic.caption}` : `Picture ${picIndexCaption}`

      const $figure = app.$prjImgFigure({ url, caption })

      const $td = $('<td/>')
      $td.append($figure)
      $row.append($td)
      if ((picIndex % cols == 0) || (picIndex == pics.length)) {
         $table.append($row)
         $row = $('<tr/>')
      }
    })

    $render_pics.find('.prj-img-show').append($table)
    $into.append($render_pics)

    return this
  }

//@@ getBnList
  this.getBnList = function({ sec } = {}){
    const app = this

    sec = sec ? sec : app.page.sec
    if (!sec) { return }

    const bnList = []
    $.ajax({
      method  : 'GET',
      data    : { sec },
      url     : `/prj/sec/saved/info`,
      async : false,
      success : function(data){ bnList.push( ...data ) },
      error   : function(data){},
    });

    return bnList
  }

//@@ getTableDt
  this.getTableDt = function({ $table }){
    const app = this

    let ok = true
    while (1) {
      ok = ok && $table; if (!ok) { break }
      ok = ok && $table.length; if (!ok) { break }

      ok = ok && $.fn.DataTable.isDataTable($table)
      if (!ok) { break }

      break
    }
    if (!ok) { return {}}

    const clsMap = {}
    const dt = $table.DataTable()
    const ajax = dt.ajax
    const init = dt.settings().init()
    const cls = init.columns
    let i = 0
    for(let cl of cls){
      let col = cl.data
      clsMap[col] = i

      i += 1
    }

    return { dt, ajax, init, clsMap }
  }

//@@ getTableColsOn
  this.getTableColsOn = function({ $parent, tbl }){
    const app = this

    const $c = $parent.find(`div[tbl="${tbl}"] .prj-table-cols :checkbox:checked`).next('label')
    const cols = $c.map( function(i, x){ return $(x).text() } ).get()

    return cols
  }

//@@ getConfig
  this.getConfig = function({ path }){
    const app = this

    const config = _.get(app,`config`,{})
    const val = _.get(config,path,{})

    return val
  }

//@@ getImgNumSelected
  this.getImgNumSelected = function({ $container } = {}){
     const app = this

     const num = $container.find('.prj-img-selected').length
     return num;
  }

//@@ getImgInfo
  this.getImgInfo = function(whr={}){
     const app = this

     let imgInfo
     $.ajax({
       method  : 'POST',
       data    : whr,
       url     : `/img/info`,
       async : false,
       success : function(data){
         imgInfo = data
       },
       error   : function(data){},
     });
     return imgInfo
  }

//@@ getImgData
  this.getImgData = function(whr={},more={}){
     const app = this

     let imgData
     const dataJson = JSON.stringify({ whr, more })
     $.ajax({
       method  : 'POST',
       url : `/img/data`,
       data: { data : dataJson },
       async : false,
       success : function(data){
         imgData = data
       },
       error   : function(data){},
     });

     return imgData
  }

//@@ getHtmlMenu
  this.getHtmlMenu = function({ menuId }){
     const app = this

     let html
     $.ajax({
        method  : 'GET',
        data    : {},
        url     : `/prj/code/menu/${menuId}/html`,
        async: false,
        success : function(data){ html = data },
        error   : function(data){},
     });

     return html
  }

//@@ getHtmlPiece
  this.getHtmlPiece = function({ piece }){
     const app = this

     let html
     $.ajax({
        method  : 'GET',
        data    : {},
        url     : `/prj/code/piece/${piece}/html`,
        async: false,
        success : function(data){ html = data },
        error   : function(data){},
     });

     return html
  }

//@@ getSecData
  this.getSecData = function({ sec, proj }){
     const app = this

     sec = sec ? sec : app.page.sec
     proj = proj ? proj : _.get(app,'config.proj')
     if (!sec || !proj) { return }

     let secData
     const data = { sec }
     const dataJson = JSON.stringify(data)
     $.ajax({
       method  : 'POST',
       data    : { data : dataJson },
       async   : false,
       url     : `/prj/sec/data`,
       success : function(data){
          secData = data
       },
       error   : function(data){},
     });

     return secData
  }

//@@ getHtmlForm
  this.getHtmlForm = function({ formId }){
     const app = this

     let html
     $.ajax({
        method  : 'GET',
        data    : {},
        url     : `/prj/code/form/${formId}/html`,
        async: false,
        success : function(data){ html = data },
        error   : function(data){},
     });

     return html;
  }

//@@ getFormHandler
  this.getFormHandler = function({ formId }){
     const app = this

     if (formId == 'form_pics_upload') {
//@c fh.form_pics_upload
        return function({ $form, formState }){
          const $input_pic_url = $form.find('#input_pic_url')
          const $pic_caption = $form.find('*[name="caption"]')

          const $btn_load_fs = $form.find('button[name="load_scrn_fs"]')
          const $btn_pic_upload = $form.find('#btn_pic_upload')

          $input_pic_url.keypress(function(e){
            const $input = $(this)
            if (e.keyCode == '13') {
              e.preventDefault()
              var url = $input.val()

              var uri
              try { uri = new URL(url) }catch(e){}
              $(this).val('')
              if (!uri) { return }

              //is image already saved?
              const inum = app._img_inum({ url })
              if (inum) { return }

              if (app._pic_list().map(x => x.url).includes(url)) { return }

              const caption  = $pic_caption.val() || ''
              const urlTitle = caption || url
              const $picLink = $('<a/>')
              $picLink.attr({
                 href : url,
                 target : '_blank',
                 caption
              }).text(urlTitle)
              $('#pic_list').append($(`<p>`))
              $('#pic_list').append($picLink)

              const pics = [{ url, caption }]
              const data = { pics }
              const dataJson = JSON.stringify(data)
//@a ajax./img/fetch/html
              $.ajax({
                method  : 'POST',
                data    : { data : dataJson },
                url     : `/img/fetch/html`,
                success : function(html){
                  $('#tab_pics_upload').append($(html))

                  app.ui_menu_img()
                },
                error   : function(data){},
              });
            }
            return
          })

          $btn_load_fs.off('click')
          $btn_load_fs.on('click', function(){
            const sec = app.page.sec
            if (!sec) { return }

            $.ajax({
              method  : 'POST',
              data    : { sec,
                //force : true
              },
              url     : `/prj/sec/fs/load/scrn`,
              success : function(data){
                $form.find('.prj-status-line').text('OK: Loaded Screenshots')
              },
              error   : function(data){},
            });
          })

          $btn_pic_upload.off('click')
          $btn_pic_upload.on('click',function(e){
              const pic_list = app._pic_list()
              const tags = [ 'ui.import' ]

              const { sec, proj } = app.get_sp()
              if (!sec || !proj) { return }

              const secData = app.getSecData({ sec })
              const url_parent = _.get(secData,'url')

              console.log({ pic_list });

              pic_list.forEach(function(picItem){
                const url = picItem.url
                const caption = picItem.caption || ''

                const pics = [ { url, tags, url_parent, caption } ]

                $.ajax({
                  method  : 'POST',
                  async: false,
                  data    : { data : JSON.stringify({ sec, proj, pics }) },
                  //dataType : 'json',
                  url     : `/prj/sec/pic/upload/url`,
                  success : function(data){
                     $('#pic_list').find(`a[href="${url}"]`).remove()

                     $('#img_fetched')
                              .find('.prj-img-fetched')
                              .filter((i,x) => $(x).attr('url') == url )
                              .parents('.prj-img-figure').remove()
                  },
                  error   : function(data){
                     $('#pic_list').append(JSON.stringify(data))
                  },
                })
              })
          })

          $form.find('#btn_pic_clear').on('click',function(e){
              $('#pic_list').children().remove()
              $('#img_fetched').remove()
          })

        }
     }
     else if (formId == 'form_img_search') {
//@c fh.form_img_search
//
        return function({ $form, formState }){
          $form.find('button[name="last"]').on('click',function(e){
              formState.sql = `
                  SELECT * FROM imgs WHERE inum IN
                  ( SELECT MAX(inum) FROM imgs )
              `
          })
        }
     }

     return
  }

//@@ getFormSubmitHandler
  this.getFormSubmitHandler = function({ formId }){
     const app = this

     if (formId == 'form_pics_upload') {
        return function({ $form }){
          alert('aa');
        }
     }
//@c fhs.form_sec_new
     else if (formId == 'form_sec_new') {
        return function({ $form, formState, formSubmitReceived }){
        }
     }
     else if (formId == 'form_options') {
        return function({ $form, formState, formSubmitReceived }){
          //console.log(JSON.stringify(formState))
        }
     }
     return
  }

//@@ getValOpts
  this.getValOpts = function({ formId }){
     const app = this

     return app.valOpts[formId]
  }

//@@ _target_data
  this._target_data = function(ref={}){
     var target = _.get(ref,'target','')

     var t_data = {}
     var r = $.ajax({
       url : `/prj/target/data?target=${target}`,
       method : 'GET',
       data : {},
       dataType : 'json',
       async: false,
       success : function(data){
         t_data = data
       },
       error   : function(data){
         console.log(data);
       },
     })

     return t_data
  };

//@@ _db_sec_data
  this._db_sec_data = function(ref = {}){
     const app = this
     let secData

     return secData
  };

//@@ _sec_is_date
  this._sec_date = function(ref = {}){
     var sec = _.get(ref,'sec','')

     re = /^(?<day>\d+)_(?<month>\d+)_(?<year>\d+)/g
     m = re.exec(sec)
     if (!m) { return }

     const day = m.groups.day
     const month = m.groups.month
     const year = m.groups.year

     return { day, month, year }
  };

//@@ _code
  this._code = function(el){
    var html = $(el).wrap('<div/>').parent().html();
    html = pretty(html);

    return html;
  };

//@@ _dReMapSec
  this._dReMapSec = function({ key }) {
    const map = {
       date : /^\.(?<day>\d+)_(?<month>\d+)_(?<year>\d+)$/g,
       datePost : /^_buf\.(?<day>\d+)_(?<month>\d+)_(?<year>\d+)\.(\S+)$/g,
    }
    return _.get(map, key)
  }

//@@ process_url
  this.process_url = function(){
    const app = this

    app.page = {}

    app.pageUrl    = new URL(window.location);

    app.pagePath   = app.pageUrl.pathname;
    app.pageOrigin = app.pageUrl.origin;

    app.pageParams = {}
    app.pageUrl.searchParams.forEach(function(value, key){
       app.pageParams[key] = value
    })
    app.tab = _.get(app, 'pageParams.tab', 'html')

    const m = /^\/prj\/(?<type>auth|sec|target|tag)\/html$/.exec(app.pagePath)
    console.log(app.pagePath);
    if (!m) { return this; }

    if (m.groups.type == 'sec') {
      var sec = app.page.sec = _.get(app, 'pageParams.sec')

      app.page.date = app._sec_date({ sec })

      if (/^(\d+)_(\d+)_(\d+)$/.test(sec)) {
          app.page.type = 'sec@date'
      } else if (/^(\d+)_(\d+)_(\d+)\.(\S+)$/.test(sec)) {
          app.page.type = 'sec@post'
      } else {
          app.page.type = 'sec@other'
      }
    }
    else if (m.groups.type == 'tag') {
      app.page.type = 'tag'
      var tag = app.page.tag = _.get(app, 'pageParams.tag')

    } else if (m.groups.type == 'auth') {
      app.page.type = 'auth'
      var author_id = app.page.author_id = _.get(app, 'pageParams.id')
    }
    else if (m.groups.type == 'target') {
      app.page.type = 'target'
      var target = app.page.target = _.get(app, 'pageParams.target')
    }

    app.page.config = _.get(app, `config.ui.page.${app.page.type}`,{})

    return this;
  };

//@@ storyUpdate
  this.storyUpdate = function({ after } = {}){
    const app = this
    const sec = app.page.sec
    const proj = _.get(app,'config.proj')

    const $story = $('.prj-story')
    if (!sec || !proj || !$story) { return this }

    const ts = new Date().getTime()
    $.ajax({
      method  : 'GET',
      data    : { sec, proj, ts },
      url     : `/prj/sec/html/story`,
      cache : false,
      success : function(html){
        $story.children().remove()
        $story.append($(html))
        if (after) { after() }
      },
      error   : function(data){},
    });

    return app
  }

//@@ ui_tab_html
  this.ui_tab_html = function(){
    const app = this
    const sec = app.page.sec
    const proj = _.get(app,'config.proj')

    if (!sec) { return this }

    const [ act, cnf, target ] = [ 'compile', 'htx', `_buf.${sec}` ]

    const secHeader = app.getHtmlPiece({ piece : 'sec_header' })
    $('#tab_html').prepend($(secHeader))
    const $btn_compile = $('#tab_html').find('#btn_html_compile')
    const $btn_update = $('#tab_html').find('#btn_html_update')
    const btnTitleUpdate = $btn_update.text()

    $btn_update.on('click',function(){
      app.storyUpdate()
    })

    $btn_compile.on('click',function(){
       const btnTitleCompile = $btn_compile.text()
       const on_success = function(){
          app.storyUpdate()
       }
       const on_fail = function(){}
       const on_complete = function(){
          $btn_compile.text(btnTitleCompile).prop('disabled',false)
       }
       $btn_compile.text('Compiling HTML...').prop('disabled',true)

       app.ajax_prj_act({ act, cnf, target, on_success, on_fail, on_complete })
    })

    //const $row = $('</div>').css({ display: 'flex', flex : 'column' })
    //$row.append($btn_compile)
    //$('#tab_html').prepend($row)

    return this
  }

//@@ get_sp
  this.get_sp = function(){
    const app = this
    const sec = app.page.sec
    const proj = _.get(app,'config.proj')
    return { sec, proj }
  }

//@@ getTreeData
  this.getTreeData = function({ $sci, sec }){
    const app = this

    const section = $sci.attr('sec')
    const secRel = !sec ? section : sec == section ? '' : section.replace(`${sec}`,'')
    const dbRef = {
      collapse : `tree.collapse.${section}`,
      exclude : `patch/opts_maker/join_lines/ii/exclude/\$var{sec}${secRel}`
    }

    const $btn_collapse = $sci.find('button[act="collapse"]')
    const $btn_expand = $sci.find('button[act="expand"]')

    const $btn_exclude = $sci.find('button[act="exclude"]')
    const $btn_include = $sci.find('button[act="include"]')

    const $span = $sci.find('.prj-sec-bare-name')

    const $below = $sci.next('ul')

    return {
      $btn_collapse, $btn_expand,
      $btn_exclude, $btn_include,
      $below, section, secRel, dbRef,
      $span
    }
  }

//@@ treeExpand
  this.treeExpand = function({ $sci, sec }){
    const app = this

    const { $btn_collapse, $btn_expand, $below, section, dbRef, $span } =
      app.getTreeData({ $sci, sec })

    $btn_expand.hide()
    $btn_collapse.show()
    $below.toggle()
    $sci.find(`input[name="${dbRef.collapse}"]`).remove()
    $span.removeClass('prj-sec-tree-collapsed')

    return app
  }

//@@ treeExclude
  this.treeExclude = function({ $sci, sec }){
    const app = this

    const { $btn_exclude, $btn_include, dbRef, $span } =
      app.getTreeData({ $sci, sec })

    $btn_exclude.hide()
    $btn_include.show()
    $sci.append($(`<input type="text" hidden name="${dbRef.exclude}" value=1 />`))
    $span.addClass('prj-sec-tree-excluded')

    return app
  }

//@@ treeInclude
  this.treeInclude = function({ $sci, sec }){
    const app = this

    const { $btn_exclude, $btn_include, dbRef, $span } =
      app.getTreeData({ $sci, sec })

    $btn_exclude.show()
    $btn_include.hide()
    $sci.find(`input[name="${dbRef.exclude}"]`).remove()
    $span.removeClass('prj-sec-tree-excluded')

    return app
  }

//@@ treeCollapse
  this.treeCollapse = function({ $sci, sec }){
    const app = this

    const { $btn_collapse, $btn_expand, $below, section, dbRef, $span } =
      app.getTreeData({ $sci, sec })

    $btn_collapse.hide()
    $btn_expand.show()
    $below.toggle()
    $sci.append($(`<input type="text" hidden name="${dbRef.collapse}" value=1 />`))
    $span.addClass('prj-sec-tree-collapsed')

    return app
  }

//@@ ui_tab_options
  this.ui_tab_options = function(){
    const app = this

    const { sec, proj } = app.get_sp()
    const tabId = 'tab_options'

    if (!sec || !proj) { return this }
    if (!$(`#${tabId}`).length) { return this }
    const $tab = $(`#${tabId}`)

    const after = function(){
      const $form = $tab.find('form')
      const frm = $form.get(0)

      $form.find('#tab_options_tabs').tabs()
      const more = {}

      const ts = new Date().getTime()

      const on_sd = function(data){
        const options = data.options

        const $tree = $form.find('#sec_tree')
        const $tab_tree = $form.find('#tab_options_tree')
        const $btn_clear = $tab_tree.find('button[act="clear"]')
        $btn_clear.click(function(){
        })

        app.ajax_sec_tree_html({ sec, proj, $tree, options })

        if (!options) { return }
        //const options = JSON.parse(optJson)
        for (let [key, value] of Object.entries(options)) {
          const $el = $form.find(`*[name="${key}"]`)
          if ( !$el.length ) { continue }
          const tag = $el.tagName()
          const type = $el.attr('type') || ''
          if (tag == 'input') {
            if (['checkbox','radio'].includes(type)) {
              $el.prop('checked', value ? true : false)
            }else{
              $el.val(value)
            }
          }else if(tag == 'select'){
            $el.val(value).change()
          }
        }
      }
      app.ajax_sec_data({ sec, proj, more, on_success : on_sd })
    }
    app.tabInit({ $tab, tabId, after })

    return this
  }

//@@ ui_tab_json
  this.ui_tab_json = function(){
    const app = this

    const { sec, proj } = app.get_sp()
    const tabId = 'tab_json'

    if (!sec || !proj) { return this }
    if (!$(`#${tabId}`).length) { return this }
    const $tab = $(`#${tabId}`)

    const ajaxOpts = {}

    const after = function(){
      const $btn_update = $tab.find('button[name="update"]')
      $btn_update.on('click',function(){
        app.tab_json_update({ $tab, sec, proj })
      })

      $(`a[href="#${tabId}"]`).on('click',function(){
        $btn_update.click()
      })
    }
    app.tabInit({ $tab, tabId, after, ajaxOpts })

    return this
  }

//@@ tab_json_update
  this.tab_json_update = function({ $tab, sec, proj }){
    const app = this

    const on_success = function(data){
      const dataJson = JSON.stringify(data, null, 2)
      $tab.find('pre').text(dataJson)
    }
    app.ajax_sec_data({ sec, proj, on_success })

    return this
  }

//@@ ui_tab_fs
  this.ui_tab_fs = function(){
    const app = this

    const sec = app.page.sec
    const tabId = 'tab_fs'

    if (!sec) { return this }
    if (!$(`#${tabId}`).length) { return this }

    const fsList = [
      { id : 'new', name : 'New' },
      { id : 'done', name : 'Done' },
    ]

    const $tab = $(`#${tabId}`)

    $.ajax({
      method  : 'GET',
      data    : {},
      url     : `/prj/code/tab/${tabId}/html`,
      success : function(html){
        $tab.append($(html))

        app
          .process_dom()
          .tables()
          .on_click_a()

        $.ajax({
          method  : 'GET',
          data    : { sec },
          url     : `/prj/sec/fs/data`,
          success : function(data){
            const exNew  = _.get(data, 'exNew')
            const exDone = _.get(data, 'exDone')

            if (exNew) { $('#radio_fs_new').prop({ checked: true }) }
            if (exDone) { $('#radio_fs_done').prop({ checked: true }) }
          },
          error   : function(data){},
        })

        fsList.forEach(function(x){
          const id = x.id
          $(`#radio_fs_${id}`).on('click', function(){
              $.ajax({
                method  : 'GET',
                data    : { sec },
                url     : `/prj/sec/fs/${id}`,
                success : function(data){
                  const $table = $('#sec_fs_new_list').find('table')
                  if (id == 'new') {
                  }else{
                    $table.find(`tr[sec="${sec}"]`).remove()
                  }
                },
                error   : function(data){},
              });
          })
        })
      },
      error   : function(data){},
    });

    return this;
  };

//@@ ui_tab_pdf
  this.ui_tab_pdf = function(){
    const app = this

    const sec = app.page.sec
    const proj = _.get(app,'config.proj')
    const tabId = 'tab_pdf'

    if (!sec || !proj) { return this }
    if (!$(`#${tabId}`).length) { return this }
    const $tab = $(`#${tabId}`)

    const ajaxOpts = {}

    const after = function(){
      const $iframe = $tab.find('#iframe_pdf')
      const $btn_reload = $tab.find('#btn_pdf_reload')
      const $btn_export = $tab.find('#btn_pdf_export')
      const $btn_compile = $tab.find('#btn_pdf_compile')
      const $btn_compile_options = $tab.find('#btn_pdf_compile_options')
      const $status = $tab.find('#pdf_statusline')

      app.ajax_pdf_info({ sec, proj, $tab })
      app.ui_dialog_pdf_compile_options()

      const srcTs = function(){
        const ts = new Date().getTime()
        return `${app.pageOrigin}/prj/sec/pdf?sec=${sec}&ts=${ts}`
      }

      const pdfReload = function(){
        $iframe.attr({ src : srcTs() })
        app.ajax_pdf_info({ sec, proj, $tab })
      }

      const height = '700'
      const width = '100%'
      //const sandbox = 'allow-scripts allow-same-origin'

      $iframe.attr({ height, width, src : srcTs() })

      $tab.find('#btn_pdf_open_new_tab').click(function(){
         const src = $iframe.attr('src')
         window.open(src,'_blank')
      })

      $btn_compile_options.on('click',function(e){
         app.dialogOpen({ e, dialogId : 'dialog_pdf_compile_options' })
      })

      $btn_export.on('click',function(){
         const $btn = $(this)
         const colorBase = $btn.css('color')
         const btnTitle = $btn.text()
         const colorExport = 'green'

         const minPage = $tab.find('input[name="minPage"]').val()
         const maxPage = $tab.find('input[name="maxPage"]').val()
         const file_fmt = $tab.find('input[name="file_fmt"]').val()

// https://stackoverflow.com/questions/52099075/download-ajax-response-as-zip-file
// https://stackoverflow.com/questions/38192854/recieving-a-zip-file-as-response-on-ajax-request
//
         $btn_export.prop('disabled',true)
                    .text('Exporting...').css({ color : colorExport })
         $status.text(`Exporting, minPage = ${minPage}, maxPage = ${maxPage}`)

         $.ajax({
           method  : 'POST',
           data    : { sec, proj, minPage, maxPage, file_fmt },
           url     : `/prj/sec/pdf/export/zip`,
           xhrFields : {
             responseType: 'blob'
           },
           //dataType : 'binary',
           //dataType : false,
           //contentType: 'application/zip',
           success : function(data){
              const file = URL.createObjectURL(this.response || data)
              const filename = `${sec}.${minPage}_${maxPage}.zip`

              $btn_export.prop('disabled',false)
                    .text(btnTitle).css({ color : colorBase })
              $status.text('Export OK')

              const a = document.createElement("a")
               //if `a` element has `download` property
              if ("download" in a) {
                a.href = file
                a.download = filename
                document.body.appendChild(a)
                a.click()
                setTimeout(function(){
                  document.body.removeChild(a)
                  URL.revokeObjectURL(a.href)
                },1)
              } else {
                 //use `window.open()` if `download` not defined at `a` element
                window.open(file)
              }
           },
           error   : function(err){
              //console.log(JSON.stringify(err))
              alert(JSON.stringify(err));
              //$status.text(`Error: ${JSON.stringify(err)}`)
           },
         });

      })

      $btn_compile.on('click',function(){
         const $btn = $(this)
         const colorBase = $btn.css('color')
         const btnTitle = $btn.text()
         const colorCompile = 'green'
         const times = {}
         times.start = new Date().getTime()
         const getElapsed = function(){
           times.end = new Date().getTime()
           times.elapsed = Math.trunc((times.end - times.start)/Math.pow(10,3))
           times.msg = `${times.elapsed} seconds`
         }

         const [ act, cnf, target ] = [ 'compile', '', `_buf.${sec}` ]
         const on_success = function(){
           getElapsed()
           pdfReload()
           $status.text(`PDF compile success, ${times.msg}`).css({ color : 'green' })
         }
         const on_fail = function(){
           getElapsed()
           $status.text(`PDF compile fail, ${times.msg}`).css({ color : 'red' })
         }
         const on_complete = function(){
           $btn.css({ color : colorBase }).prop('disabled',false)
           $btn.text(btnTitle)
         }
         app.ajax_prj_act({ act, cnf, target, on_success, on_fail, on_complete })
         $btn.css({ color : colorCompile }).prop('disabled',true)
         $btn.text('PDF compiling...')
         $status.text(`PDF compiling...`)
      })
      $btn_reload.on('click',function(){
        pdfReload()
        $status.text('PDF reloaded')
      })
    }

    app.tabInit({ $tab, tabId, after, ajaxOpts })

    return this
  }

//@@ tabInit
  this.tabInit = function({ tabId, $tab, after, err, ajaxOpts } = {}){
    const app = this

    const sec = app.page.sec
    const proj = _.get(app,'config.proj')

    ajaxOpts = ajaxOpts ? ajaxOpts : {}

    const ts = new Date().getTime()
    $.ajax({
      method  : 'GET',
      data    : { sec, proj, ts },
      url     : `/prj/code/tab/${tabId}/html`,
      success : function(html){
        $tab.append($(html))

        if (after) { after() }
      },
      error   : function(data){
        if (err) { err() }
      },
      ...ajaxOpts
    })

    return this
  }

//@@ bldUpdate
  this.bldUpdate = function({ status, cols } = {}){
    const app = this

    const statuses = ['running','fail','success']
    if (!status) {
      statuses.map(x => { app.bldUpdate({ status : x, cols }) })
      return app
    }

    //console.log(`[bldUpdate] status = ${status}`)
    const $tab = $(`#tab_bld`)

    const $cnt = $tab.find(`.prj-table-container[status="${status}"]`)
    const $table = $cnt.find('table')
    const uri = new URL(`${app.pageOrigin}/prj/bld/data`)
    uri.searchParams.append('status', status)
    const url = uri.toString()

    $tab.find(`.prj-table-container`).hide()
    $cnt.show()

    const { dt, ajax, clsMap } = app.getTableDt({ $table })

    if (ajax) {
      ajax.reload()

    }else if(!dt){
      cols = cols ? cols : app.getTableColsOn({ $parent : $tab, tbl : 'builds' })

      if (cols && cols.length) {
        const columns = cols.map(x => { return { data : x } })
        const columnDefs = columns
        //console.log(`[bldUpdate] table.DataTable({ ... }) call`)
        const dtOpts = _.get(app,'config.ui.tables.@common.dataTable',{})
        $table.DataTable({
          ...dtOpts,
          ajax : url,
          columns,
          columnDefs,
          //dom: 'Bfrtip',
          //buttons: [ 'copy', 'excel', 'pdf' ]
        })
      }
    }

    return this
  }

//@@ ui_tab_bld
  this.ui_tab_bld = function(){
    const app = this

    const sec = app.page.sec
    const tabId = 'tab_bld'

    if (!sec) { return this }
    if (!$(`#${tabId}`).length) { return this }
    const $tab = $(`#${tabId}`)
    const tbl = 'builds'

    $('a[href="#tab_bld"]').on('click',function(){
      //app.bldUpdate({ status : 'running' })
    })

    const after = function(){
      app.bldUpdate()

      const $tbl = $tab.find(`div[tbl=${tbl}]`)
      const $tables = $tbl.find('table')

      $tables.each(function(){
        const $table = $(this)
        const { dt, ajax, clsMap } = app.getTableDt({ $table })
        $table.find('tbody').on('click', 'tr', function() {
          const dtRow = dt.row(this)
          const rw = dtRow.data()
          const tr = dtRow.node()

          $(tr).toggleClass('prj-sec-row-selected')
        })
      })

      $tab.find('*[act="delete"]').on('click', function(){
        const status = $tab.find('select[name="delete_options"]')
      })

      $tab.find('#radio_bld_fail').on('click', function(){
        app.bldUpdate({ status : 'fail' })
      })
      $tab.find('#radio_bld_run').on('click', function(){
        app.bldUpdate({ status : 'running' })
      })
      $tab.find('#radio_bld_ok').on('click',function(){
        app.bldUpdate({ status : 'success' })
      })

      $tbl.find(`.prj-table-cols :checkbox`).on('click',function(){
        const $col = $(this)
        const col = $col.attr('col')
        const on = $col.prop('checked')

        $tables.each(function(){
          const $table = $(this)
          const { dt, ajax, clsMap } = app.getTableDt({ $table })
          if (! dt || !clsMap) { return }
          const colNum = _.get(clsMap, col)
          dt.column(colNum).visible(on)
        })

        //alert(on)
      })

      $tbl.find(`.prj-table-container`).each(function(){
        const $cnt = $(this)
        const $table = $cnt.find('table')

      })
      //on('click',function(){
    }
    const ajaxOpts = {}
    app.tabInit({ $tab, tabId, after, ajaxOpts })

    return this
  }

//@@ ui_tab_pics
  this.ui_tab_pics = function(){
    const app = this

    const sec = app.page.sec
    if (!sec) { return this }

    const tabId = 'tab_pics_tabs'
    $.ajax({
      method  : 'GET',
      data    : {},
      url     : `/prj/code/tab/${tabId}/html`,
      async : false,
      success : function(html){
        const $tabRaw = $(html)
        $('body #tab_pics').append($tabRaw)
        const $tab = $(`body #${tabId}`)
        $tab.tabs()

        const $tab_view = $tab.find('#tab_pics_view')

        $tab_view.find('#btn_render_pics').off('click').on('click',function(){
          const limit = $tab_view.find('input[name="limit"]').val()
          const offset = $tab_view.find('input[name="offset"]').val()
          app.render_pics({ sec, limit, offset })
        })
      },
      error   : function(data){},
    });

    return this;
  };

  this.cssWidthShift = function({ $item, shift }){
    const app = this

    if (!$item) { return app }

    const widthCss = $item.css('width')
    const m = /(?<width>.*)px$/.exec(widthCss)
    let widthPx = m && m.groups.width ? parseInt(m.groups.width) : undefined
    if (widthPx) {
      widthPx += shift
      $item.width(widthPx + 'px')
    }

    return this
  }

//@@ ui_tab_saved
  this.ui_tab_saved = function(){
    const app = this

    const sec = app.page.sec
    const tabId = 'tab_saved'

    if (!sec) { return this }
    if (!$(`#${tabId}`).length) { return this }

    $.ajax({
      method  : 'GET',
      data    : { sec },
      url     : `/prj/code/tab/${tabId}/html`,
      success : function(html){
        const $tab = $(`#${tabId}`)
        $tab.append($(html))

        app.ui_dialog_saved_import()

        const $div_iframe = $tab.find('#iframe_saved').parent()

        $('#btn_render_saved').on('click',function(){
          const bn = $tab.find('select[name="saved_files"]').val()
          if (!bn) {return}
          const src = `/prj/sec/saved/html?sec=${sec}&use=orig&bn=${bn}`
          $tab.find('#iframe_saved').attr({ src, bn })
        })
        $('#btn_import_saved').on('click',function(){
          const $dialog = $("#dialog_saved_import")

          const bnList = app.getBnList({ sec }) || []

          $dialog.find('.bnListSave select option').remove()
          bnList.map(function(x){
            const $option = $('<option/>').val(x).text(x)
            $dialog.find('.bnListSave select').append($option)
          })

          $dialog.dialog("open")
        })

        $tab.find('button[name="btn_file_remove"]').on('click',function(){
          const $iframe = $tab.find('#iframe_saved')
          const bn = $iframe.attr('bn')
          $.ajax({
            method  : 'POST',
            data    : { sec, bn },
            url     : `/prj/sec/saved/remove`,
            success : function(data){
            },
            error   : function(data){},
          });
        })

        $tab.find('button[name="btn_open_new_tab"]').on('click',function(){
          const src = $tab.find('#iframe_saved').attr('src')
          window.open(src,'_blank')
        })

        $tab.find('button[name="btn_width_plus"]').on('click',function(){
          app.cssWidthShift({ $item : $div_iframe, shift : 100 })
        })
        $tab.find('button[name="btn_width_minus"]').on('click',function(){
          app.cssWidthShift({ $item : $div_iframe, shift : -100 })
        })
      },
      error   : function(data){},
    });

    const cnf = _.get(app,'config.ui.tab.saved',{})

    return this
  }

//@@ ui_tab_tex
  this.ui_tab_tex = function(){
    var app = this

    $('#tex_src').css({
        width : '100%',
        height : '100%'
    }).attr({
        rows : '80'
    })

    var sec = _.get(app,'page.sec')
    if (!sec) { return this }

    var jx = $.ajax({
      method  : 'GET',
      data    : { sec },
      //url     : `/prj/sec/src?sec=${sec}`,
      url     : `/prj/sec/src`,
      success : function(data){
        const txt = _.get(data,'txt','')

        $('#tex_src').val(txt)
      },
      error   : function(data){},
    });

    return this;
  };

//@@ ui_dialog_img_delete
  this.ui_dialog_img_delete = function(){
    const app = this

    const dialogId = 'dialog_img_delete'
    if (!$(`#${dialogId}`).length) {
      const html = app.getHtmlPiece({ piece : dialogId })
      $('body').append($(html))
    }

    const uiOptsCommon = app.getConfig({ path : `ui.dialogs.@common` })
    const uiOpts = app.getConfig({ path : `ui.dialogs.${dialogId}` })

    $(`#${dialogId}`).dialog({
      ...uiOptsCommon,
      ...uiOpts,
      buttons: {
        No: function() { $(this).dialog("close") },
        Yes: function() {
          const $dialog = $(this)
          const url = $dialog.find('.prj-img-url').val()
          if (url) {
            const dataJson = JSON.stringify({ url })
            $.ajax({
              method  : 'POST',
              data    : { data : dataJson },
              url     : `/img/delete`,
              success : function(data){
                const $deleted = $('.prj-img').filter((i, x) => {
                  const xUrl = $(x).attr('url')
                  return xUrl == url
                })
                $deleted.parents('prj-img-figure').remove()
                $deleted.remove()
              },
              error   : function(data){},
            });
          }
          $dialog.dialog("close")
        },
      },
    });

    return app
  }

//@@ dialogOpen
  this.dialogOpen = function({ dialogId, e, position }){
    const app = this

    while (!position) {
      if (e) {
        const top  = e.pageY+5
        const left = e.pageX
        position = { top, left }
        break
      }

      break
    }

    const $dialog = $(`#${dialogId}`)
    if (position) {
      $dialog.dialog( "widget" ).position({ ...position })
    }
    $dialog.dialog( "open" )

    return app
  }

//@@ dialogInit
  this.dialogInit = function({ dialogId, formId, buttons, source }){
    const app = this

    if ($(`#${dialogId}`).length) { return app }

    if (formId) {
      const formHtml = app.getHtmlForm({ formId })

      const $dialogRaw = $(`<div id="${dialogId}" />`)
      if (formHtml) {
        $dialogRaw.append($(formHtml))
        $('body').append($dialogRaw)
        const $forms = $(`#${formId}`)
        app.init_forms({ $forms })
      }
    }
    else if (source) { source() }

    const uiOptsCommon = app.getConfig({ path : `ui.dialogs.@common` }) || {}
    const uiOpts = app.getConfig({ path : `ui.dialogs.${dialogId}` }) || {}

    const $dialog = $(`#${dialogId}`)

    $dialog.dialog({
      ...uiOptsCommon,
      ...uiOpts,
      buttons,
    })

    return app
  }

//@@ ui_dialog_pdf_compile_options
  this.ui_dialog_pdf_compile_options = function(){
    const app = this

    const dialogId = 'dialog_pdf_compile_options'
    const formId = 'form_pdf_compile_options'
    if ($(`#${dialogId}`).length) { return app }

    const buttons = {
      OK : function() { $(this).dialog("close") },
    }

    app.dialogInit({ dialogId, formId, buttons })

    return app
  }

//@@ ui_dialog_checklist
  this.ui_dialog_checklist = function(){
    const app = this
    const dialogId = 'dialog_checklist'

    if ($(`#${dialogId}`).length) { return app }

    const source = function(){
      $('body').append($(`<div id="${dialogId}"><div class="prj-html"></div></div>`))
    }
    const buttons = {
      OK : function() { $(this).dialog("close") },
    }
    app.dialogInit({ dialogId, buttons, source })

    return app
  }

//@@ ui_dialog_saved_import
  this.ui_dialog_saved_import = function(){
    const app = this

    const dialogId = 'dialog_saved_import'
    const formId = 'form_saved_import'
    const buttons = {
        Cancel: function() { $(this).dialog("close") },
        Import: function() {
          // sub.forms.form_saved_import
          $(this).find('form').trigger('submit')
        },
    }
    app.dialogInit({ dialogId, formId, buttons })

    return app
  }

//@@ ui_dialog_img_data
  this.ui_dialog_img_data = function(){
    const app = this

    const dialogId = 'dialog_img_data'
    const formId = 'form_img_data'
    const buttons = {
        Close: function() { $(this).dialog("close") },
    }
    app.dialogInit({ dialogId, formId, buttons })
    const $dialog = $(`#${dialogId}`)

    const _imgdata = function() {
      const idata = {}
      $dialog.find('input').each(function(){
        const name = $(this).attr('name')
        const val = $(this).val()
        if (!name) { return }
        idata[name] = val
      })
      return idata
    }

    $dialog.find(`#${formId}_tabs`).tabs()

    $dialog.find('button[act="update_mtime"]').off('click').click(function(){
      const $btn = $(this)
      const val = $btn.next().val()
      const imgData = _imgdata()
      const url = imgData.url

      const act = 'update_mtime'
      const actOpts = { mode : val }
      const data = { act, actOpts, where : { url }}
      const dataJson = JSON.stringify(data)
      const ts = new Date().getTime()
      $.ajax({
        method  : 'POST',
        data    : { data : dataJson, ts },
        url     : `/img/data/update`,
        success : function(data){
        },
        error   : function(data){},
      })
    })

    return this;
  };

//@@ ui_dialog_img_edit
  this.ui_dialog_img_edit = function(){
    const app = this

    const dialogId = 'dialog_img_edit'
    if (!$(`#${dialogId}`).length) {
      const formHtml = app.getHtmlForm({ formId : 'form_img_edit' })

      const $dialog = $(`<div id="${dialogId}" />`)
      if (formHtml) {
        $dialog.append($(formHtml))
        $('body').append($dialog)
      }
    }

    const uiOptsCommon = app.getConfig({ path : `ui.dialogs.@common` })
    const uiOpts = app.getConfig({ path : `ui.dialogs.${dialogId}` })

    $(`#${dialogId}`).dialog({
      ...uiOptsCommon,
      ...uiOpts,
      buttons: {
        Discard: function() { $(this).dialog("close") },
        Save: function() {
          const $dialog = $(this)

          const caption = $dialog.find('.prj-img-caption').val()
          const url     = $dialog.find('.prj-img-url').val()

          const data = {
            where : { url },
            update : { caption }
          }
          const jsonData = JSON.stringify(data)
          $.ajax({
            method  : 'POST',
            data    : { data : jsonData },
            url     : `/img/data/update`,
            success : function(data){},
            error   : function(data){},
          });
          $(this).dialog("close")
        }
      },
    })

    return this;
  };

//@@ ui_menu_img
  this.ui_menu_img = function(){
    const app = this
//https://makitweb.com/custom-right-click-context-menu-with-jquery/

    if (!$('#cmenu_img').length) {
      const menuHtml = app.getHtmlMenu({ menuId : 'cmenu_img' })
      if (menuHtml) { $('body').append($(menuHtml)) }
    }

    app
      .ui_dialog_img_edit()
      .ui_dialog_img_data()
      .ui_dialog_img_delete()

    $('#cmenu_img_data').on('click', function(e){
      const $clicked = $(this)
      $('#cmenu_img').hide()

      app.dialogOpen({ e, dialogId : 'dialog_img_data' })
    })

    $('#cmenu_img_edit').on('click', function(e){
      const $clicked = $(this)

      $('#cmenu_img').hide()
      $("#dialog_img_edit").dialog( "close" )

      app.dialogOpen({ e, dialogId : 'dialog_img_edit' })
    })

    $('#cmenu_img_delete').on('click', function(e){
      const $clicked = $(this)

      $('#cmenu_img').hide()
      app.dialogOpen({ e, dialogId : 'dialog_img_delete' })
    })

    $('.prj-img-container').each(function(){
      const $container = $(this)

      $container.find('button[name="clear"]').click(function(){
        $container.find('.prj-img-show').children().remove()
      })

      $container.find('button[name="select_all"]').click(function(){
        $container.find('.prj-img').addClass('prj-img-selected')
        const numSelected = app.getImgNumSelected({ $container })
        $container.find('.prj-status-line').text(`Selected ${numSelected} images`)
      })

      $container.find('button[name="select_clear"]').click(function(){
        $container.find('.prj-img').removeClass('prj-img-selected')
        $container.find('.prj-status-line').text(`No images selected`)
      })

    })

    let sub
    sub = app.getSub({ path : 'events.on.click.prj_img' })
    $('.prj-img').on('click', sub )

    sub = app.getSub({ path : 'events.bind.contextmenu.prj_img' })
    $('.prj-img').bind('contextmenu', sub() )
    $('.prj-img-fetched').bind('contextmenu', sub({ fetched : 1 }) )

    return this
  }

//@@ ui_menu
  this.ui_menu = function(){
    const app = this

    var $menu = $(`
        <ul id="menu">
          <li><div>Section</div>
            <ul>
              <li><div>New</div></li>
            </ul>
          </li>
        </ul>
    `)

    $('body').prepend($menu)
    $('#menu').menu()

    return this
  }

//@@ ui_pane_sec
  this.ui_pane_sec = function(){
    const app = this

    const sec = app.page.sec
    if (!sec) { return this }

    $.ajax({
      method  : 'GET',
      data    : {},
      url     : `/prj/code/piece/panel_sec/html`,
      async : false,
      success : function(html){
        $('body').prepend($(html))
        app.ui_dialog_checklist()
        const $pns = $('#header_panel_sec')
        $pns.find('#btn_sec_checklist').on('click',function(){
          const $dialog = $('#dialog_checklist')
          $dialog.find('.prj-html').children().remove()
          // htmlSecCheckList() in c_PrjClass
          $.ajax({
            method  : 'GET',
            data    : { sec },
            url     : `/prj/sec/checklist/html`,
            success : function(html){
              $dialog.find('.prj-html').append($(html))
            },
            error   : function(data){},
          });
          $dialog.dialog('open')
        })
        $pns.find('#btn_sec_reload').on('click',function(){
          window.location.reload(true)
        })
      },
      error   : function(data){},
    });

    return this
  }

//@@ ui_pane
  this.ui_pane = function(){
    const app = this

    const paneHtml = app.getHtmlPiece({ piece : 'panel' })
    const $pane = $(paneHtml)
    $('body').prepend($pane)

    $('#sec_date').datepicker({ dateFormat: "dd_mm_yy" })
    //$('#sec_date').DateTimePicker({ dateFormat: "dd_mm_yy" })
    //const picker = jsdatepicker('#sec_date')

    $('.prj-input-date').datepicker({ dateFormat: "dd_mm_yy" })

    const sDate = app.page.date
    if (sDate) {
       $('#sec_date').val( [ sDate.day, sDate.month, sDate.year].join('_'))
    }

    $('#header_panel').find('input[type="button"]').each(function(){
      const $btn = $(this)
      const href = $btn.attr('href')
      $btn.on('click',function(){
        window.location = href
      })
    })

    return this
  }

//@@ ui_auth
  this.ui_auth = function(){
    const app = this

    const type = app.page.type = 'auth'
    if (type !== 'auth') { return app }
    const author_id = app.page.author_id

    $('button[act="toggle_author_info"]').click(function(){
      const $btn = $(this)
      const titleHidden = $btn.attr('title_hidden')
      const titleShown = $btn.attr('title_shown')
      const $info = $('.prj-author-info')
      if ($info.is(':hidden')) {
        $info.show()
        $btn.text(titleShown)
      }else{
        $info.hide()
        $btn.text(titleHidden)
      }

    })

    return this
  }

//@@ ui_tabs
  this.ui_tabs = function(){
    const app = this

    $('.prj-tabs').tabs()

    const tab_list =  _.get(app, `page.config.tabs`,[])
    if (!tab_list.length) { return this }

    const first = tab_list.shift()
    if (!tab_list.length && first == 'html') { return this }

    var $tabs = $(`<div id="tabs"></div>`)

    var $tab_html = $(`<div id="tab_html"></div>`)
    var $tab_ul = $(`<ul><li><a href="#tab_html">HTML</a></li></ul>`)

    $('body').wrapInner($tab_html)
    $('body').wrapInner($tabs)

    tab_list.forEach(function(tab){
       if (tab == 'html') { return }

       var tab_id = `tab_${tab}`
       var tab_name = tab

       var $tab = $(`<div id="${tab_id}" class="prj-tab"></div>`)

       $tab_ul.append($(`<li><a href="#${tab_id}">${tab_name}</a></li>`))

       $('body #tabs').append($tab)
    })

    $('body #tabs').prepend($tab_ul)
    // -------------------------------------

    $('body #tab_tex').append($('<textarea id="tex_src"/>'))
    $('body #tab_log').append($('<div id="logging"/>'))

    $("#tabs").tabs()
    if (app.tab != 'html') {
      $(`a[href="#tab_${app.tab}"]`).click()
    }

    if (tab_list.includes('bld')) {
    }

    this
        .ui_tab_html()
        .ui_tab_pdf()
        .ui_tab_fs()
        .ui_tab_tex()
        .ui_tab_bld()
        .ui_tab_saved()
        .ui_tab_pics()
        .ui_tab_json()
        .ui_tab_options()

    return this
  };

//@@ process_dom
  this.process_dom = function(){
    var app = this
    console.log('[App] process_dom');

    $('a.url').each(function(x){
      const $link = $(this)
      $link.attr({ target : '_blank' })
    })

    $('a, .prj-link').each(function(x){
      const $link = $(this)

      const href = $link.attr('href')
      const re = /^\/prj\/(?<type>\w+)\/(?<target_ext>html|pdf)/g
      const m = re.exec(href)
      if (!m) { return }

      const type = m.groups.type
      const target_ext = m.groups.target_ext

      $link.addClass('prj-link').attr({ type, target_ext })

      app.link_status({ $link })
    })

    $('img').each(function(){
      const $img = $(this)
      if ($img.hasClass('prj-img')) { return }

      const src = $img.attr('src')
      const re = /^\/img\/raw\/(.*)$/g
      const m = re.exec(src)
      if (m) { $img.addClass('prj-img') }
    })

    return this;
  };

//@@ fetch_config
  this.fetch_config = function(){
    const app = this


    $.ajax({
      method  : 'GET',
      data    : {},
      url     : `/prj/config/get`,
      async : false,
      success : function(data){
        app.config = data
      },
      error   : function(data){},
    });

    return this
  }

//@@ images
  this.images = function(){
    const app = this

    $('.prj-img-container').each(function(){
      const $container = $(this)

      $container.find('button[name="clear"]').click(function(){
        $container.find('.prj-img-show').children().remove()
      })
    })

    return this
  }

//@@ tables
  this.tables = function(){
    const app = this

    const dtOpts = _.get(app,'config.ui.tables.@common.dataTable',{})

    $('.prj-link-table').each(function(){
      const $table = $(this)
      $table.dataTable(dtOpts)

      $(':checkbox', $table).on('click',function(){
        const $box = $(this)
        const $rv = $table.$('tr', { filter : "applied" })

        const id = $box.attr('id') || ''
        if (id == 'ckb_secs_all') {
          $rv.each(function(){
            const $tr = $(this)
            const sec = $tr.attr('sec')
            $tr.find(':checkbox').trigger('click')
          })

        }else{
          const sec = $box.val()
          const $tr = $rv.filter(function(index, element){
            const sc = $(element).attr('sec') || ''
            return ( sc == sec )
          })
          $tr.toggleClass('prj-sec-row-selected')
        }
      })

    })

    return this
  }

//@@ init
  this.init = function(){
    var app = this

    console.log('[App] init');

    $('a').wrap('<div/>')

    this
        .fetch_config()
        .process_url()
        .process_dom()
        .tables()
        .images()
        .ui_auth()
        .ui_tabs()
        .ui_pane_sec()
        .ui_pane()
        .ui_menu()
        .ui_menu_img()
        .init_forms()
        .events()

    return this
  }

//@@ form_validate
  this.form_validate = function({ formData, on_success, on_error }){

    return this;
  };

//@@ formSubsApply
  this.formSubsApply = function({ $form, formId, formState }){
    const app = this

    formId = formId ? formId : $form.attr('id')

    const formSubs = app.getFormSubs({ formId })
    const context = { $form, formState }

    for (let [key, value] of Object.entries(formSubs)) {
      if (key == 'find') {
        for (let [ sel, selDict ] of Object.entries(value)) {
          for (let [ subKey, subFac ] of Object.entries(selDict)) {
            if (subFac && subFac instanceof Function) {
              const subVal = subFac(context)
              if (subKey == 'each') {
                $form.find(sel).each(subVal)
              }else if (subKey == 'click') {
                $form.find(sel).click(subVal)
              }
            }
          }
        }
      }
    }

    return app
  }

  this.init_form_validators = function(){
    const app = this

    //jQuery.validator.setDefaults({
      //debug: true,
      //success: "valid"
    //});
    //
//@a validator.required_group
// https://stackoverflow.com/questions/3678401/jquery-validate-at-least-one-field-has-text
  jQuery.validator.addMethod('required_group', function(val, el) {
    var $module = $(el).parents('.prj-form');
    return $module.find('.required_group:filled').length
  })

//@a validator.url_prj_db
    var secDataVld
    jQuery.validator.addMethod("url_prj_db", function(url, elem) {
       var fail = true
       //const urlEnc = encodeURIComponent(url)
       //
       //const secDataVld = app._db_sec_data({ url })

       const data = JSON.stringify({ url })
       $.ajax({
         method  : 'POST',
         data    : { data },
         dataType  : 'json',
         url     : `/prj/sec/data`,
         async : false,
         success : function(data){
           fail = fail && data
           fail = fail && _.get(data,'sec')
           fail = fail && _.get(data,'file')
           secDataVld = data
         },
         error   : function(data){
           fail = false
         },
       });

       const ok = !fail ? true : false
       return ok
    }, function(params, elem){
        const sec = secDataVld.sec
        const authors = secDataVld.authors || []
        const authPlain = authors.map(x => x.plain)

        const titleData =  [ secDataVld.title ]
        titleData.push(...authPlain)
        titleData.push(secDataVld.date)

        const href = `/prj/sec/html?sec=${sec}`
        const title = titleData.join(', ')

        return `Url in DB: <a href="${href}">${title}</a>`
    });

//@a validator.md5_img_db
    jQuery.validator.addMethod("md5_img_db", function(file, elem) {
    })

//@a validator.url_img_db
    jQuery.validator.addMethod("url_img_db", function(url, elem) {
       if (!url) { return true }

       var fail = true
       const urlEnc = encodeURIComponent(url)

       const dataJson = JSON.stringify({ whr : { url } })
       $.ajax({
         method  : 'POST',
         data    : { data : dataJson },
         dataType : 'json',
         //url     : `/img/data/url/${urlEnc}`,
         url     : `/img/data`,
         async : false,
         success : function(data){
          console.log({ data });
           fail = fail && data
           fail = fail && _.get(data,'inum')
         },
         error   : function(data){
           fail = false
           console.log({ data });
         },
       });
       const ok = !fail ? true : false
       return ok
    }, "Image URL already in database!");

    return app
  }

//@@ init_forms
  this.init_forms = function({ $forms } = {}){
    const app = this

    $('#sec_new_date').datepicker({ dateFormat: "dd_mm_yy" })

    const config = app.config
    if (!$forms) { $forms = $('form') }

    const formMap = _.get(app,'config.ui.forms',{})

    app.init_form_validators()

    app.valOpts = {}

//@a form.each
    $forms.each(function(){
      const $form = $(this)

      const formState = {}
      const formSubmitReceived = {}

      let sub, sel

      const formId = $form.attr('id')
      const formConfig = _.get(formMap, formId, {})
      app.valOpts[formId] = _.get(formConfig, 'validate', {})

      app.formSubsApply({ $form, formId, formState })

      let cache = {}
      let tagList = []

      formState.tags = []

      const urlComplete = _.get(formConfig, 'fields.tags.autocomplete.url', '/prj/tag/list')

//@a form.input.tags.autocomplete
      $form.find('.prj-input-tags').autocomplete({
         minLength : 2,
         source: app.getSub({ path : 'events.autocomplete.source' })
              ({ field: 'tags', urlComplete, formState, cache })
      })

//@a form.input.tags.enter
      sub = app.getSub({ path : 'events.keypress.prj_input_tags' })
      $form.find('.prj-input-tags').keypress( sub({ formState }) )

      $form.find('.prj-input-area').keypress(function(e){
        if (e.keyCode == '13') {
          //e.preventDefault()
        }
        return true
      })

//@a form.reset
      $form.off('reset').on('reset', function(e){
        console.log('[form.reset]');

        var vld = $form.data('validator')
        if (vld) { vld.destroy() }

        $form.find('.prj-btn-tag').remove()
        formState.tags = []; cache = {}

        console.log('[form.reset.end]');
        return true
      })

      const formHandler = app.getFormHandler({ formId })
      if (formHandler) {
        formHandler({ $form, formState })
      }

//@a form.submit
      $form.off('submit').submit(async function(e){
         e.preventDefault()

         console.log(`[form.submit ${Date.now()}]`);

         const formData = new FormData($form.get(0))

         const handlerSubmit = app.getFormSubmitHandler({ formId })

//@a form.process.formState
         for(let key in formState){
            const val = formState[key]
            if(Array.isArray(val)){
              if (val.length) {
                formData.set(key, val.join(','))
              }
            }else{
                formData.set(key, val)
            }
         }

         const vo = app.getValOpts({ formId })

         var vld = $form.data('validator')
         if (vld) { vld.destroy() }
         $form.validate(vo)

//@a form.process.data
         let dataSubmit = {}
         for(let [key, prop] of formData){
            if (key in dataSubmit){
              const val = dataSubmit[key]
              if (! Array.isArray(val)) {
                dataSubmit[key] = [ val ]
              }

              dataSubmit[key].push(prop)
            }else{
              dataSubmit[key] = prop
            }
         }

//@a form.process.file.img
         const cnfFileImg = _.get(formConfig, 'fields.file.img', false)
         if (cnfFileImg) {
           const fileInput = _.get(dataSubmit,'file')
           if (fileInput) {
             const iFiles = Array.isArray(fileInput) ? fileInput : [ fileInput ]
             const iFiles64 = []

             for(let iFile of iFiles){
                if (!iFile.size) { continue }

                const reader = new FileReader()

                const pp = new Promise(async(resolve,reject) => {
                  reader.onload = () => {
                    resolve(reader.result)
                  }

                  reader.readAsDataURL(iFile)
                })

                const base64 = await pp
                iFiles64.push(base64)
                const src = base64

                var buf
                //try { buf = imageDataURI.decode(src).dataBuffer } catch(e) {}

                const width = '20%'
                const $img = $('<img/>').attr({ src, width })
                $('.prj-img-show').append($img)
             }
             dataSubmit.file = iFiles64.length ? iFiles64: undefined
           }
         }

//@a form.process.file.html
         const cnfFileHtml = _.get(formConfig, 'fields.file.html', false)
         if (cnfFileHtml) {
           const fileInput = _.get(dataSubmit,'file')
           if (fileInput) {
              const reader = new FileReader()

              const pp = new Promise(async(resolve,reject) => {
                reader.onload = () => { resolve(reader.result) }
                reader.readAsDataURL(fileInput)
              })
              const base64 = await pp
              if (base64) {
                dataSubmit.file = base64
              }
           }
         }


//@a form.submit.valid
         const isValid = $form.valid()

         if (isValid) {
           console.log(`[form.submit.valid ${Date.now()}]`);

           const schemeSubmit = _.get(formConfig, 'submit.ajax.data.scheme', 'stringify')
           const urlSubmit = _.get(formConfig, 'submit.url')

           if (urlSubmit) {
             let dataAjax = {}

             if (schemeSubmit == 'stringify') {
                const jsonData = JSON.stringify(dataSubmit)
                dataAjax = { data : jsonData }

             }else if (schemeSubmit == 'form') {
                dataAjax = dataSubmit
             }

             const ajaxOpts = _.get(formConfig, 'submit.ajax.opts',{})
             const okSub = app.getSub({ path : `forms.${formId}.submit.ajax.success` })
             const failSub = app.getSub({ path : `forms.${formId}.submit.ajax.error` })
             const args = { formId, $form }

             let urlSubmitAjax = urlSubmit

             if (_.isPlainObject(urlSubmit)) {
                const origin = app.pageUrl.origin
                const path = _.get(urlSubmit, 'path')
                const query = _.get(urlSubmit, 'query', {})
                const uri = new URL(origin + path)

                const { sec, proj } = app.get_sp()

                for (let [key, value] of Object.entries(query)) {
                  if (sec) { value = value.replace(/\@\@sec/g, sec ) }
                  if (proj) { value = value.replace(/\@\@proj/g, proj ) }
                  uri.searchParams.append(key, value)
                }
                urlSubmitAjax = uri.href
             }

             $.ajax({
               method  : 'POST',
               data    : dataAjax,
               url     : urlSubmitAjax,
               async: false,
               ...ajaxOpts,
               success : function(data){
                  if (okSub) { okSub({ data, ...args }) }
               },
               error   : function(data){
                  if (failSub) { failSub({ data, ...args }) }
               },
             })
           }
           if (handlerSubmit) {
             handlerSubmit({ $form, formState, formSubmitReceived })
           }else{
             $form.trigger("reset")
             $form.find(':checked[name=use]').click()
             $form.validate()
           }
         }

         return false
      })

    })

    return this;
  };

//@@ events
  this.events = async function(){

    this
      .on_click()
      .on_enter()
      .on_change()
      .on_submit()

    return this;
  };

//@@ run
  this.run = function(){
    console.log('[App] start run');

    this
        .init()
    ;

    return this;
  }

}

//eof
module.exports = { PrjMan }
//export default App

