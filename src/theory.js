var Theory = cc.Layer.extend({
	ctor: function () {
		this._super();
	},
	menuTheory: {
		back  : assets.theoryAcceleratorBack,
		areas : [
		         {
		        	 x: 3072/2 -953,
		        	 y: 1536 - 410 - 270,
		        	 w: 270,
		        	 h: 270,
		        	 click: function () {
		        		 app.menu = new Menu();	
		        		 app.runStage(app.menu, 2);
		        	 } 
		         },
		         {
		        	 x: 3072/2 -953,
		        	 y: 1536 - 750 - 270,
		        	 w: 270,
		        	 h: 270,
		        	 click: function () {
		        		 if (typeof(app.theory.onBack) == 'function') {
		        			 app.theory.onBack();
		        		 }
		        	 } 
		         },
		         {
		        	 x: 3072/2 + 856,
		        	 y: 1536 - 1406 - 114,
		        	 w: 108,
		        	 h: 114,
		        	 click: function () {
		        		 cc.log('up');
		        		 //app.accelerator.scrollView.jumpToTop();
		        		 app.theory.scrollView.scrollToTop(2, true);
		        		 app.theory.scroll.setPositionY(1150);
		        	 } 
		         }
		         ]
	},
	touchEvent: function (sender, type) {
		switch (type) {
		case ccui.Widget.TOUCH_BEGAN: {
			break;
		}
		case ccui.Widget.TOUCH_MOVED:
			//cc.log("Touch Move " + this.scrollView.getInnerContainerSize().h);
			//cc.log(this.scrollView.getInnerContainer().getPositionY());
			//cc.log(this.scrollView.getInnerContainerSize().height);

			var p = 100 - Math.round((Math.abs(this.scrollView.getInnerContainer().getPositionY())/this.scrollView.getInnerContainerSize().height)*100);
			//cc.log(p + ' %');
			this.scroll.setPositionY(1150 - 920*(p/100));
			break;
		case ccui.Widget.TOUCH_ENDED:
			//cc.log("Touch Up");
			break;
		case ccui.Widget.TOUCH_CANCELED:
			//cc.log("Touch Cancelled");
			break;
		default:
			break;
		}
	},
	init: function (options) {
	  app.theory = this;
	  if (typeof(options.back) !== 'undefined') {
		this.menuTheory.back = options.back; 
	  }	
	  this.onBack = options.onBack;
	  app.renderMenu(this, this.menuTheory, true);
	  // Create the scrollview
	  var maxH = 10000;
	  var scrollView = new ccui.ScrollView();
	  scrollView.setDirection(ccui.ScrollView.DIR_VERTICAL);
	  scrollView.setTouchEnabled(true);
	  scrollView.setContentSize(cc.size(1456, 1044));
	  scrollView.setInnerContainerSize(cc.size(1456, maxH));
	  scrollView.x = 932;
	  scrollView.y = 134;
	  this.addChild(scrollView);

	  var scroll = new ccui.ImageView();
	  scroll.loadTexture("res/theory/scroll.jpg");
	  scroll.setPositionX(2270);
	  scroll.setPositionY(1150);
	  this.addChild(scroll);
	  this.scroll = scroll;


	  scrollView.addTouchEventListener(this.touchEvent, this);

	  var panel = new ccui.Layout();
	  panel.x = 0;
	  panel.y = 0;
	  scrollView.addChild(panel);


	  //var currentY = 1044;
	  //var currentY = 0;
	  var currentY = maxH;
	  cc.loader.loadTxt(
			  (typeof(options.url) !== 'undefined')?options.url:'res/data/theory_accelerator.html', 
			  function (error, data) {
				  var txt = '';
				  var prevTag = '';
				  var liCounter = 1;
				  HTMLParser(data, {
					  start: function( tag, attrs, unary ) {
					  },
					  end: function(tag) {
						  txt = txt.replace(/<\/?[^>]+>/gi, '').trim(); 		
						  var txtH = 50;
						  var buttomPadding = 0;
						  var leftPadding = 0;
						  var topPadding = 0;
						  var fontName = 'res/fonts/nissanagmed.ttf';

						  switch (tag) {
						  case 'h1': {
							  txt  = txt.toUpperCase();
							  txtH = 40;
							  buttomPadding = 10;
							  topPadding = 40;
							  break;	
						  }
						  case 'h2': {
							  txtH = 35;
							  buttomPadding = 0;
							  topPadding = 40;
							  break;	
						  }
						  case 'li': {
							  fontName = 'res/fonts/nissanaglig.ttf';
							  txtH = 35;
							  buttomPadding = 5;
							  leftPadding   = 50;
							  if (prevTag == 'li') {
								  liCounter++;
							  } else {
								  liCounter = 1;	
							  } 	
							  txt = liCounter + '. ' + txt;
							  break;	
						  }
						  case 'p': {
							  fontName = 'res/fonts/nissanaglig.ttf';
							  txtH = 35;
							  buttomPadding = 5;
							  break;	
						  }
						  case 'ol': {
							  //currentY = currentY - 10;	
							  break;	
						  }	
						  default: {
							  txt = '';	
							  break;	
						  }
						  }
						  // Text render
						  if (txt !== '') {

							  var line = new cc.LabelTTF(
									  txt,
									  fontName,
									  txtH
							  );
							  line.setPosition(leftPadding, currentY - topPadding);
							  //*/
							  /* 
	    	    	var line = new ccui.Text();
	    	    	line.attr({
	    	    		  textAlign : cc.TEXT_ALIGNMENT_LEFT,
	    	    		  string    : txt,
	    	    		  fontName  : fontName,
	    	    		  fontSize  : 30,
	    	    		  x         : leftPadding,
	    	    		  y         : currentY - topPadding
	    	    	});//*/
							  line.setAnchorPoint(0, 1);
							  line.setColor(cc.color(0, 0, 0, 255));
							  //scrollView.addChild(line);  
							  panel.addChild(line);
							  currentY = currentY - (txtH*(txt.split("\n").length + 1) + buttomPadding + topPadding);  
							  //scrollView.setInnerContainerSize(cc.size(1456, currentY));	
						  }
						  txt = '';
						  prevTag = tag;
					  },
					  chars: function( text ) {
						  txt += text;
					  },
					  comment: function( text ) {
					  }
				  }); 
				  panel.setPosition(0,  - currentY);
				  scrollView.setInnerContainerSize(cc.size(1456, (maxH - currentY)));
				  this.scrollView = scrollView;
			  }.bind(this)
	  );//*/

	  
	  
	  
	}
});