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
			  app.runStage(new Theory(), {
				back: assets.theoryAcceleratorBack,
				url: 'res/data/theory_accelerator.html',   
				onBack: function () {
				  app.accelerator = new Accelerator();
				  app.runStage(app.accelerator);
				},
				onPractice: function () {
				  app.accelerator = new Accelerator();
				  app.clearStage();
				  app.game.stage.addChild(app.accelerator, 10);
				  app.accelerator.game();
				}
			  });
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
        /*{
        	x     : 1536 + 614,
        	y     : 1536 - 1016 - 426,
        	w     : 292,
        	h     : 426,
        	click : function () {
        		app.accelerator.updateTah();
        	}
        }*/
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
		app.accelerator = this;	
		app.renderMenu(this, this.menuIntro, true);
	},
	help: function () {
		cc.audioEngine.end();
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
     
     var acceleratorInterval = null;
     
     // Начало игры
     setTimeout(function () {
       lightRed.visible = true;
       setTimeout(function () {
    	 lightYellow.visible = true;
    	 setTimeout(function () {
    	   lightGreen.visible = true;
    	   moveTah(Tah);
           startTime = new Date();
           cc.audioEngine.playMusic('res/sounds/loop.mp3', true);
           
           // Обработчик нажатия на педаль
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
 					 cc.audioEngine.playEffect('res/sounds/click3.mp3');
 					 pedal.runAction(new cc.Sequence([
 					                                 new cc.ScaleTo(0.1, 0.9, 0.9)
 					                        		]
 					                        		));
 					
 			         acceleratorInterval = setIntervalG(function () {
 			        	Tah += 4;
 	 			        moveTah(Tah);	 
 			         }.bind(this), 600);
 					 
 					 return true;
 				  }
 				  return false;
 			  },
 			 onTouchEnded: function (touch, event) { 
				  var target = event.getCurrentTarget();  
				  var s = target.getContentSize();
				  var rect = cc.rect(0, 0, s.width, s.height);
				  
				  //Get the position of the current point relative to the button
				  var locationInNode = target.convertToNodeSpace(touch.getLocation());    
				  //Check the click area
				  if (cc.rectContainsPoint(rect, locationInNode)) {       
					  cc.audioEngine.playEffect('res/sounds/click3.mp3');
					  pedal.runAction(new cc.Sequence([
                                                      new cc.ScaleTo(0.1, 1, 1)
					                        		]
					                        		));
					  clearInterval(acceleratorInterval);
					  return true;
				  }
				  return false;
			  },
 			  
 		   }, pedal);
           
           
           
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
      cc.audioEngine.end();
      app.renderMenu(this, this.menuResult, true);
      var timeStr = '00:' + leadZero(Math.floor(time/1000), 2) + ':' + leadZero(time -  Math.floor(time/1000)*1000, 3);
      console.log('Stop Game = ' + timeStr);
      var line = new cc.LabelTTF(
    		  timeStr,
    		  'res/fonts/nissanagmed.ttf',
			  190
	  );
      line.setPosition(app.localX(1536 - 454), app.localY(1536 - 684));
	  line.setAnchorPoint(0, 1);
	  line.setColor(cc.color(198, 22, 51, 255));
      this.menu.addChild(line);
    }
});