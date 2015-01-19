var Circle = cc.Layer.extend({
	ctor: function () {
		this._super();
	},
	menuIntro: {
		back: assets.circleIntroBack,
	  areas : [
	           {
	        	   x: 3072/2 -366,
	        	   y: 1536 - 1174 - 306,
	        	   w: 306,
	        	   h: 306,
	        	   click: function () {
	        		   cc.loader.loadJson("res/data/circle.json", function(error, data) {
	        			   app.circle.game(data[0]);  
	        		   });	
	        	   }	
	           },
	           {
	        	   x: 3072/2 + 0,
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
	menuGame: {
		back: assets.circleGameBack,
		areas: [
		        {
		        	x     : 1536 - 955,
		        	y     : 1536 - 420 - 268,
		        	w     : 268,
		        	h     : 268,
		        	click : function () {
		        		app.circle.help();	
		        	}
		        },
		        {
		        	x     : 1536 - 955,
		        	y     : 1536 - 760 - 268,
		        	w     : 268,
		        	h     : 268,
		        	click : function () {
		        		app.runStage(new Menu(), 2);
		        	}
		        },
		        {
		        	x     : 1536 - 955,
		        	y     : 1536 - 1102 - 268,
		        	w     : 268,
		        	h     : 268,
		        	click : function () {
		        		app.runStage(new Circle());
		        	}
		        },
		        // Пауза
		        {
		        	x: 1536 - 250/2,
		        	y: 1536 - 140,
		        	h: 140,
		        	w: 250,
		        	click: function () {
		        		cc.log('PAUSE!!!');
		        		app.circle.pause();
		        	}
		        }
		        ]
	},
	menuHelp: {
		back: assets.turnHelp,
		areas: [
		        {
		        	x: 1536 - 953,
		        	y: 1536 - 410 - 270,
		        	w: 270,
		        	h: 270,
		        	click: function () {
		        		app.runStage(new Menu(), 2);
		        	}
		        },
		        {
		        	x: 1536 - 953,
		        	y: 1536 - 750 - 270,
		        	w: 270,
		        	h: 270,
		        	click: function () {
		        		cc.loader.loadJson("res/data/circle.json", function(error, data) {
		        			app.circle.game(data[0]);  
		        		});	 
		        	}
		        }
		        ]
	},
	menuResult: {
		back: assets.turnResult,
		areas: [
		        {
		        	x: 1536 - 953,
		        	y: 1536 - 410 - 270,
		        	w: 270,
		        	h: 270,
		        	click: function () {
			  	
			  app.runStage(new Menu(), 2);
		    }
	      },
	     {
		   x: 1536 - 953,
		   y: 1536 - 750 - 270,
		   w: 270,
		   h: 270,
		   click: function () {
			   cc.loader.loadJson("res/data/circle.json", function(error, data) {
				   app.circle.game(data[0]);  
    		   });	
		   }
	     },{
	    	 x: 1536 - 260,
	    	 y: 1536 - 1165 - 99,
	    	 w: 99,
	    	 h: 99,
	    	 click: function () {
	    		 app.share('fb', 'Я прошел урок "Прохождение круга" в Школе вождения Nissan!');
	    	 }
	     },
	     {
	    	 x: 1536 - 133,
	    	 y: 1536 - 1165 - 99,
	    	 w: 99,
	    	 h: 99,
	    	 click: function () {
	    		 app.share('vk', 'Я прошел урок "Прохождение круга" в Школе вождения Nissan!');
	    	 }
	     },
	     {
	    	 x: 1536 - 6,
	    	 y: 1536 - 1165 - 99,
	    	 w: 99,
	    	 h: 99,
	    	 click: function () {
	    		 app.share('tw', 'Я прошел урок "Прохождение круга" в Школе вождения Nissan!');
	    	 }
	     },
	     {
	    	 x: 1536 + 121,
	    	 y: 1536 - 1165 - 99,
	    	 w: 99,
	    	 h: 99,
	    	 click: function () {
	    		 app.share('od', 'Я прошел урок "Прохождение круга" в Школе вождения Nissan!');
	    	 }
	     }

	     ]
	},
	

	
	menuPause: {
		back: 'res/coordination/pause-back.png',
		areas: [
		  {
			  x: 1536 -488,
			  y: 1536 - 483 - 278,
			  h: 278,
			  w: 278,
			  click: function () {
	    	  app.circle.pauseLayer.removeFromParent(true);  
	    	  app.circle.scheduleUpdate();
	    	  app.circle.isPause = false;
	    	  app.circle.car.resume();
	    	  app.circle.pauseTime += new Date() - app.circle.startPause;
	    	  cc.audioEngine.resumeMusic();
	    	  app.circle.retFromPause = true;
	    	}
	     },
	     {
	    	x: 1536 - 78,
	    	y: 1536 - 483 - 278,
		    h: 278,
		    w: 278,
		    click: function () {
		      app.runStage(new Menu(), 2);
		    }
	     },
		 {
		   	x: 1536 + 291,
		    y: 1536 - 483 - 278,
		    h: 278,
		    w: 278,
		    click: function () {
		    	app.circle.pauseLayer.removeFromParent(true);  
		    	cc.loader.loadJson("res/data/circle.json", function(error, data) {
     			   app.circle.game(data[0]);  
     		   });	
		    }
		 }
	  ]
	},
	
	isPause: false,
    pauseTime: 0,
	pause: function () {
	  this.unscheduleUpdate();
	  this.startPause = new Date();
	  this.isPause = true;
	  this.car.pause();
	  this.pauseLayer = new cc.Layer();
	  this.addChild(this.pauseLayer);
	  app.renderMenu(this.pauseLayer, this.menuPause, false);
	  cc.audioEngine.pauseMusic();
	},
	
	
	
	init: function () {
		app.circle = this;	
		app.renderMenu(this, this.menuIntro, true);	
	},
	help: function () {
		app.renderMenu(this, this.menuHelp, true);
	},
	game: function (track) {
		cc.audioEngine.end();	
		app.renderMenu(this, this.menuGame, true);
		
		// Пауза
		  this.pauseTime = 0;
		  this.isPause = false;
		  var pause = new cc.Sprite('res/coordination/pause.png');
		  pause.attr({
			  x        : app.localX(1536),
			  y        : app.localY(1536 - 69/2)
		  });
		  this.menu.addChild(pause, 1);
		
		
		var car = new cc.Sprite(assets.car);
		this.car = car;
		car.attr({
			x: app.localX(1536 + track.x),
			y: app.localY(1536 - track.y),
			rotation : track.rotation
		});
		this.menu.addChild(car, 100);
		
		/*app.drawPath(this.menu, app.preparePathPoints(track.path));
		app.moveByPath(app.preparePathPoints(track.path), car, 5, function () {
			cc.log('Final !!!');  
        }, true);*/

		var path = [];
		var oldX = car.x;
		var oldY = car.y;
		var mDelta = 20;

		var prevLocation = null;
		var pathLine = new cc.DrawNode();
		this.menu.addChild(pathLine);

		var endGame = false;
		setTimeout(function () {
		cc.eventManager.addListener({
			event: cc.EventListener.TOUCH_ONE_BY_ONE,
			// When "swallow touches" is true, then returning 'true' from the onTouchBegan method will "swallow" the touch event, preventing other listeners from using it.
			swallowTouches: true,
			//onTouchBegan event callback function                      
			onTouchBegan: function (touch, event) { 
				if (app.circle.retFromPause !== true) { 
				  var location = touch.getLocation(); 
				  oldX = location.x;
				  oldY = location.y;
				  prevLocation = location;
				  cc.audioEngine.playMusic('res/sounds/engine-for-games2.mp3', false);
				  return true;
				} else {
					app.circle.retFromPause = false;
					return false;
				}
			  },
			  onTouchMoved: function (touch, event) {
				 if (endGame == false) {
				  var location = touch.getLocation(); 
				  // Рисуем линию
				  //pathLine.drawDot(location, 25, cc.color(255, 131, 22, 20));
  				  // Рисуем линию
				  pathLine.drawSegment(prevLocation, location, 15, cc.color(249, 216, 99, 60));
				  prevLocation = location;
				  if (Math.abs(location.x - oldX) > mDelta && Math.abs(location.y - oldY) > mDelta) {
				    path.push(location);
				    oldX = location.x;
				    oldY = location.y;  
				  }
				 } 
			  },
			  onTouchEnded: function (touch, event) {
				if (endGame == false && getPathPointsDistance(path) > 0) { 
				endGame = true;
				var location = touch.getLocation();
				path.push(location);
				cc.log('onTouchEnded'); 
				cc.log(path.length);
				app.drawPath(this.menu, app.preparePathPoints(track.path), false);
				
				app.moveByPathConstantSpeed(path, car, 600, function () {
					cc.log('Final !!!');  
					var origDistancePath = getPathDistance(track.path);
					var userDistancePath = getPathPointsDistance(path);
					
					cc.log('origDistancePath = ' + origDistancePath);
					cc.log('userDistancePath = ' + userDistancePath);
					if (userDistancePath > origDistancePath) {
						var tmp = userDistancePath;
						userDistancePath = origDistancePath;
						origDistancePath = tmp;
					}

					var percent = Math.round((userDistancePath / origDistancePath)*100);

					cc.log('Percent = ' + percent + '%');
					this.result(percent);
				}.bind(this), true);
				}
			  }.bind(this)	  
	  }, this.menu);
	  }.bind(this), 100);
	  
	},
	result: function (percent) {
		  app.renderMenu(this, this.menuResult, true);	
		  var line = new cc.LabelTTF(
				  percent + '%',
				  'res/fonts/nissanagmed.ttf',
				  190
		  );
		  line.setPosition(app.localX(1350), app.localY(918 - 150));
		  line.setAnchorPoint(0, 1);
		  line.setColor(cc.color(197, 23, 50, 255));
		  this.menu.addChild(line);
	}
});