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
		        		 if (typeof(app.theory.onPractice) == 'function') {
		        			 app.theory.onPractice();
		        		 }
		        	 } 
		         },
		         {
		        	 x: 3072/2 -953,
		        	 y: 1536 - 1090 - 270,
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
			this.scroll.setPositionY(app.localY(1150 - 920*(p/100)));
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
	  this.onPractice = options.onPractice;
	  app.renderMenu(this, this.menuTheory, true);
	  // Create the scrollview
	  var maxH = 10000;
	  var scrollView = new ccui.ScrollView();
	  scrollView.setDirection(ccui.ScrollView.DIR_VERTICAL);
	  scrollView.setTouchEnabled(true);
	  scrollView.setContentSize(cc.size(1456 + 100, 1044));
	  scrollView.setInnerContainerSize(cc.size(1456 + 100, maxH));
	  scrollView.x = app.localX(932);
	  scrollView.y = app.localY(134);
	  this.addChild(scrollView);

	  var scroll = new ccui.ImageView();
	  scroll.loadTexture("res/theory/scroll.jpg");
	  scroll.setPositionX(app.localX(2270 + 171));
	  scroll.setPositionY(app.localY(1150));
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
							  buttomPadding = 10;
							  topPadding = 10;
							  break;	
						  }
						  case 'li': {
							  fontName = 'res/fonts/nissanaglig.ttf';
							  txtH = 35;
							  buttomPadding = 10;
							  leftPadding   = 0;
							  currentY = currentY - 35;	
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
						  case 'n': {
							  cc.log('Разрыв!');
							  currentY = currentY - 35;	
							  break;	
						  }	
						  default: {
							  txt = '';	
							  break;	
						  }
						  }
						  // Text render
						  if (txt !== '') {
							  
							  
							  txtH = txtH*((app.isTablet())?1:1.5);
							  buttomPadding = buttomPadding*((app.isTablet())?1:1.5);
							  topPadding = topPadding*((app.isTablet())?1:1.5);
							  //*/

							  var testTxt = txt.replace("\n", "").replace(/\s+/g,' ').substring(0, 3);
							  var line = new cc.LabelTTF(
									  testTxt,
									  fontName,
									  txtH
							  );
							  var lineW = line.getContentSize().width;
							  var charW = Math.round(lineW/testTxt.length);
							  var txtL = Math.round(((tag == 'li')?1000:1580)/charW);
							  
							  txt = txt.replace("\n", "").replace(/\s+/g,' ');
							  var lines = help.wordwrap(txt, txtL, '|', false);
							  lines = lines.split("|");
							 /*
							  cc.log('+---------------+');
							  cc.log('L = ' + txt.length);
	 						  cc.log('txtL = ' + txtL);
	 						  //*/
							  for (var i = 0; i < lines.length; i++) {
									//cc.log('> ' + lines[i]); 
									var line = new cc.LabelTTF(
									  lines[i],
									  fontName,
									  txtH
									);
									line.setPosition(leftPadding, currentY - topPadding);
									line.setAnchorPoint(0, 1);
									line.setColor(cc.color(0, 0, 0, 255));
									panel.addChild(line);
									currentY = currentY - (txtH + buttomPadding + topPadding);  
							  }
	
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
				  currentY = currentY - 50;
				  panel.setPosition(0,  - currentY);
				  scrollView.setInnerContainerSize(cc.size(1456, (maxH - currentY)));
				  this.scrollView = scrollView;
			  }.bind(this)
	  );//*/

	  
	  
	  
	}
});