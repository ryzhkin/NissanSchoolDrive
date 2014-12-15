var Loader = cc.Layer.extend({
	ctor: function () {
  	  this._super();
	  cc.log("Create loader +");
	},
	/*onEnter: function () {
  	  this._super();
  	  this.run(this.options);
  	  cc.log("onEnter loader +");
	},*/
	loadedCount : 0,
	count       : 0,
	percent     : 0,
	resources   : [],
	loadRes: function (img, onSuccess) {
		cc.loader.loadImg(
		 img, 
	     {},
	     function () {
	       this.loadedCount++;
	       this.percent     = (this.loadedCount / this.count * 100) | 0;
	       this.percent     = Math.min(this.percent, 100);     
	       cc.log("Loading... " + this.percent + "%");
	       this.spriteProgress.setTextureRect(cc.rect(0, 0, 1091*this.percent/100, 10));
	       if (this.loadedCount < this.count) {
	    	 setTimeout(function () { 
	    	   this.loadRes(this.resources[this.loadedCount], onSuccess);
	    	 }.bind(this), 10);  
	       } else {
	    	 if (typeof(onSuccess) == 'function') {
	    	   onSuccess(); 
	    	 }  
	       }
	     }.bind(this)
	  );
	},
	loadResources: function (resources, onSuccess) {
	  this.loadedCount = 0;
	  this.resources   = resources;
	  this.count       = this.resources.length;
	  this.loadRes(this.resources[this.loadedCount], onSuccess);
	},
	
	loadResFake: function (img, onSuccess) {
					this.loadedCount++;
					this.percent     = (this.loadedCount / this.count * 100) | 0;
					this.percent     = Math.min(this.percent, 100);     
					cc.log("Loading... " + this.percent + "%");
					this.spriteProgress.setTextureRect(cc.rect(0, 0, 1091*this.percent/100, 10));
					if (this.loadedCount < this.count) {
						setTimeout(function () { 
							this.loadResFake(this.resources[this.loadedCount], onSuccess);
						}.bind(this), 10);  
					} else {
						if (typeof(onSuccess) == 'function') {
							onSuccess(); 
						}  
					}
	},
	loadResourcesFake: function (resources, onSuccess) {
		this.loadedCount = 0;
		this.resources   = resources;
		this.count       = this.resources.length;
		this.loadResFake(this.resources[this.loadedCount], onSuccess);
	},
	init: function (options) {
		/*
		cc.loader.load([
		  'res/loader/loader-background.jpg',
		  'res/loader/loader-progress.png'
		 ], 
	     function (result, count, loadedCount) {
		 }, 
		 function () {
		  var winsize = cc.winSize;
		  var centerpos = cc.p(winsize.width / 2, winsize.height / 2);	 

		  var spritebg = new cc.Sprite('res/loader/loader-background.jpg');
		  spritebg.setPosition(centerpos);
		  this.addChild(spritebg);

		  this.spriteProgress = new cc.Sprite('res/loader/loader-progress.png');
		  this.spriteProgress.attr({
			  x: (winsize.width / 2) - 562,
			  y: 1536 - 1460,
			  anchorX: 0,
			  anchorY: 0
		  });

		  this.spriteProgress.setTextureRect(cc.rect(0, 0, 0, 10));
		  this.addChild(this.spriteProgress);
		  
		  setTimeout(function () {
			  this.loadResources(options.assets, options.onSuccess);	  
		  }.bind(this), 1000); 
		 }.bind(this)
	   );//*/
		
	   // Fake loader
		var winsize = cc.winSize;
		var centerpos = cc.p(winsize.width / 2, winsize.height / 2);	 

		var spritebg = new cc.Sprite('res/loader/loader-background.jpg');
		spritebg.setPosition(centerpos);
		this.addChild(spritebg);

		this.spriteProgress = new cc.Sprite('res/loader/loader-progress.png');
		this.spriteProgress.attr({
			x: (winsize.width / 2) - 562,
			y: 1536 - 1460,
			anchorX: 0,
			anchorY: 0
		});

		this.spriteProgress.setTextureRect(cc.rect(0, 0, 0, 10));
		this.addChild(this.spriteProgress);
		setTimeout(function () {
			this.loadResourcesFake(options.assets, options.onSuccess);	  
		}.bind(this), 500); 
		
	}
});