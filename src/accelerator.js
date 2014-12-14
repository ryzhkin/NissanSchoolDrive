var Accelerator = cc.Layer.extend({
	ctor: function () {
		this._super();
	},
	menuIntro: {
		back  : assets.acceleratorIntroBack,
		areas : [
		{
	    	x: 3072/2 -485,
	    	y: 1536 - 1174 - 306,
	    	w: 306,
	    	h: 306,
	    	click: function () {
	    		app.accelerator.game();  
	    	}	
		},
		{
			x: 3072/2 - 135,
			y: 1536 - 1174 - 306,
			w: 306,
			h: 306,
			click: function () {
				app.accelerator.theory();              
			}	
		},
		{
			x: 3072/2 + 215,
			y: 1536 - 1174 - 306,
			w: 306,
			h: 306,
			click: function () {
				app.menu = new Menu();	
				app.runStage(app.menu, 2);
			}	
		}
		]
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
	        		   app.accelerator = new Accelerator();
	        		   app.runStage(app.accelerator);
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
	        		   app.accelerator.scrollView.scrollToTop(2, true);
	        		   app.accelerator.scroll.setPositionY(1150);
	        	   } 
	           }
	           ]
	},
	menuHelp: {
		back: assets.acceleratorHelpBack,
		areas: [
		        {
		        	x: 1536 -953,
		        	y: 1536 - 410 - 270,
		        	w: 270,
		        	h: 270,
		        	click: function () {
		        		app.menu = new Menu();	
		        		app.runStage(app.menu, 2);
		        	}
		        },
		        {
		        	x: 1536 -953,
		        	y: 1536 - 750 - 270,
		        	w: 270,
		        	h: 270,
		        	click: function () {
		        		app.accelerator.game();
		        	}
		        }

		        ]
	},
	menuGame: {
		back: assets.acceleratorGameBack,
		areas:[
		       {
		    	   x     : 1536 - 955,
		    	   y     : 1536 - 420 - 268,
		    	   w     : 268,
		    	   h     : 268,
		    	   click : function () {
		    		   app.accelerator.help();
		    	   }
		       },
		       {
		    	   x     : 1536 - 955,
		    	   y     : 1536 - 760 - 268,
		    	   w     : 268,
		    	   h     : 268,
           click : function () {
        	  app.menu = new Menu();	
 	    	  app.runStage(app.menu, 2);
           }
        },
        {
            x     : 1536 - 955,
            y     : 1536 - 1102 - 268,
            w     : 268,
            h     : 268,
            click : function () {
              app.accelerator = new Accelerator();
	          app.runStage(app.accelerator);
            }
        },
        {
        	x     : 1536 + 614,
        	y     : 1536 - 1016 - 426,
        	w     : 292,
        	h     : 426,
        	click : function () {
        		app.accelerator.updateTah();
        	}
        }
      ]
	},
	menuResult: {
	  back: assets.acceleratorResult,
	  areas: [
	    {
	    	x: 1536 - 953,
	        y: 1536 - 410 - 270,
	        w: 270,
	        h: 270,
	        click: function () {
	          app.menu = new Menu();	
		      app.runStage(app.menu, 2);
	        }
	    },
	    {
	    	x: 1536 - 953,
	        y: 1536 - 750 - 270,
	        w: 270,
	        h: 270,
	        click: function () {
	          app.accelerator.game();
	        }
	    },
	    {
	    	x: 1536 - 260,
	        y: 1536 - 1165 - 99,
	        w: 99,
	        h: 99,
	        click: function () {
	          app.share('fb', 'Я прошел урок "Управление газом" в Школе вождения Nissan!');
	        }
	    },
	    {
	    	x: 1536 - 133,
	        y: 1536 - 1165 - 99,
	        w: 99,
	        h: 99,
	        click: function () {
	          app.share('vk', 'Я прошел урок "Управление газом" в Школе вождения Nissan!');
	        }
	    },
	    {
	    	x: 1536 - 6,
	        y: 1536 - 1165 - 99,
	        w: 99,
	        h: 99,
	        click: function () {
	          app.share('tw', 'Я прошел урок "Управление газом" в Школе вождения Nissan!');
	        }
	    },
	    {
	    	x: 1536 + 121,
	        y: 1536 - 1165 - 99,
	        w: 99,
	        h: 99,
	        click: function () {
	          app.share('od', 'Я прошел урок "Управление газом" в Школе вождения Nissan!');
	        }
	    }
	  ]
	},
	
	init: function () {
	  app.renderMenu(this, this.menuIntro, true);
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
	
	theory: function () {
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
	    'res/data/theory_accelerator.html', 
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
	  
	},
	
	help: function () {
		app.renderMenu(this, this.menuHelp, true);
	},
	
	
	drawSector: function (node, x, y, r, minAngle, maxAngle)  {
	 /* var t = minAngle;
	  minAngle = maxAngle;
	  maxAngle = t;*/
	  
		
	 /* cc.log('minAngle = ' + minAngle);	
	  cc.log('maxAngle = ' + maxAngle);*/
	  
		
		
 	  minAngle = (-1)*minAngle + 90;
	  maxAngle = (-1)*maxAngle + 90;
	  
	  var t = minAngle;
	  minAngle = maxAngle;
	  maxAngle = t;
	  
	  /*cc.log('minAngle = ' + minAngle);	
	  cc.log('maxAngle = ' + maxAngle);*/

	  //minAngle = /*(-1)*minAngle + 90*/180 + 30 - 45;
	  //maxAngle = /*(-1)*maxAngle + 90*/180 + 30;
	  //minAngle = 165;
	  //maxAngle = 210;
	  var dAngle = 5;
	  var verts = [];	
	  verts.push(cc.p(x, y));
	  while (minAngle <= maxAngle) {
		verts.push(cc.p(x + r*Math.cos((Math.PI/180)*minAngle), y + r*Math.sin((Math.PI/180)*minAngle)));  
	    minAngle += dAngle;  
	  }
	  verts.push(cc.p(x, y));
	  node.clear();
	  node.drawPoly(verts, cc.color(255,255,255, 100), 1, cc.color(255,255,255, 100));
	},
	
	game: function () {
  	 app.renderMenu(this, this.menuGame, true);
  	 
  	 var lightYellow = new cc.Sprite(assets.acceleratorYellowLight);
  	 lightYellow.attr({
  		visible : false,
  		x: app.localX(1536 - 232),
		y: app.localY(1536 - 312),
		anchorX: 0,
		anchorY: 1	 
  	 });
  	 this.menu.addChild(lightYellow);
  	 
  	var lightGreen = new cc.Sprite(assets.acceleratorGreenLight);
  	lightGreen.attr({
  		visible : false,
 		x: app.localX(1536 - 96),
		y: app.localY(1536 - 312),
		anchorX: 0,
		anchorY: 1	 
 	 });
 	 this.menu.addChild(lightGreen);
 	 
 	var lightRed = new cc.Sprite(assets.acceleratorRedLight);
  	lightRed.attr({
  		visible : false,
 		x: app.localX(1536 + 36),
		y: app.localY(1536 - 312),
		anchorX: 0,
		anchorY: 1	 
 	 });
 	 this.menu.addChild(lightRed);
 	 
 	 var arrowTah = new cc.Sprite(assets.acceleratorArrowTah);
  	 arrowTah.attr({
 		x: app.localX(1536 - 220),
		y: app.localY(1536 - 1076),
		rotation : -120,
		anchorX: 6/12,
		anchorY: 1 - 106/116
 	 });
 	 this.menu.addChild(arrowTah);
 	 
 	 
 	 var arrowSpeed = new cc.Sprite(assets.acceleratorArrowSpeed);
  	 arrowSpeed.attr({
 		x: app.localX(1536 + 191),
		y: app.localY(1536 - 1077),
		rotation : -120,
		anchorX: 7/14,
		anchorY: 1 - 112/123
 	 });
 	 this.menu.addChild(arrowSpeed);
 	 
 	 var pedal = new cc.Sprite(assets.acceleratorPedal);
 	 pedal.attr({
 		x: app.localX(1536 + 614),
		y: app.localY(1536 - 1016),
		anchorX: 0,
		anchorY: 1
 	 });
 	 this.menu.addChild(pedal);
 	 
 	 
 	this.updateTah = function () {
 		cc.log('go');
 		pedal.runAction(new cc.Sequence([
          new cc.ScaleTo(0.1, 0.9, 0.9),
          new cc.ScaleTo(0.1, 1, 1)
 		]
 		));
 	    Tah += 4;
        moveTah(Tah);
    }
 	 

 	var startLimit = -120;
    var deltaLimit = 45; 
    
 	var limit = new cc.DrawNode();
 	this.menu.addChild(limit);
 	this.drawSector(limit, app.localX(1536 -220), app.localY(1536 - 1076), 150, startLimit,  startLimit + deltaLimit);
    

 	var moveTah = function (angle) {
 	  arrowTah.runAction(new cc.RotateTo(0.5, angle, angle));
 	  var aS = angle *0.7 + Math.random()*10;
 	  arrowSpeed.runAction(new cc.RotateTo(0.5, aS, aS));
    }
 
  	 
  	 
  	  
  	 var Tah = startLimit + 22;
     var startTime = new Date();
     var timeOuts = [];
     // Начало игры
     setTimeout(function () {
       lightRed.visible = true;
       setTimeout(function () {
    	 lightYellow.visible = true;
    	 setTimeout(function () {
    	   lightGreen.visible = true;
    	   moveTah(Tah);
           startTime = new Date();
           var intervalGame = setIntervalG(function () {
               deltaLimit += (Math.random() < 0.5 ? -1 : 1)*Math.random()*10;
               if (deltaLimit < 10) deltaLimit = 10;
               startLimit += 5 + (Math.random() < 0.5 ? -1 : 1)*Math.random()*2;
               this.drawSector(limit, app.localX(1536 -220), app.localY(1536 - 1076), 150, startLimit,  startLimit + deltaLimit);
               if (((startLimit + deltaLimit) >= 120) || (Tah < startLimit) || Tah > (startLimit + deltaLimit)) {
                 clearInterval(intervalGame);
                 clearInterval(intervalTahDown);
                 this.result(new Date() - startTime);
               }
             }.bind(this), 1000);

             var intervalTahDown = setIntervalG(function () {
                Tah = Tah - 2;
                if (Tah < -120) Tah = -120;
                moveTah(Tah);
             }, 2000);
           
    	   
    	 }.bind(this), 500);
       }.bind(this), 500);
     }.bind(this), 500); 	 
    },
    result: function (time) {
      app.renderMenu(this, this.menuResult, true);
      var timeStr = '00:' + leadZero(Math.floor(time/1000), 2) + ':' + leadZero(time -  Math.floor(time/1000)*1000, 3);
      console.log('Stop Game = ' + timeStr);
      var line = new cc.LabelTTF(
    		  timeStr,
    		  'res/fonts/nissanagmed.ttf',
			  190
	  );
	  line.setPosition(1536 - 454 - 100 - 50, 1536 - 684);
	  line.setAnchorPoint(0, 1);
	  line.setColor(cc.color(198, 22, 51, 255));
      this.menu.addChild(line);
    }
});