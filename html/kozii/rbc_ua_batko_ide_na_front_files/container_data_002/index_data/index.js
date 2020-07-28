(function (lib, img, cjs, ss, an) {

var p; // shortcut to reference prototypes
lib.webFontTxtInst = {}; 
var loadedTypekitCount = 0;
var loadedGoogleCount = 0;
var gFontsUpdateCacheList = [];
var tFontsUpdateCacheList = [];
lib.ssMetadata = [];



lib.updateListCache = function (cacheList) {		
	for(var i = 0; i < cacheList.length; i++) {		
		if(cacheList[i].cacheCanvas)		
			cacheList[i].updateCache();		
	}		
};		

lib.addElementsToCache = function (textInst, cacheList) {		
	var cur = textInst;		
	while(cur != exportRoot) {		
		if(cacheList.indexOf(cur) != -1)		
			break;		
		cur = cur.parent;		
	}		
	if(cur != exportRoot) {		
		var cur2 = textInst;		
		var index = cacheList.indexOf(cur);		
		while(cur2 != cur) {		
			cacheList.splice(index, 0, cur2);		
			cur2 = cur2.parent;		
			index++;		
		}		
	}		
	else {		
		cur = textInst;		
		while(cur != exportRoot) {		
			cacheList.push(cur);		
			cur = cur.parent;		
		}		
	}		
};		

lib.gfontAvailable = function(family, totalGoogleCount) {		
	lib.properties.webfonts[family] = true;		
	var txtInst = lib.webFontTxtInst && lib.webFontTxtInst[family] || [];		
	for(var f = 0; f < txtInst.length; ++f)		
		lib.addElementsToCache(txtInst[f], gFontsUpdateCacheList);		

	loadedGoogleCount++;		
	if(loadedGoogleCount == totalGoogleCount) {		
		lib.updateListCache(gFontsUpdateCacheList);		
	}		
};		

lib.tfontAvailable = function(family, totalTypekitCount) {		
	lib.properties.webfonts[family] = true;		
	var txtInst = lib.webFontTxtInst && lib.webFontTxtInst[family] || [];		
	for(var f = 0; f < txtInst.length; ++f)		
		lib.addElementsToCache(txtInst[f], tFontsUpdateCacheList);		

	loadedTypekitCount++;		
	if(loadedTypekitCount == totalTypekitCount) {		
		lib.updateListCache(tFontsUpdateCacheList);		
	}		
};
// symbols:



(lib.Bitmap2 = function() {
	this.initialize(img.Bitmap2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,68,68);


(lib.image1 = function() {
	this.initialize(img.image1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,350,300);


(lib.image2 = function() {
	this.initialize(img.image2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,350,300);


(lib.image3 = function() {
	this.initialize(img.image3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,350,300);


(lib.image4 = function() {
	this.initialize(img.image4);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,350,300);


(lib.product_pack1 = function() {
	this.initialize(img.product_pack1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,239,349);// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.Symbol31 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgnBNIAAiaIBOBOIhNBNg");
	this.shape.setTransform(6.1,7.8);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = getMCSymbolPrototype(lib.Symbol31, new cjs.Rectangle(2.1,0,7.9,15.7), null);


(lib.Sembol64 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Katman_3 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	var mask_graphics_0 = new cjs.Graphics().p("EAE6AkxMAAAgoGIGzAAMAAAAoGg");
	var mask_graphics_1 = new cjs.Graphics().p("EADOAkxMAAAgoGIKLAAMAAAAoGg");
	var mask_graphics_2 = new cjs.Graphics().p("EABjAkxMAAAgoGINjAAMAAAAoGg");
	var mask_graphics_3 = new cjs.Graphics().p("EgAIAkxMAAAgoGIQ6AAMAAAAoGg");
	var mask_graphics_4 = new cjs.Graphics().p("EgB0AkxMAAAgoGIUSAAMAAAAoGg");
	var mask_graphics_5 = new cjs.Graphics().p("EgDgAkxMAAAgoGIXqAAMAAAAoGg");
	var mask_graphics_6 = new cjs.Graphics().p("EgFLAkxMAAAgoGIbCAAMAAAAoGg");
	var mask_graphics_7 = new cjs.Graphics().p("EgG3AkxMAAAgoGIeaAAMAAAAoGg");
	var mask_graphics_8 = new cjs.Graphics().p("EgIjAkxMAAAgoGMAhyAAAMAAAAoGg");
	var mask_graphics_9 = new cjs.Graphics().p("EgKPAkxMAAAgoGMAlKAAAMAAAAoGg");
	var mask_graphics_10 = new cjs.Graphics().p("EgL6AkxMAAAgoGMAoiAAAMAAAAoGg");
	var mask_graphics_11 = new cjs.Graphics().p("EgNmAkxMAAAgoGMAr6AAAMAAAAoGg");
	var mask_graphics_12 = new cjs.Graphics().p("EgPSAkxMAAAgoGMAvSAAAMAAAAoGg");
	var mask_graphics_13 = new cjs.Graphics().p("EgQ9AkxMAAAgoGMAyqAAAMAAAAoGg");
	var mask_graphics_14 = new cjs.Graphics().p("EgSpAkxMAAAgoGMA2CAAAMAAAAoGg");
	var mask_graphics_15 = new cjs.Graphics().p("EgUVAkxMAAAgoGMA5aAAAMAAAAoGg");
	var mask_graphics_16 = new cjs.Graphics().p("EgWBAkxMAAAgoGMA8yAAAMAAAAoGg");
	var mask_graphics_17 = new cjs.Graphics().p("EgXsAkxMAAAgoGMBAKAAAMAAAAoGg");
	var mask_graphics_18 = new cjs.Graphics().p("EgZYAkxMAAAgoGMBDiAAAMAAAAoGg");
	var mask_graphics_19 = new cjs.Graphics().p("EgbEAkxMAAAgoGMBG6AAAMAAAAoGg");
	var mask_graphics_20 = new cjs.Graphics().p("Egc1AkxMAAAgoGMBKSAAAMAAAAoGg");

	this.timeline.addTween(cjs.Tween.get(mask).to({graphics:mask_graphics_0,x:74.9,y:235.3}).wait(1).to({graphics:mask_graphics_1,x:85.7,y:235.3}).wait(1).to({graphics:mask_graphics_2,x:96.6,y:235.3}).wait(1).to({graphics:mask_graphics_3,x:107.4,y:235.3}).wait(1).to({graphics:mask_graphics_4,x:118.2,y:235.3}).wait(1).to({graphics:mask_graphics_5,x:129,y:235.3}).wait(1).to({graphics:mask_graphics_6,x:139.9,y:235.3}).wait(1).to({graphics:mask_graphics_7,x:150.7,y:235.3}).wait(1).to({graphics:mask_graphics_8,x:161.5,y:235.3}).wait(1).to({graphics:mask_graphics_9,x:172.3,y:235.3}).wait(1).to({graphics:mask_graphics_10,x:183.2,y:235.3}).wait(1).to({graphics:mask_graphics_11,x:194,y:235.3}).wait(1).to({graphics:mask_graphics_12,x:204.8,y:235.3}).wait(1).to({graphics:mask_graphics_13,x:215.7,y:235.3}).wait(1).to({graphics:mask_graphics_14,x:226.5,y:235.3}).wait(1).to({graphics:mask_graphics_15,x:237.3,y:235.3}).wait(1).to({graphics:mask_graphics_16,x:248.1,y:235.3}).wait(1).to({graphics:mask_graphics_17,x:259,y:235.3}).wait(1).to({graphics:mask_graphics_18,x:269.8,y:235.3}).wait(1).to({graphics:mask_graphics_19,x:280.6,y:235.3}).wait(1).to({graphics:mask_graphics_20,x:290.9,y:235.3}).wait(1).to({graphics:null,x:0,y:0}).wait(51));

	// Katman_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#0174B2").s().p("EghggBsMBDCgJZIAAMtMhDCAJeg");
	this.shape.setTransform(358.5,334.6);

	var maskedShapeInstanceList = [this.shape];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(72));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(143.9,263.6,5.9,142);


(lib.Sembol33 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Katman_1
	this.instance = new lib.product_pack1();
	this.instance.parent = this;
	this.instance.setTransform(0,-13,1.403,1.403);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib.Sembol33, new cjs.Rectangle(0,-13,335.3,489.6), null);


(lib.Sembol14kopya2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Katman_1
	this.instance = new lib.image4();
	this.instance.parent = this;
	this.instance.setTransform(329,-6,0.886,0.886);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib.Sembol14kopya2, new cjs.Rectangle(329,-6,310,265.7), null);


(lib.Sembol14kopya = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Katman_1
	this.instance = new lib.image3();
	this.instance.parent = this;
	this.instance.setTransform(331,-6,0.871,0.871);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib.Sembol14kopya, new cjs.Rectangle(331,-6,305,261.5), null);


(lib.Sembol13kopya2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Katman_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgbB+IAAg3IA3AAIAAA3gAgNArIgQihIAAgHIA7AAIAAAHIgQChg");
	this.shape.setTransform(355.4,52.4);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgjB8QgNAAgLgDQgKgDgKgFIAQgmIAKAFQAGACAGAAQAGAAAEgDQAFgDADgHIhCjBIA2AAIAjCBIAkiBIA2AAIhBDDQgKAcgOANQgLANgXAAIgCgBg");
	this.shape_1.setTransform(340.6,58.2);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AggBYQgUgMgMgXQgLgWAAgdIAAgCQAAgdALgXQAMgWAUgNQAUgMAZAAQAWAAAPAGQAOAGALAMIgXAmQgIgIgJgEQgIgFgMAAQgRAAgLAPQgLAOAAAYIAAADQAAAZALAOQAMAOARAAQAMAAAIgEQAJgFAJgIIAWAjQgLANgPAHQgPAHgWAAQgaAAgTgMg");
	this.shape_2.setTransform(322.5,55.4);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgxBdQgNgHgIgNQgIgNAAgTIAAgCQAAgWAJgOQAIgMAPgGQAPgHAUAAQALAAALACQAJACAJAEIAAgGQAAgQgJgJQgJgJgSAAQgNAAgLADQgLADgMAFIgKgqQAOgGAQgEQAPgDAUAAQAoAAASAUQAUAUAAAlIAAB1IgyAAIAAgVQgJAMgMAGQgMAGgRABQgPgBgNgGgAgVAQQgHAHgBANIAAADQAAALAHAHQAIAFAKABQAPgBAJgHQAKgJAAgNIAAgRQgGgCgIgCQgGgCgJAAQgNAAgJAGg");
	this.shape_3.setTransform(303.8,55.5);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AAaBhIAAhEQgHAFgNADQgMADgNAAQgQAAgNgGQgOgGgHgOQgIgNAAgUIAAhNIAzAAIAAA+QABASAGAGQAIAHAJAAQAHAAAIgCQAHgCAGgEIAAhVIA0AAIAADBg");
	this.shape_4.setTransform(285,55.4);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AguBYQgVgMgLgXQgMgWAAgdIAAgCQAAgdAMgXQAMgWAUgNQAVgMAZAAQAbAAAUAMQAVAMALAXQAMAWAAAdIAAADQAAAdgMAWQgMAWgUANQgVANgagBQgaAAgUgMgAgdgoQgKAOgBAZIAAADQAAAQAFAMQAGAMAJAHQAJAHALAAQATAAALgPQAKgPAAgYIAAgCQAAgZgLgOQgLgQgSAAQgSAAgLAPg");
	this.shape_5.setTransform(255.9,55.4);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgZBhIAAiVIgwAAIAAgsICTAAIAAAsIgwAAIAACVg");
	this.shape_6.setTransform(237.5,55.4);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgyBdQgMgHgIgNQgIgNAAgTIAAgCQAAgWAJgOQAIgMAQgGQAPgHATAAQALAAALACQAKACAIAEIAAgGQAAgQgJgJQgJgJgSAAQgOAAgLADQgLADgLAFIgJgqQANgGAQgEQAOgDAVAAQAoAAASAUQAUAUAAAlIAAB1IgyAAIAAgVQgJAMgMAGQgLAGgSABQgQgBgNgGgAgVAQQgHAHgBANIAAADQABALAGAHQAIAFAKABQAPgBAJgHQAJgJAAgNIAAgRQgFgCgHgCQgIgCgIAAQgNAAgJAGg");
	this.shape_7.setTransform(219.8,55.5);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("Ag9BhIAAjBIB7AAIAAAsIhIAAIAACVg");
	this.shape_8.setTransform(204.2,55.4);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgxBdQgOgHgHgNQgIgNAAgTIAAgCQAAgWAIgOQAJgMAPgGQAQgHATAAQAMAAAJACQAKACAJAEIAAgGQAAgQgJgJQgKgJgRAAQgOAAgKADQgLADgMAFIgKgqQAOgGAPgEQAPgDAUAAQAoAAAUAUQATAUAAAlIAAB1IgyAAIAAgVQgJAMgMAGQgMAGgQABQgQgBgNgGgAgUAQQgJAHAAANIAAADQAAALAIAHQAGAFALABQAOgBAKgHQAKgJAAgNIAAgRQgGgCgIgCQgGgCgJAAQgNAAgIAGg");
	this.shape_9.setTransform(186.1,55.5);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AhBBoQgXgbAAg1IAAgFQAAgXACgVQACgVAGgSQAGgSANgMQAOgNAWgHQAWgHAZgDIAwgHIAHApIgZAFIgbAFQgdAFgRAGQgRAHgHAKQgHAJAAAPQADgGAHgHQAIgGAMgFQAMgGARAAQAVAAASAMQASALALAWQALATABAdIAAABQgBAdgLAVQgLAWgUAMQgUAMgaAAQgqAAgXgcgAgbgDQgKANAAAWIAAAFQAAAXAKANQALAOAQAAQASAAAKgNQAKgOAAgWIAAgFQAAgWgLgNQgKgOgRAAQgRAAgKANg");
	this.shape_10.setTransform(167,52.2);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgiBXQgUgMgLgWQgLgWAAgeIAAgCQAAgdALgWQAMgWAVgMQAUgNAaAAQATAAAQAHQAPAHAJAJIgTAkQgIgHgJgEQgKgEgKAAQgQAAgKAJQgLAKgFASIA4AAIAAAkIg4AAQAFASALAJQAKAKASAAQAJAAAJgEQAJgEAJgIIAWAkQgLAMgQAGQgQAHgXAAQgZAAgUgNg");
	this.shape_11.setTransform(307.5,26.4);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgyBcQgMgGgIgNQgIgOAAgSIAAgDQAAgUAJgPQAIgMAQgGQAPgHATAAQALAAALACQAKACAIADIAAgFQAAgQgJgJQgJgJgSAAQgOAAgLADQgLADgLAFIgJgqQANgHAQgDQAOgEAVABQAogBASAVQAUAUAAAlIAAB1IgyAAIAAgVQgJALgMAHQgLAGgSABQgQAAgNgIgAgVARQgHAGgBANIAAACQABANAGAFQAIAHAKAAQAPgBAJgHQAKgJAAgNIAAgRQgGgCgHgCQgIgCgIAAQgNAAgJAHg");
	this.shape_12.setTransform(288.7,26.4);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AAtBhIAAhyIgtBLIgshLIAAByIgzAAIAAjBIA0AAIArBNIAshNIAzAAIAADBg");
	this.shape_13.setTransform(268.1,26.3);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AAfCFIAAhuIg+BuIgwAAIAAjAIAxAAIAABsIA9hsIAyAAIAADAgAgjhaQgPgNgDgYIAdgFQADAKAGAGQAGAGAKAAQAKAAAGgGQAGgGADgKIAdAFQgEAYgOANQgPANgVAAQgWAAgOgNg");
	this.shape_14.setTransform(246.4,22.7);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgyBcQgMgGgIgNQgIgOAAgSIAAgDQAAgUAJgPQAIgMAPgGQAQgHATAAQALAAALACQAKACAIADIAAgFQAAgQgJgJQgJgJgSAAQgNAAgMADQgLADgLAFIgKgqQAOgHAQgDQAOgEAVABQAogBASAVQAUAUAAAlIAAB1IgyAAIAAgVQgJALgMAHQgMAGgRABQgPAAgOgIgAgVARQgHAGgBANIAAACQABANAGAFQAIAHAKAAQAPgBAJgHQAKgJAAgNIAAgRQgGgCgIgCQgGgCgJAAQgNAAgJAHg");
	this.shape_15.setTransform(226.5,26.4);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgnBeQgTgGgNgLIASglQAKAIANAFQAMAEAOAAQAKAAAIgFQAIgGAAgJQAAgJgJgHQgIgFgPgBIgQAAIAAggIAQAAQANAAAIgHQAHgFAAgKQAAgIgHgFQgIgFgKAAQgMAAgLAFQgLAFgIAHIgJgSIgIgSQANgKASgHQASgGAUAAQASAAAPAGQAPAHAIALQAJAMAAAPQAAASgIALQgIAKgMAFQAOAFAJAKQAJAMAAASQAAASgJANQgKAOgPAGQgQAIgVAAQgWAAgSgGg");
	this.shape_16.setTransform(209,26.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

}).prototype = getMCSymbolPrototype(lib.Sembol13kopya2, new cjs.Rectangle(153.9,0,209.5,74.9), null);


(lib.Sembol13 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Katman_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgjB8QgNAAgLgDQgLgDgJgFIAQgmIAKAFQAHACAFAAQAGAAAFgDQAEgDADgHIhCjBIA2AAIAjCBIAkiBIA1AAIhADDQgKAcgOANQgMANgWAAIgCgBg");
	this.shape.setTransform(400.2,64.6);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("ABVBhIgrhQIgRAgIAAAwIgxAAIAAgwIgRggIgqBQIg4AAIA+htIg9hUIA6AAIA4BTIAAhTIAxAAIAABTIA4hTIA6AAIg9BUIA/Btg");
	this.shape_1.setTransform(376.6,61.8);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgZCCIAAjBIAyAAIAADBgAAMhUIAAgtIAwAAIAAAtgAg7hUIAAgtIAwAAIAAAtg");
	this.shape_2.setTransform(357.6,58.5);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgjB8QgNAAgLgDQgKgDgKgFIAQgmIAKAFQAGACAGAAQAGAAAFgDQAEgDADgHIhCjBIA2AAIAjCBIAkiBIA1AAIhADDQgKAcgOANQgMANgWAAIgCgBg");
	this.shape_3.setTransform(334,64.6);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AhOBhIAAjBIBVAAQASAAAPAGQAOAGAIALQAIALAAARQAAARgIAKQgHAKgLAFQAQAFAJALQAKALAAATQgBASgIAMQgJAMgQAGQgPAGgVAAgAgbA4IAcAAQAMAAAIgFQAGgFAAgJQAAgLgGgFQgHgFgOAAIgbAAgAgbgRIAZAAQALAAAGgFQAIgFAAgKQAAgKgHgFQgGgFgLAAIgaAAg");
	this.shape_4.setTransform(315.3,61.8);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AguBYQgVgNgLgVQgMgXAAgdIAAgCQAAgeAMgVQAMgXAUgNQAVgMAZAAQAbAAAUAMQAVANALAWQAMAWAAAdIAAADQAAAdgMAWQgMAWgUAMQgVANgaABQgaAAgUgNgAgdgoQgKAPgBAXIAAAEQAAAQAFAMQAGAMAJAHQAJAHALAAQATAAALgPQAKgOAAgZIAAgCQAAgZgLgPQgLgPgSAAQgSABgLAOg");
	this.shape_5.setTransform(294.8,61.9);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AhYB+IAAj3IA0AAIAAAaQAIgMAMgJQANgJASAAQATAAARALQARAKAKAWQAKAWABAhIAAAFIAAABQgBAfgKAWQgKAWgRAKQgRALgTAAQgSgBgNgIQgMgIgIgLIAABPgAgahCQgKAOgBAZIAAAFQABAYAKAOQALAOAPAAQAQAAALgOQAKgOABgYIAAgFQgBgZgKgOQgLgOgQAAQgPAAgLAOg");
	this.shape_6.setTransform(274.1,64.4);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AguBYQgVgNgLgVQgMgXAAgdIAAgCQAAgeAMgVQAMgXAUgNQAVgMAZAAQAbAAAUAMQAVANALAWQAMAWAAAdIAAADQAAAdgMAWQgMAWgUAMQgVANgaABQgaAAgUgNgAgdgoQgKAPgBAXIAAAEQAAAQAFAMQAGAMAJAHQAJAHALAAQATAAALgPQAKgOAAgZIAAgCQAAgZgLgPQgLgPgSAAQgSABgLAOg");
	this.shape_7.setTransform(252.8,61.9);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AAzB1IAAgpIhnAAIgEApIgrAAIAAhVIAUAAQAKgZADggQAFghgBgmIAAgUICMAAIAACUIAWAAIgDAqIgDArgAgPgjQgBASgDARQgDASgGAOIA3AAIAAhoIgpAAIgBAlg");
	this.shape_8.setTransform(231.9,63.9);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgnBeQgTgGgNgLIASgkQAKAHANAEQAMAFAOABQAKgBAIgGQAIgFAAgJQAAgKgJgFQgIgHgPAAIgQAAIAAggIAQAAQANAAAIgGQAHgGAAgJQAAgKgHgEQgIgEgKAAQgMAAgLAEQgLAFgIAHIgJgRIgIgSQANgLASgGQASgHAUAAQASAAAPAHQAPAFAIAMQAJAMAAAQQAAARgIAKQgIALgMAGQAOADAJAMQAJAKAAATQAAASgJANQgKANgPAIQgQAHgVAAQgWAAgSgGg");
	this.shape_9.setTransform(213.3,61.9);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AAfBhIAAhtIg9BtIgyAAIAAjBIAzAAIAABsIA9hsIAwAAIAADBg");
	this.shape_10.setTransform(186.1,61.8);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgZBhIAAiVIgwAAIAAgsICTAAIAAAsIgwAAIAACVg");
	this.shape_11.setTransform(168.1,61.8);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AghBYQgTgNgLgVQgMgXAAgdIAAgCQAAgeAMgVQALgXAUgNQAUgMAZAAQAWgBAOAHQAPAGALAMIgXAmQgIgIgIgEQgKgFgMAAQgQAAgLAOQgKAPgBAXIAAAEQAAAYALAOQALAPATAAQAKAAAKgFQAJgEAIgIIAWAkQgLAMgPAHQgPAHgXABQgYAAgVgNg");
	this.shape_12.setTransform(151.5,61.9);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgZCCIAAjBIAyAAIAADBgAAMhUIAAgtIAwAAIAAAtgAg7hUIAAgtIAwAAIAAAtg");
	this.shape_13.setTransform(137.8,58.5);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgdA6IAEhyIA3AAIAAABIgjBxg");
	this.shape_14.setTransform(128.8,52);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgnBeQgTgGgNgLIASgkQAKAHANAEQAMAFAOABQAKgBAIgGQAIgFAAgJQAAgKgJgFQgIgHgPAAIgQAAIAAggIAQAAQANAAAIgGQAHgGAAgJQAAgKgHgEQgIgEgKAAQgMAAgLAEQgLAFgIAHIgJgRIgIgSQANgLASgGQASgHAUAAQASAAAPAHQAPAFAIAMQAJAMAAAQQAAARgIAKQgIALgMAGQAOADAJAMQAJAKAAATQAAASgJANQgKANgPAIQgQAHgVAAQgWAAgSgGg");
	this.shape_15.setTransform(115.3,61.9);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgjB8QgNAAgLgDQgKgDgKgFIAQgmIAKAFQAGACAGAAQAGAAAEgDQAFgDADgHIhCjBIA2AAIAjCBIAkiBIA2AAIhBDDQgKAcgOANQgLANgXAAIgCgBg");
	this.shape_16.setTransform(379.8,29.1);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AAcBhIAAhLIg3AAIAABLIgzAAIAAjBIAzAAIAABLIA3AAIAAhLIAzAAIAADBg");
	this.shape_17.setTransform(360.2,26.3);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AAfBhIAAhtIg9BtIgyAAIAAjBIAyAAIAABsIA+hsIAwAAIAADBg");
	this.shape_18.setTransform(340.1,26.3);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AgZBhIAAiVIgwAAIAAgsICTAAIAAAsIgwAAIAACVg");
	this.shape_19.setTransform(322.1,26.3);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AAfBhIAAhtIg+BtIgwAAIAAjBIAxAAIAABsIA9hsIAyAAIAADBg");
	this.shape_20.setTransform(304.1,26.3);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AA0B1IAAgoIhoAAIgEAoIgrAAIAAhVIATAAQALgZAEggQADghAAglIAAgVICMAAIAACUIAWAAIgDArIgDAqgAgPgkQgBAUgDAQQgDARgGAPIA3AAIAAhpIgpAAIgBAlg");
	this.shape_21.setTransform(283.5,28.4);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AAfBhIAAhtIg+BtIgwAAIAAjBIAxAAIAABsIA9hsIAyAAIAADBg");
	this.shape_22.setTransform(254,26.3);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AgZBhIAAiVIgwAAIAAgsICTAAIAAAsIgwAAIAACVg");
	this.shape_23.setTransform(236,26.3);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AAfBhIAAhtIg+BtIgwAAIAAjBIAxAAIAABsIA9hsIAyAAIAADBg");
	this.shape_24.setTransform(217.9,26.3);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AghBYQgTgMgLgXQgMgVAAgdIAAgEQAAgcAMgXQALgWAUgMQAUgNAZgBQAWABAOAGQAPAGALAMIgXAmQgIgIgIgEQgKgFgMAAQgQABgLAOQgKANgBAZIAAADQAAAZALAOQALAOATAAQAKAAAKgEQAJgFAIgIIAWAjQgLANgPAHQgPAIgXgBQgYAAgVgMg");
	this.shape_25.setTransform(199.2,26.4);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AgiB8QgPAAgKgDQgKgDgJgFIAPgmIALAFQAFACAGAAQAGAAAEgDQAEgDAEgHIhBjBIA1AAIAkCBIAkiBIA1AAIhBDDQgKAcgOANQgLANgXAAIgBgBg");
	this.shape_26.setTransform(180.8,29.1);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AAsBhIAAhyIgsBLIgshLIAAByIgyAAIAAjBIAzAAIArBNIAshNIA0AAIAADBg");
	this.shape_27.setTransform(159.6,26.3);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AgyB5QgVgIgRgOIAVgoQAMAKAPAHQAPAGARAAQATAAANgGQAMgHAAgQQAAgRgMgIQgNgIgVAAIgUAAIAAgqIAUAAQALAAAKgFQAKgEAGgIQAGgHAAgJQgBgNgLgHQgLgHgRAAQgRAAgNAGQgNAGgKAKIgVglQALgKAMgHQAMgHAQgEQAQgEAUAAQAXAAASAJQARAIAKAPQAKAPAAAUQAAAPgFALQgGAMgJAHQgJAIgKAFQATAFAMAOQANAPAAAZQAAAWgLARQgLARgTAJQgUAKgaAAQgeAAgWgJg");
	this.shape_28.setTransform(137.6,23.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

}).prototype = getMCSymbolPrototype(lib.Sembol13, new cjs.Rectangle(104.9,0,307.5,116.8), null);


(lib.Sembol5 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Katman_1
	this.shape = new cjs.Shape();
	this.shape.graphics.lf(["#FFFFFF","#F9F9F9"],[0,1],15.1,-5,-71.2,-94).s().p("A2T2XMAsmAAAMgkZAkgIoNIPg");
	this.shape.setTransform(142.8,143.2);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.lf(["#FFFFFF","#EBEBEB"],[0,1],-23,86.6,1.3,-146.2).s().p("EgoDAN1IAAguIINoOMBH6gStIAAbpg");
	this.shape_1.setTransform(256.4,202.5);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.lf(["#FFFFFF","#F1F1F1"],[0,1],50.8,72,21.5,-85.9).s().p("AAdyQMAjgAAAIAAR0MhH5AStg");
	this.shape_2.setTransform(282.6,116.9);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#F1F1F1").s().p("EgoDAWvMAAAgtdMBQHAAAMAAAAtdg");
	this.shape_3.setTransform(256.4,145.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

}).prototype = getMCSymbolPrototype(lib.Sembol5, new cjs.Rectangle(0,0,512.8,291), null);


(lib.Sembol29 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Katman_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#0287D1").s().p("AgQBKIAAgbIAZAAIAAAbgAgLAdIgDgiIAAgBQARgCAIgGQAIgHAAgKQAAgJgFgGQgHgFgJAAQgIAAgIADQgHADgHAHIgLgRQAIgJAKgEQALgFAOAAQAMAAAKAFQAKAFAGAJQAFAJABAMIAAABQAAANgGAIQgEAIgJAEQgIAFgLADIgCAUg");
	this.shape.setTransform(181,13.2);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#0287D1").s().p("AAUA3IgbguIgPASIAAAcIgYAAIAAhuIAYAAIAAA1IAng1IAbAAIgkAvIAnA/g");
	this.shape_1.setTransform(171.2,15.1);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#0287D1").s().p("AAWA3IAAgmIgSAAIgUAmIgdAAIAbgqQgKgDgGgJQgGgHAAgNQgBgRAKgJQAKgKAVAAIAuAAIAABugAgMgfQgFAEAAAJQAAAJAFAFQAFAEAIAAIAVAAIAAgkIgRAAQgMABgFAEg");
	this.shape_2.setTransform(159.2,15.1);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#0287D1").s().p("AgVAzQgMgHgGgNQgHgNAAgRIAAgBQAAgRAGgMQAHgNAKgIQALgHANAAQAPAAAKAIQAKAHAGAOQAFANAAAPIAAAFIAAAEIhFAAQACAOAHAHQAIAHAKAAQAIAAAHgCQAGgDAGgGIALAPQgIAIgJAEQgJAFgNAAQgOAAgLgHgAAYgHQgBgNgGgJQgGgIgKAAQgJAAgGAIQgHAIgCAOIAvAAIAAAAg");
	this.shape_3.setTransform(143.2,15.1);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#0287D1").s().p("AgrA3IgHAAIABgUIAEABIADAAQADAAADgCQADgCADgEIAEgQQABgKABgQIABgpIBKAAIAABuIgYAAIAAhaIgcAAQAAAegCARQgCATgFAJQgEAJgHAEQgHADgIAAIgHgBg");
	this.shape_4.setTransform(131.2,15.2);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#0287D1").s().p("AgaA1QgIgEgFgHQgEgIAAgKIAAgCQAAgMAFgIQAFgHAJgDQAIgEAMAAIAOABIALADIAAgEQAAgMgGgFQgGgGgLAAQgIAAgHACIgNAEIgEgTQAHgEAJgCQAIgCALAAQAWAAALALQAKALABAVIAABEIgYAAIAAgNQgFAHgHAEQgIAEgKAAQgJAAgIgEgAgPAIQgFAEAAAJIAAABQAAAJAFAEQAFAFAIAAQAKgBAGgFQAHgGAAgKIAAgLIgJgDIgLgBQgKAAgGAFg");
	this.shape_5.setTransform(120.5,15.1);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#0287D1").s().p("AgQATQAKgCAEgFQADgGAAgHIgKAAIAAgbIAaAAIAAAXQgBAQgHAIQgIAJgOABg");
	this.shape_6.setTransform(107,20.8);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#0287D1").s().p("AgSAyQgLgHgHgNQgHgMAAgRIAAgBQAAgRAHgMQAHgNALgHQAMgHAOgBQALABAJAEQAIAEAGAGIgJAQQgGgFgGgCQgHgDgIAAQgJABgHAHQgHAIgCAMIAkAAIAAARIgkAAQADANAIAHQAIAHALABQAGgBAGgCQAFgDAFgFIALAQQgHAHgJAEQgIAFgNAAQgOAAgLgIg");
	this.shape_7.setTransform(99.8,15.1);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#0287D1").s().p("AgaA1QgIgEgEgHQgFgIgBgKIAAgCQABgMAFgIQAFgHAIgDQAKgEAMAAIAMABIAMADIAAgEQAAgMgGgFQgGgGgLAAQgIAAgHACIgNAEIgFgTQAIgEAIgCQAJgCAKAAQAWAAALALQAMALgBAVIAABEIgXAAIAAgNQgFAHgIAEQgHAEgKAAQgKAAgHgEgAgOAIQgGAEAAAJIAAABQAAAJAFAEQAFAFAIAAQAKgBAHgFQAGgGABgKIAAgLIgKgDIgMgBQgJAAgFAFg");
	this.shape_8.setTransform(88.9,15.1);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#0287D1").s().p("AgiA3IAAhuIBFAAIAAAUIgsAAIAABag");
	this.shape_9.setTransform(80,15.1);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#0287D1").s().p("AgaA1QgIgEgEgHQgFgIgBgKIAAgCQABgMAFgIQAFgHAIgDQAKgEAMAAIAMABIAMADIAAgEQAAgMgGgFQgGgGgLAAQgIAAgHACIgNAEIgFgTQAIgEAIgCQAJgCAKAAQAXAAALALQALALgBAVIAABEIgXAAIAAgNQgFAHgIAEQgHAEgKAAQgKAAgHgEgAgPAIQgFAEAAAJIAAABQAAAJAFAEQAFAFAIAAQAKgBAHgFQAGgGABgKIAAgLIgKgDIgMgBQgJAAgGAFg");
	this.shape_10.setTransform(69.5,15.1);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#0287D1").s().p("AAdA3IAAhJIgdAxIgdgwIAABIIgXAAIAAhuIAYAAIAcAyIAdgyIAYAAIAABug");
	this.shape_11.setTransform(57.6,15.1);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#0287D1").s().p("AgaAyQgLgHgHgNQgGgMAAgRIAAgBQAAgRAGgMQAHgNALgHQAMgIAOAAQAPAAALAHQAMAIAGAMQAIANgBARIAAABQABAQgIANQgGANgMAHQgMAHgOABQgOAAgMgIgAgNgfQgHAEgDAIQgEAIAAALIAAABQAAAKAEAIQADAIAHAFQAGAFAHAAQAJAAAFgFQAHgEADgJQADgIAAgKIAAgBQAAgLgDgIQgEgIgGgEQgGgFgIAAQgIAAgFAFg");
	this.shape_12.setTransform(44.9,15.1);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#0287D1").s().p("AAVA3IAAhaIgoAAIAABaIgYAAIAAhuIBXAAIAABug");
	this.shape_13.setTransform(33.2,15.1);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#0287D1").s().p("AgaAyQgLgHgHgNQgGgMAAgRIAAgBQAAgRAGgMQAHgNALgHQAMgIAOAAQAPAAALAHQAMAIAGAMQAIANgBARIAAABQABAQgIANQgGANgMAHQgMAHgOABQgOAAgMgIgAgNgfQgHAEgDAIQgDAIgBALIAAABQABAKADAIQAEAIAGAFQAGAFAHAAQAIAAAHgFQAGgEAEgJQACgIAAgKIAAgBQABgLgEgIQgEgIgFgEQgHgFgIAAQgIAAgFAFg");
	this.shape_14.setTransform(21.4,15.1);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#0287D1").s().p("AAsBYIAAgdIhXAAIgDAdIgUAAIAAgzIAMAAQAHgOADgRQAEgQACgXQABgXAAgfIBZAAIAAB8IAPAAIgDAzgAgRgGQgDAZgIASIA3AAIAAhlIgpAAQAAAhgDAZg");
	this.shape_15.setTransform(8.4,14.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

}).prototype = getMCSymbolPrototype(lib.Sembol29, new cjs.Rectangle(0,0,193.1,26.4), null);


(lib.Sembol28 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Katman_1
	this.instance = new lib.image1();
	this.instance.parent = this;
	this.instance.setTransform(331,-7,0.87,0.87);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib.Sembol28, new cjs.Rectangle(331,-7,304.5,261), null);


(lib.Sembol17kopya = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Katman_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#0187D1").s().p("AkZB1IIjhNIAAAsIojBOgACdAFQgUgTAAghQAAgiAUgTQAUgVAiAAQAfAAAUAUQAUAUAAAfQAAAlgWATQgVASgfAAQgfAAgUgTgAC8hMQgHAKAAASQAAATAHALQAIAMAOAAQAMAAAIgLQAHgMAAgTQAAgRgGgLQgIgOgNAAQgPAAgHAOgAhtAFQgTgSgBghQAAgeARgVQAUgYAiAAQAfAAARAWQANATAAAdIgBARIhZAAQABANALAHQALAHAQAAQAUAAATgGIAFAcQgVAJgdAAQgjAAgUgTgAgkhAQAAgcgZAAQgMAAgHAKQgHAIAAAKIAzAAIAAAAgAkDAGQgUgRgCggIAAh2IAuAAIAAAtQAOgFAPAAQAgAAAUAUQATAUAAAfQAAAlgXATQgUASgfAAQgeAAgUgSgAjlhOQgGAKAAAQIAAAJQACAlAaAAQAMAAAIgLQAHgMAAgTQAAgRgHgLQgHgOgNAAQgOAAgIAMgABkAVIgtg/IAAA/IgsAAIAAi2IAsAAIAABmIAmg6IA4AAIg3BCIA9BIg");
	this.shape.setTransform(28.2,16.2);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = getMCSymbolPrototype(lib.Sembol17kopya, new cjs.Rectangle(0,0,56.4,32.4), null);


(lib.Sembol17 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Katman_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AkZB1IIjhNIAAAsIojBOgACdAFQgUgTAAghQAAgiAUgTQAUgVAiAAQAfAAAUAUQAUAUAAAfQAAAlgWATQgVASgfAAQgfAAgUgTgAC8hMQgHAKAAASQAAATAHALQAIAMAOAAQAMAAAIgLQAHgMAAgTQAAgRgGgLQgIgOgNAAQgPAAgHAOgAhtAFQgTgSgBghQAAgeARgVQAUgYAiAAQAfAAARAWQANATAAAdIgBARIhZAAQABANALAHQALAHAQAAQAUAAATgGIAFAcQgVAJgdAAQgjAAgUgTgAgkhAQAAgcgZAAQgMAAgHAKQgHAIAAAKIAzAAIAAAAgAkDAGQgUgRgCggIAAh2IAuAAIAAAtQAOgFAPAAQAgAAAUAUQATAUAAAfQAAAlgXATQgUASgfAAQgeAAgUgSgAjlhOQgGAKAAAQIAAAJQACAlAaAAQAMAAAIgLQAHgMAAgTQAAgRgHgLQgHgOgNAAQgOAAgIAMgABkAVIgtg/IAAA/IgsAAIAAi2IAsAAIAABmIAmg6IA4AAIg3BCIA9BIg");
	this.shape.setTransform(28.2,16.2);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = getMCSymbolPrototype(lib.Sembol17, new cjs.Rectangle(0,0,56.4,32.4), null);


(lib.Sembol16 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Katman_1
	this.instance = new lib.Bitmap2();
	this.instance.parent = this;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib.Sembol16, new cjs.Rectangle(0,0,68,68), null);


(lib.Sembol14 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Katman_1
	this.instance = new lib.image2();
	this.instance.parent = this;
	this.instance.setTransform(340,2,0.817,0.817);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib.Sembol14, new cjs.Rectangle(340,2,285.8,245), null);


(lib.Sembol7 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Katman_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#0287D1").s().p("ABvBKIAAhfQAAgLADgRIgDAAIghBNIgYAAIghhNIgDAAIADAcIAABfIgUAAIAAiTIAZAAIAnBWIAphWIAYAAIAACTgAhTBKIgCiDIgsAAIAAgQIBtAAIAAAQIguAAIAACDg");
	this.shape.setTransform(443,83.9);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#0287D1").s().p("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");
	this.shape_1.setTransform(212,61.6);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_1},{t:this.shape}]},3).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,342.1,122.5);


(lib.Symbol32 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2
	this.instance = new lib.Symbol31();
	this.instance.parent = this;
	this.instance.setTransform(75.3,11.9,0.568,0.387,0,0,0,3.1,6.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({x:77.3},7).to({x:75.3},7).wait(1));

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgHAeIAAgtIgPAAIAAgOIAtAAIAAAOIgPAAIAAAtg");
	this.shape.setTransform(64.4,12.2);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgSAmIgGgDIAFgMIADACIAEAAIADAAIACgDIgUg8IARAAIAKAoIALgoIARAAIgUA8QgEAJgEAEQgDAEgHAAIgIgBg");
	this.shape_1.setTransform(59,13.1);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgHAeIAAgtIgPAAIAAgOIAtAAIAAAOIgPAAIAAAtg");
	this.shape_2.setTransform(53.5,12.2);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgLAbQgHgDgDgHQgEgHAAgKIAAAAQAAgIAEgIQADgGAGgFQAGgDAGAAQAJgBAGAFQAGAEADAHQACAHAAAIIAAADIAAADIgjAAQABAGAEADQADADAEAAQAEAAADgBIAGgFIAIAKQgFAFgEACQgGACgHABQgGgBgHgEgAAKgEQAAgGgDgEQgCgDgFgBQgDABgDADQgCAEgBAGIATAAIAAAAg");
	this.shape_3.setTransform(45.2,12.2);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgnAeIAAg7IAQAAIAAAtIAQAAIAAgtIAPAAIAAAtIAQAAIAAgtIAQAAIAAA7g");
	this.shape_4.setTransform(37.5,12.2);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgXAeIAAg7IAQAAIAAAUIAJAAQAKAAAGAFQAFAEABAKQgBAHgCAEQgDAFgFACQgFACgGAAgAgHASIAHAAQAEAAACgCQABgDAAgDQAAgEgBgCQgDgCgDAAIgHAAg");
	this.shape_5.setTransform(30.3,12.2);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgYAeIgEgBIACgNIACABIACAAQAAAAABAAQAAAAABAAQAAgBABAAQAAAAABAAIACgHIACgNIAAgZIArAAIAAA7IgQAAIAAguIgNAAIAAAXQgBAIgCAGQgDAFgDACQgEACgFAAIgGAAg");
	this.shape_6.setTransform(23.7,12.2);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgHApIAAg8IAPAAIAAA8gAgHgZIAAgPIAPAAIAAAPg");
	this.shape_7.setTransform(19.3,11.1);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgcAoIAAhPIAzAAIAAAQIgjAAIAAANIAOAAQAMAAAHAHQAIAFAAAMQAAAIgEAGQgEAGgGADQgGADgIAAgAgMAZIAOAAQAFAAADgDQACgDAAgFQAAgFgCgDQgDgCgFAAIgOAAg");
	this.shape_8.setTransform(14.6,11.3);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#007DBA").s().p("ApBCJIAAkRISDAAIAAERg");
	this.shape_9.setTransform(45.6,11.7,0.788,0.854);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(15));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,91.2,23.4);


(lib.Sembol34 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Sembol 33
	this.instance = new lib.Sembol33();
	this.instance.parent = this;
	this.instance.setTransform(93.8,242.5,0.646,0.646,0,0,0,86.5,235);
	this.instance.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance).to({scaleX:1,scaleY:1,x:86.5,y:244,alpha:1},39).wait(206));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(37.9,82.2,216.6,316.4);


(lib.Sembol27kopya2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Katman_5 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	var mask_graphics_0 = new cjs.Graphics().p("EhP2AOoMCftgW0IAABXMiftAW0g");
	var mask_graphics_1 = new cjs.Graphics().p("EhP2AObMCftgW1IAABpMiftAW1g");
	var mask_graphics_2 = new cjs.Graphics().p("EhP2ANyMCftgW0IAACfMiftAW0g");
	var mask_graphics_3 = new cjs.Graphics().p("EhP2AMuMCftgW0IAAD5MiftAW0g");
	var mask_graphics_4 = new cjs.Graphics().p("EhP2ALPMCftgW0IAAF4MiftAWzg");
	var mask_graphics_5 = new cjs.Graphics().p("EhP2AJUMCftgWzIAAIbMiftAWzg");
	var mask_graphics_6 = new cjs.Graphics().p("EhP2AG+MCftgWyIAALiMiftAWyg");
	var mask_graphics_7 = new cjs.Graphics().p("EhP2AENMCftgWxIAAPMMiftAWyg");
	var mask_graphics_8 = new cjs.Graphics().p("EhP2ABrMCftgWwIAATbMiftAWwg");
	var mask_graphics_9 = new cjs.Graphics().p("EhP2gAuMCftgWwIAAYNMiftAWwg");
	var mask_graphics_10 = new cjs.Graphics().p("EhP2gDbMCftgWuIAAdlMiftAWug");
	var mask_graphics_11 = new cjs.Graphics().p("EhP2gGZMCftgWtMAAAAjgMiftAWtg");
	var mask_graphics_12 = new cjs.Graphics().p("EhP2gJqMCftgWrMAAAAqAMiftAWrg");
	var mask_graphics_13 = new cjs.Graphics().p("EhP1gNMMCfrgWqMAAAAxDMifrAWqg");
	var mask_graphics_14 = new cjs.Graphics().p("EhP1gRBMCfrgWoMAAAA4rMifrAWog");
	var mask_graphics_15 = new cjs.Graphics().p("EhP1gVIMCfrgWmMAAABA3MifrAWmg");

	this.timeline.addTween(cjs.Tween.get(mask).to({graphics:mask_graphics_0,x:481.2,y:102.3}).wait(1).to({graphics:mask_graphics_1,x:481.2,y:102.8}).wait(1).to({graphics:mask_graphics_2,x:481.2,y:104.1}).wait(1).to({graphics:mask_graphics_3,x:481.2,y:106.3}).wait(1).to({graphics:mask_graphics_4,x:481.2,y:109.4}).wait(1).to({graphics:mask_graphics_5,x:481.2,y:113.5}).wait(1).to({graphics:mask_graphics_6,x:481.2,y:118.4}).wait(1).to({graphics:mask_graphics_7,x:481.2,y:124.2}).wait(1).to({graphics:mask_graphics_8,x:481.2,y:126.7}).wait(1).to({graphics:mask_graphics_9,x:481.2,y:126.5}).wait(1).to({graphics:mask_graphics_10,x:481.2,y:126.4}).wait(1).to({graphics:mask_graphics_11,x:481.2,y:126.2}).wait(1).to({graphics:mask_graphics_12,x:481.2,y:126}).wait(1).to({graphics:mask_graphics_13,x:481.2,y:125.8}).wait(1).to({graphics:mask_graphics_14,x:481.2,y:125.6}).wait(1).to({graphics:mask_graphics_15,x:481.3,y:125.3}).wait(1332));

	// Katman_1
	this.instance = new lib.Sembol14kopya2();
	this.instance.parent = this;
	this.instance.setTransform(485,125,1.131,1.131,0,0,0,485,125);

	var maskedShapeInstanceList = [this.instance];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance).to({scaleX:1,scaleY:1},47,cjs.Ease.get(1)).wait(1300));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(308.6,49.8,350.5,154.8);


(lib.Sembol27kopya = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Katman_5 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	var mask_graphics_0 = new cjs.Graphics().p("EhP2AOoMCftgW0IAABXMiftAW0g");
	var mask_graphics_1 = new cjs.Graphics().p("EhP2AObMCftgW1IAABpMiftAW1g");
	var mask_graphics_2 = new cjs.Graphics().p("EhP2ANyMCftgW0IAACfMiftAW0g");
	var mask_graphics_3 = new cjs.Graphics().p("EhP2AMuMCftgW0IAAD5MiftAW0g");
	var mask_graphics_4 = new cjs.Graphics().p("EhP2ALPMCftgW0IAAF4MiftAWzg");
	var mask_graphics_5 = new cjs.Graphics().p("EhP2AJUMCftgWzIAAIbMiftAWzg");
	var mask_graphics_6 = new cjs.Graphics().p("EhP2AG+MCftgWyIAALiMiftAWyg");
	var mask_graphics_7 = new cjs.Graphics().p("EhP2AENMCftgWxIAAPMMiftAWyg");
	var mask_graphics_8 = new cjs.Graphics().p("EhP2ABrMCftgWwIAATbMiftAWwg");
	var mask_graphics_9 = new cjs.Graphics().p("EhP2gAuMCftgWwIAAYNMiftAWwg");
	var mask_graphics_10 = new cjs.Graphics().p("EhP2gDbMCftgWuIAAdlMiftAWug");
	var mask_graphics_11 = new cjs.Graphics().p("EhP2gGZMCftgWtMAAAAjgMiftAWtg");
	var mask_graphics_12 = new cjs.Graphics().p("EhP2gJqMCftgWrMAAAAqAMiftAWrg");
	var mask_graphics_13 = new cjs.Graphics().p("EhP1gNMMCfrgWqMAAAAxDMifrAWqg");
	var mask_graphics_14 = new cjs.Graphics().p("EhP1gRBMCfrgWoMAAAA4rMifrAWog");
	var mask_graphics_15 = new cjs.Graphics().p("EhP1gVIMCfrgWmMAAABA3MifrAWmg");

	this.timeline.addTween(cjs.Tween.get(mask).to({graphics:mask_graphics_0,x:481.2,y:102.3}).wait(1).to({graphics:mask_graphics_1,x:481.2,y:102.8}).wait(1).to({graphics:mask_graphics_2,x:481.2,y:104.1}).wait(1).to({graphics:mask_graphics_3,x:481.2,y:106.3}).wait(1).to({graphics:mask_graphics_4,x:481.2,y:109.4}).wait(1).to({graphics:mask_graphics_5,x:481.2,y:113.5}).wait(1).to({graphics:mask_graphics_6,x:481.2,y:118.4}).wait(1).to({graphics:mask_graphics_7,x:481.2,y:124.2}).wait(1).to({graphics:mask_graphics_8,x:481.2,y:126.7}).wait(1).to({graphics:mask_graphics_9,x:481.2,y:126.5}).wait(1).to({graphics:mask_graphics_10,x:481.2,y:126.4}).wait(1).to({graphics:mask_graphics_11,x:481.2,y:126.2}).wait(1).to({graphics:mask_graphics_12,x:481.2,y:126}).wait(1).to({graphics:mask_graphics_13,x:481.2,y:125.8}).wait(1).to({graphics:mask_graphics_14,x:481.2,y:125.6}).wait(1).to({graphics:mask_graphics_15,x:481.3,y:125.3}).wait(1332));

	// Katman_1
	this.instance = new lib.Sembol14kopya();
	this.instance.parent = this;
	this.instance.setTransform(485,125,1.131,1.131,0,0,0,485,125);

	var maskedShapeInstanceList = [this.instance];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance).to({scaleX:1,scaleY:1},71).wait(1276));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(310.9,49.8,344.9,154.8);


(lib.Sembol8kopya2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Katman_1
	this.instance = new lib.Sembol13kopya2();
	this.instance.parent = this;
	this.instance.setTransform(251.4,29.5,1.563,1.563,0,0,0,258.6,29.4);
	this.instance.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance).to({regY:29.6,scaleX:1,scaleY:1,x:258.6,y:29.6,alpha:1},40).to({alpha:0},5).wait(9));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(87.7,-16.4,327.5,117.1);


(lib.Sembol8kopya = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Katman_1
	this.instance = new lib.Sembol13();
	this.instance.parent = this;
	this.instance.setTransform(251.4,29.5,1.563,1.563,0,0,0,258.6,29.4);
	this.instance.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance).to({regY:29.6,scaleX:1,scaleY:1,x:258.6,y:29.6,alpha:1},34).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(11,-16.4,480.9,182.6);


(lib.Sembol6 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Katman_1
	this.instance = new lib.Sembol5();
	this.instance.parent = this;
	this.instance.setTransform(256.4,145.5,1,1,0,0,0,256.4,145.5);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({_off:false},0).to({_off:true},1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-0.8,0,513.6,291.1);


(lib.Symbol20 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Sembol7("single",3);
	this.instance.parent = this;
	this.instance.setTransform(207.1,25,1,1,0,0,0,156.8,61.3);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib.Symbol20, new cjs.Rectangle(50.3,-36.3,456.1,123.2), null);


(lib.Symbol11 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Symbol20();
	this.instance.parent = this;
	this.instance.setTransform(211.8,41.8,1,1,0,0,0,211.8,41.8);
	this.instance.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance).to({alpha:1},9).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(50.3,-36.3,456.1,123.2);


(lib.Sembol30 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Katman_3 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("AweDKIAAmTMAg9AAAIAAGTg");
	mask.setTransform(124.3,18.5);

	// Sembol 29
	this.instance = new lib.Sembol29();
	this.instance.parent = this;
	this.instance.setTransform(-88.3,17.2,1,1,0,0,0,68.3,17.2);

	var maskedShapeInstanceList = [this.instance];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance).to({x:85.2},15).wait(39));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(18.9,0,17.5,26.4);


(lib.Sembol27kopya_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Katman_5 (mask)
	var mask_1 = new cjs.Shape();
	mask_1._off = true;
	var mask_1_graphics_0 = new cjs.Graphics().p("EhP2AOoMCftgW0IAABXMiftAW0g");
	var mask_1_graphics_1 = new cjs.Graphics().p("EhP2AOZMCftgW1IAABsMiftAW0g");
	var mask_1_graphics_2 = new cjs.Graphics().p("EhP2ANqMCftgW0IAACpMiftAW1g");
	var mask_1_graphics_3 = new cjs.Graphics().p("EhP2AMcMCftgW0IAAERMiftAW0g");
	var mask_1_graphics_4 = new cjs.Graphics().p("EhP2AKuMCftgWzIAAGjMiftAWzg");
	var mask_1_graphics_5 = new cjs.Graphics().p("EhP2AIiMCftgWzIAAJeMiftAWyg");
	var mask_1_graphics_6 = new cjs.Graphics().p("EhP2AF2MCftgWyIAANCMiftAWxg");
	var mask_1_graphics_7 = new cjs.Graphics().p("EhP2ACxMCftgWwIAARPMiftAWwg");
	var mask_1_graphics_8 = new cjs.Graphics().p("EhP2AAVMCftgWvIAAWGMiftAWvg");
	var mask_1_graphics_9 = new cjs.Graphics().p("EhP2gCbMCftgWvIAAbmMiftAWvg");
	var mask_1_graphics_10 = new cjs.Graphics().p("EhP2gFhMCftgWtMAAAAhwMiftAWtg");
	var mask_1_graphics_11 = new cjs.Graphics().p("EhP2gI7MCftgWsMAAAAojMiftAWsg");
	var mask_1_graphics_12 = new cjs.Graphics().p("EhP1gMrMCfrgWqMAAAAwBMifrAWqg");
	var mask_1_graphics_13 = new cjs.Graphics().p("EhP1gQvMCfrgWoMAAAA4HMifrAWog");
	var mask_1_graphics_14 = new cjs.Graphics().p("EhP1gVIMCfrgWmMAAABA3MifrAWmg");

	this.timeline.addTween(cjs.Tween.get(mask_1).to({graphics:mask_1_graphics_0,x:481.2,y:102.3}).wait(1).to({graphics:mask_1_graphics_1,x:481.2,y:102.8}).wait(1).to({graphics:mask_1_graphics_2,x:481.2,y:104.4}).wait(1).to({graphics:mask_1_graphics_3,x:481.2,y:106.9}).wait(1).to({graphics:mask_1_graphics_4,x:481.2,y:110.5}).wait(1).to({graphics:mask_1_graphics_5,x:481.2,y:115.1}).wait(1).to({graphics:mask_1_graphics_6,x:481.2,y:120.7}).wait(1).to({graphics:mask_1_graphics_7,x:481.2,y:126.7}).wait(1).to({graphics:mask_1_graphics_8,x:481.2,y:126.6}).wait(1).to({graphics:mask_1_graphics_9,x:481.2,y:126.4}).wait(1).to({graphics:mask_1_graphics_10,x:481.2,y:126.3}).wait(1).to({graphics:mask_1_graphics_11,x:481.2,y:126.1}).wait(1).to({graphics:mask_1_graphics_12,x:481.2,y:125.8}).wait(1).to({graphics:mask_1_graphics_13,x:481.2,y:125.6}).wait(1).to({graphics:mask_1_graphics_14,x:481.3,y:125.3}).wait(1333));

	// Katman_1
	this.instance_1 = new lib.Sembol14();
	this.instance_1.parent = this;
	this.instance_1.setTransform(485,125,1.131,1.131,0,0,0,485,125);

	var maskedShapeInstanceList = [this.instance_1];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_1;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({scaleX:1,scaleY:1},72).wait(1275));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(321.1,49.8,323.2,154.8);


(lib.Sembol27 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Katman_5 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("EhP1gVIMCfrgWmMAAABA3MifrAWmg");
	mask.setTransform(481.3,125.3);

	// Katman_1
	this.instance = new lib.Sembol28();
	this.instance.parent = this;
	this.instance.setTransform(208.3,205.3,1.113,1.113,0,0,0,240,200);

	var maskedShapeInstanceList = [this.instance];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance).to({scaleX:1,scaleY:1,x:240,y:200},64).wait(1283));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(309.6,-25.1,338.9,290.5);


(lib.Sembol23kopya = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Katman_1
	this.instance = new lib.Sembol17kopya();
	this.instance.parent = this;
	this.instance.setTransform(28.2,16.1,1,1,0,0,0,28.2,16.1);
	this.instance.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance).to({alpha:1},11).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,56.4,32.4);


(lib.Sembol23 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Katman_1
	this.instance = new lib.Sembol17();
	this.instance.parent = this;
	this.instance.setTransform(28.2,16.1,1,1,0,0,0,28.2,16.1);
	this.instance.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance).to({alpha:1},11).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,56.4,32.4);


(lib.Sembol15 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Katman_1
	this.instance = new lib.Sembol16();
	this.instance.parent = this;
	this.instance.setTransform(34,34,1,1,0,0,0,34,34);
	this.instance.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance).to({alpha:1},19).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,68,68);


(lib.Sembol1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Katman_1
	this.instance = new lib.Sembol15("synched",0,false);
	this.instance.parent = this;
	this.instance.setTransform(112.5,52.6,3.3,1.539,0,0,0,34.1,34.2);
	this.instance.alpha = 0.93;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(40).to({startPosition:19},0).to({alpha:0},4).wait(46));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,224.4,104.7);


(lib.Symbol33 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Symbol32("single",0);
	this.instance.parent = this;
	this.instance.setTransform(-13.4,11.7,1,1,0,0,0,45.6,11.7);
	this.instance.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance).to({x:47.3,alpha:1},8).to({x:45.6},6).to({mode:"synched"},1).wait(197));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-59,0,91.2,23.4);


(lib.Sembol27kopya3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Katman_5 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	var mask_graphics_0 = new cjs.Graphics().p("EhP2AOoMCftgW0IAABXMiftAW0g");
	var mask_graphics_1 = new cjs.Graphics().p("EhP2AMHMCftgW0IAAEtMiftAW0g");
	var mask_graphics_2 = new cjs.Graphics().p("EhP2AJmMCftgWzIAAIDMiftAWzg");
	var mask_graphics_3 = new cjs.Graphics().p("EhP2AHFMCftgWyIAALYMiftAWyg");
	var mask_graphics_4 = new cjs.Graphics().p("EhP2AEkMCftgWyIAAOvMiftAWxg");
	var mask_graphics_5 = new cjs.Graphics().p("EhP2ACWMCftgWwIAASFMiftAWwg");
	var mask_graphics_6 = new cjs.Graphics().p("EhP2AArMCftgWwIAAVbMiftAWwg");
	var mask_graphics_7 = new cjs.Graphics().p("EhP2gA/MCftgWwIAAYvMiftAWwg");
	var mask_graphics_8 = new cjs.Graphics().p("EhP2gCrMCftgWvIAAcGMiftAWvg");
	var mask_graphics_9 = new cjs.Graphics().p("EhP2gEWMCftgWuIAAfbMiftAWug");
	var mask_graphics_10 = new cjs.Graphics().p("EhP2gGCMCftgWtMAAAAiyMiftAWtg");
	var mask_graphics_11 = new cjs.Graphics().p("EhP2gHtMCftgWsMAAAAmHMiftAWsg");
	var mask_graphics_12 = new cjs.Graphics().p("EhP2gJZMCftgWrMAAAApeMiftAWrg");
	var mask_graphics_13 = new cjs.Graphics().p("EhP2gLEMCftgWrMAAAAs0MiftAWrg");
	var mask_graphics_14 = new cjs.Graphics().p("EhP1gMvMCfrgWqMAAAAwJMifrAWqg");
	var mask_graphics_15 = new cjs.Graphics().p("EhP1gObMCfrgWpMAAAAzgMifrAWpg");
	var mask_graphics_16 = new cjs.Graphics().p("EhP1gQGMCfrgWoMAAAA21MifrAWog");
	var mask_graphics_17 = new cjs.Graphics().p("EhP1gRyMCfrgWnMAAAA6MMifrAWng");
	var mask_graphics_18 = new cjs.Graphics().p("EhP1gTdMCfrgWmMAAAA9hMifrAWmg");
	var mask_graphics_19 = new cjs.Graphics().p("EhP1gVIMCfrgWmMAAABA3MifrAWmg");

	this.timeline.addTween(cjs.Tween.get(mask).to({graphics:mask_graphics_0,x:481.2,y:102.3}).wait(1).to({graphics:mask_graphics_1,x:481.2,y:107.6}).wait(1).to({graphics:mask_graphics_2,x:481.2,y:112.9}).wait(1).to({graphics:mask_graphics_3,x:481.2,y:118.1}).wait(1).to({graphics:mask_graphics_4,x:481.2,y:123.4}).wait(1).to({graphics:mask_graphics_5,x:481.2,y:126.7}).wait(1).to({graphics:mask_graphics_6,x:481.2,y:126.6}).wait(1).to({graphics:mask_graphics_7,x:481.2,y:126.5}).wait(1).to({graphics:mask_graphics_8,x:481.2,y:126.4}).wait(1).to({graphics:mask_graphics_9,x:481.2,y:126.3}).wait(1).to({graphics:mask_graphics_10,x:481.2,y:126.2}).wait(1).to({graphics:mask_graphics_11,x:481.2,y:126.1}).wait(1).to({graphics:mask_graphics_12,x:481.2,y:126}).wait(1).to({graphics:mask_graphics_13,x:481.2,y:125.9}).wait(1).to({graphics:mask_graphics_14,x:481.2,y:125.8}).wait(1).to({graphics:mask_graphics_15,x:481.2,y:125.7}).wait(1).to({graphics:mask_graphics_16,x:481.2,y:125.6}).wait(1).to({graphics:mask_graphics_17,x:481.2,y:125.5}).wait(1).to({graphics:mask_graphics_18,x:481.2,y:125.4}).wait(1).to({graphics:mask_graphics_19,x:481.3,y:125.3}).wait(1328));

	// Katman_1
	this.instance = new lib.Sembol6("single",1);
	this.instance.parent = this;
	this.instance.setTransform(485,125,1.891,0.859,0,0,0,256.4,145.5);

	var maskedShapeInstanceList = [this.instance];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1347));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,49.8,970,154.8);


// stage content:
(lib.index = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		stage.sayac = 0;
	}
	this.frame_270 = function() {
		stage.sayac++;
		if(stage.sayac==2)
		{
			this.stop();
		}
	}
	this.frame_294 = function() {
		this.gotoAndPlay(1);
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(270).call(this.frame_270).wait(24).call(this.frame_294).wait(1));

	// logo
	this.instance = new lib.Sembol23kopya("synched",0,false);
	this.instance.parent = this;
	this.instance.setTransform(260.3,222.8,1.038,1.038,0,0,0,28.3,16.3);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(153).to({_off:false},0).wait(142));

	// logo
	this.instance_1 = new lib.Sembol23("synched",0,false);
	this.instance_1.parent = this;
	this.instance_1.setTransform(260.3,222.8,1.038,1.038,0,0,0,28.3,16.3);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(10).to({_off:false},0).wait(285));

	// harvestfresh logo
	this.instance_2 = new lib.Sembol30("synched",0,false);
	this.instance_2.parent = this;
	this.instance_2.setTransform(47.3,64.9,0.611,0.611,0,0,0,76.9,17.5);

	this.instance_3 = new lib.Symbol11("synched",0,false);
	this.instance_3.parent = this;
	this.instance_3.setTransform(66.2,36.4,0.333,0.333,0,0,0,212.4,42.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_3},{t:this.instance_2}]},166).wait(129));

	// btn
	this.instance_4 = new lib.Symbol33("synched",0,false);
	this.instance_4.parent = this;
	this.instance_4.setTransform(67,224.4,1.227,1.227,0,0,0,45.8,12.1);
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(176).to({_off:false},0).wait(119));

	// product
	this.instance_5 = new lib.Sembol34("synched",0,false);
	this.instance_5.parent = this;
	this.instance_5.setTransform(211.3,148.2,0.39,0.39,0,0,0,163.3,240.3);
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(145).to({_off:false},0).wait(150));

	// path
	this.instance_6 = new lib.Sembol64("synched",0,false);
	this.instance_6.parent = this;
	this.instance_6.setTransform(157.9,29.1,0.8,0.8,0,0,0,370.6,212.7);
	this.instance_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(166).to({_off:false},0).wait(129));

	// bg
	this.instance_7 = new lib.Sembol27kopya3("synched",0,false);
	this.instance_7.parent = this;
	this.instance_7.setTransform(74.3,200,0.309,1,0,0,0,240.1,200);
	this.instance_7._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(143).to({_off:false},0).wait(152));

	// text
	this.instance_8 = new lib.Sembol8kopya2("synched",0,false);
	this.instance_8.parent = this;
	this.instance_8.setTransform(158,116.6,0.898,0.898,0,0,0,258.6,29.6);

	this.instance_9 = new lib.Sembol1("synched",0,false);
	this.instance_9.parent = this;
	this.instance_9.setTransform(157.5,136,1,1,0,0,0,112.2,52.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_9},{t:this.instance_8}]},75).wait(220));

	// image4
	this.instance_10 = new lib.Sembol27kopya2("synched",0,false);
	this.instance_10.parent = this;
	this.instance_10.setTransform(-93,200,1,1,0,0,0,240,200);
	this.instance_10._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(100).to({_off:false},0).wait(195));

	// image3
	this.instance_11 = new lib.Sembol27kopya("synched",0,false);
	this.instance_11.parent = this;
	this.instance_11.setTransform(-93,200,1,1,0,0,0,240,200);
	this.instance_11._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(64).to({_off:false},0).wait(231));

	// text
	this.instance_12 = new lib.Sembol8kopya("synched",0,false);
	this.instance_12.parent = this;
	this.instance_12.setTransform(149.6,113.9,0.782,0.782,0,0,0,258.6,29.6);

	this.instance_13 = new lib.Sembol15("synched",0,false);
	this.instance_13.parent = this;
	this.instance_13.setTransform(148.5,131.1,3.781,1.187,0,0,0,34.1,34);
	this.instance_13.alpha = 0.398;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_13},{t:this.instance_12}]},29).wait(266));

	// image2
	this.instance_14 = new lib.Sembol27kopya_1("synched",0,false);
	this.instance_14.parent = this;
	this.instance_14.setTransform(-93,200,1,1,0,0,0,240,200);
	this.instance_14._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(18).to({_off:false},0).wait(277));

	// image1
	this.instance_15 = new lib.Sembol27("synched",0,false);
	this.instance_15.parent = this;
	this.instance_15.setTransform(-93,200,1,1,0,0,0,240,200);

	this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(295));

	// bg
	this.instance_16 = new lib.Sembol6("single",1);
	this.instance_16.parent = this;
	this.instance_16.setTransform(150,125,0.585,0.859,0,0,0,256.3,145.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_16).wait(295));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(126.6,100,338.9,290.5);
// library properties:
lib.properties = {
	width: 300,
	height: 250,
	fps: 24,
	color: "#FFFFFF",
	opacity: 1.00,
	webfonts: {},
	manifest: [
		{src:"Bitmap2.png", id:"Bitmap2"},
		{src:"image1.jpg", id:"image1"},
		{src:"image2.jpg", id:"image2"},
		{src:"image3.jpg", id:"image3"},
		{src:"image4.jpg", id:"image4"},
		{src:"product_pack1.png", id:"product_pack1"}
	],
	preloads: []
};




})(lib = lib||{}, images = images||{}, createjs = createjs||{}, ss = ss||{}, AdobeAn = AdobeAn||{});
var lib, images, createjs, ss, AdobeAn;