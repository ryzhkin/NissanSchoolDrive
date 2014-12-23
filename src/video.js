var Video = cc.Layer.extend({
	ctor: function () {
		this._super();
		var winsize = cc.winSize;
		var centerpos = cc.p(winsize.width / 2, winsize.height / 2);

		var spritebg = new cc.Sprite(assets.videoBack);
		spritebg.setPosition(centerpos);
		this.addChild(spritebg);
	},
	menuVideo: {
	  areas: [
	    {
	    	x: 606,
	    	y: 288 - 190,
	    	h: 190,
	    	w: 190,
	    	click: function () {
	    		app.menu = new Menu();	
	    		app.runStage(app.menu, 1);
	    	} 	
	    }      
	    ]	
	},
	TOUCH_MOVED: false,
	touchEvent: function (sender, type) {
	  switch (type) {
		case ccui.Widget.TOUCH_BEGAN: {
			this.TOUCH_MOVED = false;
			//cc.log("Touch BEGAN " + this.TOUCH_MOVED);
			/*if (typeof(sender.videoURL) == 'string') {
			  setTimeout(function () {
				  cc.log("Touch BEGAN " + this.TOUCH_MOVED);
				  if (this.TOUCH_MOVED == false) {
					cc.log('play video > ' + sender.videoURL);  
					app.playVideo(sender.videoURL);  
				  }
			  }.bind(this), 500);	
		    }*/	
			break;
		}

		case ccui.Widget.TOUCH_MOVED:
			this.TOUCH_MOVED = true;
			//cc.log("Touch Move");
			break;

		case ccui.Widget.TOUCH_ENDED:
			cc.log("Touch Up");
			if (typeof(sender.videoURL) == 'string') {
			  cc.log('play video > ' + sender.videoURL);  
			  app.playVideo(sender.videoURL);  
		    }
			break;

		case ccui.Widget.TOUCH_CANCELED:
			//cc.log("Touch Cancelled");
			break;

		default:
			break;
	  }
	},
	init: function (options) {
	   app.renderMenu(this, this.menuVideo, true);
	   
	   // Create the scrollview
	   var scrollView = new ccui.ScrollView();
	   scrollView.setDirection(ccui.ScrollView.DIR_HORIZONTAL);
	   scrollView.setTouchEnabled(true);
	   scrollView.setContentSize(cc.size(3072, 838));
	   scrollView.setInnerContainerSize(cc.size(3072, 838));
	   scrollView.x = 0;
	   scrollView.y = 292;
	   this.addChild(scrollView);

	   
	   cc.loader.loadJson("res/data/lessons.json", function(error, data) {
		   var videos = [];
		   for (var i = 0; i < data.length; i++) {
			  if (data[i].category == options) {
				  videos.push(data[i]);  
			  } 
		   }	   
		   
		   var currentX = 0;
		   for (var i = 0; i < videos.length; i++) {
			   var imageView = new ccui.ImageView();
			   
			   imageView.videoURL = videos[i].file; 
			   imageView.loadTexture("res/video/video-splash.jpg");
			   imageView.setPositionY(imageView.getContentSize().height/2 + 104);
			   imageView.setPositionX(imageView.getContentSize().width/2 + currentX);


			   scrollView.addChild(imageView);

			   //imageView.setTouchEnabled(true);
			   //imageView.addTouchEventListener(this.touchEvent, this);

			   
			   var playImg = new ccui.ImageView();
			   playImg.videoURL = videos[i].file; 
			   playImg.loadTexture("res/video/video-start.png");
			   playImg.setPositionY(imageView.getContentSize().height/2);
			   playImg.setPositionX(imageView.getContentSize().width/2);
			   imageView.addChild(playImg);
			   playImg.setTouchEnabled(true);
			   playImg.addTouchEventListener(this.touchEvent, this);
			   
			   
			   /*
			   var text = new ccui.Text();
			   text.attr({
				   textAlign: cc.TEXT_ALIGNMENT_CENTER,
				   string: videos[i].title,
				   fontName: "Helvetica",
				   fontSize: 40,
				   x: imageView.getContentSize().width/2 + currentX,
				   y:  72
			   });
			   text.setColor(cc.color(197, 23, 51, 255));
			   scrollView.addChild(text);
			   //*/
			   
			   var text = new cc.LabelTTF(
			      videos[i].title,
			      'res/fonts/nissanagmed.ttf',
			      33
			   );
			   text.setPosition(imageView.getContentSize().width/2 + currentX, 72);
			   text.setColor(cc.color(197, 23, 51, 255));
			   scrollView.addChild(text);

			   currentX += imageView.getContentSize().width + 48;
			   scrollView.setInnerContainerSize(cc.size(currentX, 838));	   
			   
			  
		   }
		   scrollView.setInnerContainerSize(cc.size((imageView.getContentSize().width + 48)*i + imageView.getContentSize().width/3, 838));
		   
	   }.bind(this));

	}
});