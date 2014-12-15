var joystickSlalom = {
		x           : 0,
		y           : 0,
		radius      : 100,
		maxVelocity : 3,
		active      : false,
		init: function (options) {
			this.x      = options.x;
			this.y      = options.y;
			this.radius = options.radius;
			this.maxVelocity = options.maxVelocity;
			this.active = false;
		},
		get: function (inputX, inputY) {
			var result = {
					velocity : 0,
					angle    : 0
			};
			var sign = this.x - inputX;
			var xa = 0;
			var ya = 10;
			var xb = inputX - this.x;
			var yb = inputY - this.y;
			var a  = Math.acos((xa*xb + ya*yb) / Math.sqrt(( Math.pow(xa, 2) + Math.pow(ya, 2)) * ( Math.pow(xb, 2) + Math.pow(yb, 2))));
			a  = a*180/Math.PI - 90;
			a  = ((sign < 0)?(180 - a):a);
			result.angle = (-1)*(a + 90);

			var d = getDistance(this.x, this.y, inputX, inputY);
			if (d > this.radius) {
				d = this.radius;
			}
			result.velocity = (this.maxVelocity/this.radius)*d*1;
			return result;
		},
		check: function (inputX, inputY) {
			var d = getDistance(this.x, this.y, inputX, inputY);
			if (d <= this.radius) {
				return true;
			} else {
				return false;
			}

		}
};

var Slalom = cc.Layer.extend({
	ctor: function () {
		this._super();
	},
	menuIntro: {
		back: assets.slalomIntroBack,
		areas : [
		         {
		        	 x: 3072/2 -485,
		        	 y: 1536 - 1174 - 306,
		        	 w: 306,
		        	 h: 306,
		        	 click: function () {
		        		 cc.loader.loadJson("res/data/slalom.json", function(error, data) {
		        			 app.slalom.game(data[0]);  
		        		 });	
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
		        			 url: 'res/data/theory_slalom.html',   
		        			 onBack: function () {
		        				 app.runStage(new Slalom());
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
	menuGame: {
		back: assets.slalomGameBack,
		areas: [
		        {
		        	x     : 1536 - 955,
		        	y     : 1536 - 420 - 268,
		        	w     : 268,
		        	h     : 268,
		        	click : function () {
		        		app.slalom.help();	
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
		        		app.runStage(new Slalom());
		        	}
		        }
		        ]
	},
	menuHelp: {
		back: assets.slalomHelp,
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
		        		cc.loader.loadJson("res/data/slalom.json", function(error, data) {
		        			app.slalom.game(data[0]);  
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
			   cc.loader.loadJson("res/data/slalom.json", function(error, data) {
       			app.slalom.game(data[0]);  
       		   });	
		   }
	     },{
	    	 x: 1536 - 260,
	    	 y: 1536 - 1165 - 99,
	    	 w: 99,
	    	 h: 99,
	    	 click: function () {
	    		 app.share('fb', 'Я прошел урок "Управляемый занос" в Школе вождения Nissan!');
	    	 }
	     },
	     {
	    	 x: 1536 - 133,
	    	 y: 1536 - 1165 - 99,
	    	 w: 99,
	    	 h: 99,
	    	 click: function () {
	    		 app.share('vk', 'Я прошел урок "Управляемый занос" в Школе вождения Nissan!');
	    	 }
	     },
	     {
	    	 x: 1536 - 6,
	    	 y: 1536 - 1165 - 99,
	    	 w: 99,
	    	 h: 99,
	    	 click: function () {
	    		 app.share('tw', 'Я прошел урок "Управляемый занос" в Школе вождения Nissan!');
	    	 }
	     },
	     {
	    	 x: 1536 + 121,
	    	 y: 1536 - 1165 - 99,
	    	 w: 99,
	    	 h: 99,
	    	 click: function () {
	    		 app.share('od', 'Я прошел урок "Управляемый занос" в Школе вождения Nissan!');
	    	 }
	     }

	     ]
	},
	init: function () {
	  app.slalom = this;	
	  app.renderMenu(this, this.menuIntro, true);	
	},
	help: function () {
	  app.renderMenu(this, this.menuHelp, true);	
	},
	game: function (track) {
	  app.renderMenu(this, this.menuGame, true);
	  var car = new cc.Sprite(assets.car);
	  car.attr({
		  x        : app.localX(1536 + track.x),
			y        : app.localY(1536 - track.y),
			rotation : track.rotation,
			
			angle        : track.rotation,
			velocity     : 0,
			distancePath : 0
	  });
	  car.update = function (input) {
		this.angle    = input.angle;
		this.velocity = input.velocity;
      }
	  this.menu.addChild(car);
	  
	  cc.log(car.x);
	  cc.log(app.localX(track.finish.x));
	  
	  var joystick = joystickSlalom;
      joystick.init({
         x           : app.localX(2190),
         y           : app.localY(292),
         radius      : 264,
         maxVelocity : 10
      });
      
      cc.eventManager.addListener({
			event: cc.EventListener.TOUCH_ONE_BY_ONE,
			// When "swallow touches" is true, then returning 'true' from the onTouchBegan method will "swallow" the touch event, preventing other listeners from using it.
			swallowTouches: true,
			//onTouchBegan event callback function                      
			onTouchBegan: function (touch, event) { 
				 var location = touch.getLocation();
				 if (joystick.check(location.x, location.y)) {
	                 joystick.active = true;
	                 car.update(joystick.get(location.x, location.y));
	                 cc.log('YES');
	             } else {
	                 car.velocity = 0;
	             }
				 return true;
			},
			onTouchMoved: function (touch, event) {
				var location = touch.getLocation(); 
				if (joystick.active) {
		           car.update(joystick.get(location.x, location.y));
		        }
			  },
			  onTouchEnded: function (touch, event) {
				 joystick.active = false;
		         car.velocity = 0;
			  }.bind(this)	  
      }, this.menu);

      var origDistancePath = getPathDistance(track.path);
      var gameTick = setIntervalG(function() {
    	  var prevPosition = {
    	    x: car.x,
    	    y: car.y
    	  }
    	  
    	  car.rotation = car.angle;
    	  car.y += car.velocity * Math.cos(Math.PI / 180 * car.angle);
    	  car.x += car.velocity * Math.sin(Math.PI / 180 * car.angle);

    	  // Расчитываем интегральную длинну маршрута, которую проехал автомобиль
          car.distancePath += getDistance(prevPosition.x, prevPosition.y, car.x, car.y);
    	  
    	  if (car.x >= app.localX(track.finish.x)) {
    		  clearInterval(gameTick);
    		  // Условие финиша
    		  cc.log('Условие финиша');
    		  
    		  //console.log('origDistancePath = ' + origDistancePath);
    		  //console.log('carDistancePath = ' + car.distancePath);

    		 
    		  if (car.distancePath > origDistancePath) {
    			var tmp = car.distancePath;
    			car.distancePath = origDistancePath;
    			origDistancePath = tmp;
    		  }
    		  
    		  var percent = Math.round((car.distancePath / origDistancePath)*100);
              cc.log('Percent = ' + percent + '%');
              this.result(percent);
             
           }  
      }.bind(this), 1000/60);
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