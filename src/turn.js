var Turn = cc.Layer.extend({
	ctor: function () {
		this._super();
	},
	menuIntro: {
	  back: assets.turnIntroBack,
	  areas: [
	    {
	    	x: 1536 - 485,
	    	y: 1536 - 1174 - 306,
	    	w: 306,
	    	h: 306,
	    	click: function () {
	    	  app.turn.choose();
	    	}
	    },
	    {
	    	x: 1536 - 135,
	    	y: 1536 - 1174 - 306,
	    	w: 306,
	    	h: 306,
	    	click: function () {
	    		app.runStage(new Theory(), {
	    			back: assets.theoryTurnBack,
	    			url: 'res/data/theory_turn.html',   
	    			onBack: function () {
	    				app.runStage(new Turn());
	    			},
	    			onPractice: function () {
	    				app.turn = new Turn();
	    				app.clearStage();
	    				app.game.stage.addChild(app.turn, 10);
	    				app.turn.choose();
	    			}  
	    		});
	    	}
	    },
	    {
	    	x: 1536 + 215,
	    	y: 1536 - 1174 - 306,
	    	w: 306,
	    	h: 306,
	    	click: function () {
	    		app.runStage(new Menu(), 2);
	    	}
	    }
	    ]
	},
	menuChoose: {
		back: assets.turnChooseBack,
		areas: [
		        {
		        	x: 1536 - 850,
		        	y: 1536 - 574 - 365,
		        	w: 365,
		        	h: 365,
		        	click: function () {
		        		cc.loader.loadJson("res/data/turn.json", function(error, data) {
		        			app.turn.game(1, data[0]);  
		        		});	
		        	}	
		        },
		        {
		        	x: 1536 - 416,
		        	y: 1536 - 574 - 365,
		        	w: 365,
		        	h: 365,
		        	click: function () {
	    		cc.loader.loadJson("res/data/turn.json", function(error, data) {
	    			app.turn.game(2, data[1]);  
	    		});
	    	}	
	    },
	    {
	    	x: 1536 + 10,
	    	y: 1536 - 574 - 365,
	    	w: 365,
	    	h: 365,
	    	click: function () {
	    		cc.loader.loadJson("res/data/turn.json", function(error, data) {
	    			app.turn.game(3, data[2]);  
	    		});
	    	}	
	    },
	    {
	    	x: 1536 + 440,
	    	y: 1536 - 574 - 365,
	    	w: 365,
	    	h: 365,
	    	click: function () {
	    		app.runStage(new Menu(), 2);
	    	}	
	    }
	    ]
	},
	menuGame: {
		back: assets.turnType1,
		areas: [
		        {
		        	x     : 1536 - 955,
		        	y     : 1536 - 420 - 268,
		        	w     : 268,
		        	h     : 268,
		        	click : function () {
		        		app.turn.help();	
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
		        		app.turn.choose();
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
            	cc.loader.loadJson("res/data/turn.json", function(error, data) {
            		app.turn.game(app.turn.currentTrack, data[app.turn.currentTrack - 1]);  
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
		 cc.loader.loadJson("res/data/turn.json", function(error, data) {
			app.turn.game(app.turn.currentTrack, data[app.turn.currentTrack - 1]);  
		 }); 
	   }
     },{
    	 x: 1536 - 260,
    	 y: 1536 - 1165 - 99,
    	 w: 99,
    	 h: 99,
    	 click: function () {
    		 app.share('fb', 'Я прошел урок "Прохождение поворота" в Школе вождения Nissan!');
    	 }
     },
     {
    	 x: 1536 - 133,
    	 y: 1536 - 1165 - 99,
    	 w: 99,
    	 h: 99,
    	 click: function () {
    		 app.share('vk', 'Я прошел урок "Прохождение поворота" в Школе вождения Nissan!');
    	 }
     },
     {
    	 x: 1536 - 6,
    	 y: 1536 - 1165 - 99,
    	 w: 99,
    	 h: 99,
    	 click: function () {
    		 app.share('tw', 'Я прошел урок "Прохождение поворота" в Школе вождения Nissan!');
    	 }
     },
     {
    	 x: 1536 + 121,
    	 y: 1536 - 1165 - 99,
    	 w: 99,
    	 h: 99,
    	 click: function () {
    		 app.share('od', 'Я прошел урок "Прохождение поворота" в Школе вождения Nissan!');
    	 }
     }
      
	 ]
	},
	init: function () {
	  app.turn = this;	
	  app.renderMenu(this, this.menuIntro, true);
	},
	choose: function () {
	  app.renderMenu(this, this.menuChoose, true);
	},
	help: function () {
	  app.renderMenu(this, this.menuHelp, true);
	},
	preparePath: function (path) {
		var points = [];
		var i = 0;
		while (i < path.length) {
		  points.push(app.localX(path[i]));
		  points.push(app.localY(1536 - path[i + 1]));
		  i += 2;
		}	
		return points;
	},
	game: function (type, track) {
	  cc.audioEngine.end();	
	  this.currentTrack = type;	
	  this.menuGame.back = 'res/turn/turn-type' + type + '.jpg';
	  app.renderMenu(this, this.menuGame, true);
	 
	  //app.drawPath(this.menu, app.preparePathPoints(track.path));
	  
	  var car = new cc.Sprite(assets.car);
	  car.attr({
		  x: app.localX(1536 + track.x),
		  y: app.localY(1536 - track.y),
		  rotation : track.rotation
	  });
	  this.menu.addChild(car, 100);
	  
	 
	  /*app.moveByPath(app.preparePathPoints(track.path), car, 5, function () {
		cc.log('Final !!!');  
	  });*/
	  
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
				/*if (endGame == false) */{ 
				  cc.log('onTouchStart');
				  var location = touch.getLocation(); 
				  oldX = location.x;
				  oldY = location.y;
				  prevLocation = location;
				  cc.audioEngine.playMusic('res/sounds/engine-for-games2.mp3', false);
				} 
			    return true;
			  },
			  onTouchMoved: function (touch, event) {
				if (endGame == false) {
				  var location = touch.getLocation(); 
				  // Рисуем линию
				  //pathLine.drawDot(location, 15, cc.color(255, 131, 22, 80));
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
			   if (endGame == false) {  
				endGame = true;  
				var location = touch.getLocation();
				path.push(location);
				cc.log('onTouchEnded'); 
				cc.log(path.length);
				app.drawPath(this.menu, app.preparePathPoints(track.path), false);
				
				app.moveByPathConstantSpeed(path, car, 600, function () {
					cc.log('Final !!!');  
					//cc.audioEngine.end();
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
				}.bind(this));
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