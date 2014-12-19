var joystickComplex = {
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
			result.angle = a;//(-1)*(a + 90);

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

var Complex = cc.Layer.extend({
	ctor: function () {
		this._super();
	},
	menuIntro: {
		back: assets.complexIntroBack,
		areas: [
		        {
		        	x: 3072/2 + 530,
		        	y: 3072/2 - 1031 - 140,
		        	h: 140,
		        	w: 396,
		        	click: function () {
		        		cc.loader.loadJson("res/data/complex.json", function(error, data) {
		        			app.complex.game(data);  
		        		});
		        		  
		        	}	
		        }      
		        ]
	},
	menuGame: {
		back: assets.complexSorryBack
	},	
	init: function (options) {
		app.complex = this;
		app.renderMenu(this, this.menuIntro, true);
	},
	
	getParallelSegment: function (x1, y1, x2, y2, d) {
		var x11 = x1 + d*((y2-y1)/Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2)));
		var y11 = y1 + d*((x2-x1)/Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2)));
		var x22 = x2 + d*((y2-y1)/Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2)));
		var y22 = y2 + d*((x2-x1)/Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2)));
		return {
			x1: x11,
			y1: y11,
			x2: x22,
			y2: y22
		}
	},

	// Добавляюется ограничения для физического движка для заданного сегмента
	segmentLimit: function (g, x1, y1, x2, y2) {
		var p = this.getParallelSegment(x1, y1, x2, y2, 1);
		var side1 = g.addObj({
			physic: {friction: 0, restitution: 0},
			type: g.objType.Static,
			pos: {
				x: x1,
				y: y1
			},
			shape: {
				polygon: [x1, y1, p.x1, p.y1, p.x2, p.y2, x2, y2]
			}
		});
		var side2 = g.addObj({
			physic: {friction: 0, restitution: 0},
			type: g.objType.Static,
			pos: {
				x: x1,
				y: y1
			},
			shape: {
				polygon: [x1, y1, x2, y2, p.x2, p.y2, p.x1, p.y1]
			}
		});
		return {
			side1: side1,
			side2: side2
		}
	},

	// Добавляюется ограничения для физического движка по заданной геометрии кривой
	addPathLimit: function (g, path) {
		var limits = [];
		for (var i = 0; i < path.length; i +=4) {
			limits.push(this.segmentLimit(g, path[i], path[i + 1], path[i + 2], path[i + 3]));
			if ((i + 5) < path.length) {
				limits.push(this.segmentLimit(g, path[i + 2], path[i + 3], path[i + 4], path[i + 5]));
			}
		}
		return limits;
	},


	game: function (tracks) {
		//tracks.shuffle(true);
		var track = tracks[0]; 
		this.track = track;

		this.menuGame.back = 'res/complex/' + track.track; 	
		app.renderMenu(this, this.menuGame, true);
		var scaleFactor = 1536/640;
		track.s = getPathDistance(track.path);


		this.worldLayer = new cc.Layer();  
		this.menu.addChild(this.worldLayer);	
		this.world = new physicWorld(this.worldLayer, {
			gravity     : [0, 0],
			debug    : true
		});
		// Добавляем физические ограничения трассы
		track.limitFinish = app.preparePath(track.limitFinish);

		// Линия финиша
		if (track.limitFinish.length >= 4) {
			var finish = this.segmentLimit(this.world, track.limitFinish[2], track.limitFinish[3], track.limitFinish[0], track.limitFinish[1]);
		}

		// Линии отбойников
		for (var i = 0; i < track.bumpers.length; i++) {
			track.bumpers[i] = app.preparePath(track.bumpers[i]);
			if (track.bumpers[i].length > 0) {
				try {
					//console.log(i);
					this.addPathLimit(this.world, track.bumpers[i]);
				} catch(e) {
					//console.info(i);
				}

			}
		}

		var carW = 81;
		var carH = 47;
		var car = (this.world.addObj({
			physic: {density: 1, friction: 0.5, restitution: 0.2},
			pos: {
			  //rotation : track.rotation,
              x        : app.localX(1536 - track.x),
              y        : app.localY(1536 - track.y)
            },
          shape: {
              box: [(carW - 10)*scaleFactor, (carH - 10)*scaleFactor]
          },
          bitmap: 'res/complex/complex-car.png',
          bitmapOptions: {
              scale      : 1
          }
        }));
        car.body.SetLinearDamping(10);
        car.body.SetAngularDamping(10);
        car.body.SetAngle(track.rotation*Math.PI/180);
        car.update = function (input) {
        	this.angle    = (-1)*input.angle;
        	this.velocity = input.velocity;
        }
        
        var joystick = joystickComplex;
        joystick.init({
        	x           : app.localX(2298),
        	y           : app.localY(1536 - 1307),
        	radius      : 264,
        	maxVelocity : (cc.sys.platform == cc.sys.IPAD || cc.sys.platform == cc.sys.IPHONE)?30:15
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
        
        var gameTick = setIntervalG(function() {
        	
        	car.body.SetAngle(car.angle);
        	/*var position = car.body.GetPosition();
        	position.x +=  (-1)*car.velocity*Math.cos(car.angle);
        	position.y +=  (-1)*car.velocity*Math.sin(car.angle);
        	car.body.SetPosition(position);*/
        	
        	/*var prevPosition = {
        			x: car.x,
        			y: car.y
        	}

        	car.rotation = car.angle;
        	car.y += car.velocity * Math.cos(Math.PI / 180 * car.angle);
        	car.x += car.velocity * Math.sin(Math.PI / 180 * car.angle);

        	// Расчитываем интегральную длинну маршрута, которую проехал автомобиль
        	car.distancePath += getDistance(prevPosition.x, prevPosition.y, car.x, car.y);
*/
        	
        	
        	
        	
        	
        	/*if (car.x >= app.localX(track.finish.x)) {
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

        	}*/  
        }.bind(this), 1000/60);
        
        
	  
	  
	  
	  // Запуск игры
	  this.scheduleUpdate();
	},
	update: function (dt) {
		  if (this.world !== null) {
				this.world.step(dt);  
		  }	
	},
});