function runAd(m) {
    var $ww = $(window).width();
    $slots = m == 'a' ? ajaxAdSlots : rbcAdSlots;
    $.each($slots, function (i, rbcAdSlot) {
        $slotId = rbcAdSlot.id;
        $currentBS = null;
        $sizes = rbcAdSlot.sizes;
        $.each($sizes, function (k, slotData) {
            if ($ww > slotData.minScreen &&  $ww <= slotData.maxScreen) {
                $currentBS = slotData.sys;
                return false;
            }
        });
        //console.log(rbcAdSlot.id);
        //console.log($currentBS);
        if ($currentBS !== null) {
            try{
                window['run' + $currentBS.provider]($slotId, $currentBS.options);
            } catch(e) {
                //console.log(e.name);
            }
        }
    });
}
function runAdriver($slotId, $options) {
    $('#'+$slotId).html('<div id="'+$options.id+'"></div>');
    (new adriver($options.id, $options.params)).onLoadComplete(function() {
        if (!this.reply.adid) {
            $('#'+$slotId).remove();
            //console.log('empty adriver ' + $slotId);
        } else {
            if (typeof $options.extracode != "undefined") {
                eval($options.extracode);
            }
        }
    });
}

function runDfp($slotId, $options)
{
    $('#'+$slotId).html('<div id="'+$options.id+'" style="width:'+$options.params.width+'px;margin:0 auto;"></div>');
    googletag.cmd.push(function() { googletag.display($options.id);});
}
function runAdsense($slotId, $options)
{
    $.getScript('//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js');
    $('#'+$slotId).html('<ins class="adsbygoogle" style="display:block; text-align:center;" data-ad-layout="'+$options.params.layout+'" data-ad-format="'+$options.params.format+'" data-ad-client="'+$options.params.client+'" data-ad-slot="'+$options.params.slot+'"></ins>');
    (adsbygoogle = window.adsbygoogle || []).push({});
}

$(function(){if (typeof runAd != "undefined") {runAd();}});