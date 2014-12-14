// Main game stage
var GameScene = cc.Scene.extend({
	stage: null,
	ctor: function () {
 	  this._super();
	  this.stage = new cc.Layer();  
	  this.addChild(this.stage, 1);
	},
	onEnter: function () {
		this._super();
	}

});


var app = {
		game: null,		
		// Init Application
		init: function () {
	 this.game = new GameScene();
	 cc.director.runScene(this.game);
	 
	 this.winsize = cc.winSize;
	 this.center  = cc.p(this.winsize.width / 2, this.winsize.height / 2);
	 
	 
	 this.loader = new Loader();
	 
	 this.runStage(this.loader, {
	   assets: g_assets,
	   onSuccess: function () {
		 cc.log('Success loaded ...');
		 this.menu = new Menu();
		 this.runStage(this.menu);			
	   }.bind(this) 
	 });
	 
	
  },
  // Clear stage
  clearStage: function () {
	  clearAllIntervals();
	  this.game.stage.removeAllChildren(true);  
  },
  // Run stage
  runStage: function (stage, options) {
	if (typeof(stage) !== 'undefined') {  
      this.clearStage();
      this.game.stage.addChild(stage, 10);
      if (typeof(stage.init) == 'function') {
    	stage.init(options);  
      }  
	}
  },
  
  //Calc local game X coordinate 
  localX: function (x) {
	  var xOffset = (-3072 + cc.view.getDesignResolutionSize().width)/2;
	x = xOffset + x;
	return x;
  },
  //Calc local game Y coordinate
  localY: function (y) {
    return y;
  },
  // Render Menu
  renderMenu: function (layer, menu, debug) {
	  //debug = false;
	  if (typeof(layer.menu) == 'undefined') {
		clearAllIntervals();  
		layer.menu = new cc.Layer();  
		layer.addChild(layer.menu);
	  } else {
		clearAllIntervals();  
		layer.menu.removeAllChildren(true);  
	  }
	  
	  
	  var winsize = cc.winSize;
	  var centerpos = cc.p(winsize.width / 2, winsize.height / 2);
	  if (typeof(menu.back) !== 'undefined') {
	    var bg = new cc.Sprite(menu.back);
	    if ((typeof(menu.x) !== 'undefined') && (typeof(menu.y) !== 'undefined')) {
	    	bg.attr({
	    		x: menu.x,
	    		y: menu.y,
	    		anchorX: 0,
	    		anchorY: 1
	    	});
	    } else {
	      bg.setPosition(centerpos);	
	    }	
	    layer.menu.addChild(bg);
	    
	  }
	  if (typeof(menu.areas) !== 'undefined') {
		  cc.eventManager.removeListeners(cc.EventListener.TOUCH_ONE_BY_ONE);
		  menu.areas.forEach(function (area) {
			  
  	      var clickArea = new cc.DrawNode();
  	      layer.menu.addChild(clickArea);
  	      
  	      clickArea.attr({
	        x: this.localX(area.x),
  	    	y: this.localY(area.y),
  	    	height  : area.h,
  	    	width   : area.w
  	      });
  	      
  	      
  	      clickArea.drawRect(
  	    	cc.p(0, 0), 
  	    	cc.p(area.w, area.h),			
  	    	cc.color(0, 0, 0, 1), 
  	    	1, 
  	    	cc.color(255, 13, 255, (debug == true)?255:1) 
  	      );
    	  
    	  if (typeof(area.click) == 'function') {
    		  /*
    		  cc.eventManager.addListener({
    			  event: cc.EventListener.MOUSE,
    			  onMouseDown: function(event){
    				area.click();
    			  }
    		  }, clickArea);
    		  //*/
    		  
    		  cc.eventManager.addListener({
    			  event: cc.EventListener.TOUCH_ONE_BY_ONE,
    			  // When "swallow touches" is true, then returning 'true' from the onTouchBegan method will "swallow" the touch event, preventing other listeners from using it.
    			  swallowTouches: true,
    			  //onTouchBegan event callback function                      
    			  onTouchBegan: function (touch, event) { 
    				  var target = event.getCurrentTarget();  
    				  var s = target.getContentSize();
    				  var rect = cc.rect(0, 0, s.width, s.height);
    				  
    				  //Get the position of the current point relative to the button
    				  var locationInNode = target.convertToNodeSpace(touch.getLocation());    
    				  //Check the click area
    				  if (cc.rectContainsPoint(rect, locationInNode)) {       
    					  //cc.log("sprite began... x = " + locationInNode.x + ", y = " + locationInNode.y);
    					  area.click();
    					  return true;
    				  }
    				  return false;
    			  }
    		  }, clickArea);
    				  
    	  }
    	  
    	}.bind(this));
	  }	  
  },

  openURL: function (url) {
	if (url !== '') {
      cc.log(url);
      switch (cc.sys.platform) {
      case cc.sys.WINDOWS: {
    	  cc.log("Windows platform");
    	  break;	
      }
      case cc.sys.ANDROID: {
    	  cc.log("ANDROID platform");
    	  jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "openURL", "(Ljava/lang/String;)V", url);
    	  break;	
      }
      case cc.sys.IPAD:
      case cc.sys.IPHONE: {
    	  cc.log("iOS platform");
    	  break;	
      }
      default: {
    	  cc.log("UNKNOW platform"); 	
    	  break; 	
      }
      }	
	}  
  },
  share: function(type, text) {
	 var url   = '';
	 var purl  = 'http://www.nissan.ru';
	 var ptitle = 'Школа вождения Nissan!';
	 var pimg   = 'http://imagizer.imageshack.us/v2/150x100q90/673/3QJVT1.png'; 
	 switch (type) {
	   case 'fb': {
		 url  = 'http://www.facebook.com/sharer.php?s=100';
		 url += '&p[title]='     + encodeURIComponent(ptitle);
		 url += '&p[summary]='   + encodeURIComponent(text);
		 url += '&p[url]='       + encodeURIComponent(purl);
		 url += '&p[images][0]=' + encodeURIComponent(pimg); 
		 break;  
	   }
	   case 'vk': {
		 url  = 'http://vkontakte.ru/share.php?';
		 url += 'url='          + encodeURIComponent(purl);
		 url += '&title='       + encodeURIComponent(ptitle);
		 url += '&description=' + encodeURIComponent(text);
		 url += '&image='       + encodeURIComponent(pimg);
		 url += '&noparse=true';  
 	     break;  
	   }
	   case 'tw': {
		 url  = 'http://twitter.com/share?';
		 url += 'text='      + encodeURIComponent(ptitle);
		 url += '&url='      + encodeURIComponent(purl);
		 url += '&counturl=' + encodeURIComponent(purl);   
		 break;  
	   }
	   case 'od': {
		 url  = 'http://www.odnoklassniki.ru/dk?st.cmd=addShare&st.s=1';
		 url += '&st.comments=' + encodeURIComponent(text);
		 url += '&st._surl='    + encodeURIComponent(purl);  
		 break;  
	   }
	 }
	 this.openURL(url);
  }
}



