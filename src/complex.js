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
		back: assets.complexIntroBack,
		areas: [
		        {
		        	x: (1536 -968),
		        	y: (1536 - 1104 - 408),
		        	h: 408,
		        	w: 408,
		        	click: function () {
		        		app.complex.toFuel();
		        	}
		        }, {
		        	x: 1536 - 250/2,
		        	y: 1536 - 140,
		        	h: 140,
		        	w: 250,
		        	click: function () {
		        		cc.log('PAUSE!!!');
		        		app.complex.pause();
	 	      }
	 	    	  
			  
		  }      
		]
	},
	menuResult: {
		back: assets.complexResultBack,
		areas:[
{
	x: 1536 - 450,
	y: 1536 - 1101 - 140,
	h: 140,
	w: 402,
	click: function () {
		cc.loader.loadJson("res/data/complex.json", function(error, data) {
			app.complex.game(data);  
		});
	} 	 
},
{
	x: 1536 + 54,
	y: 1536 - 1101 - 140,
	h: 140,
	w: 402,
	click: function () {
		app.runStage(new Menu(), 3);
	} 	 
},
{
	x: 1536 -206,
	y: 1536 - 921 - 86,
	h: 86,
	w: 86,
	click: function () {
		app.share('fb', 'Я прошел игру "Закрепление всех навыков" в Школе вождения Nissan!');
	}
},
{
	x: 1536 - 94,
	y: 1536 - 921 - 86,
	h: 86,
	w: 86,
	click: function () {
		app.share('vk', 'Я прошел игру "Закрепление всех навыков" в Школе вождения Nissan!');
	}
},
{
	x: 1536 +20,
	y: 1536 - 921 - 86,
	h: 86,
	w: 86,
	click: function () {
		app.share('tw', 'Я прошел игру "Закрепление всех навыков" в Школе вождения Nissan!');
	}
},
{
	x: 1536 +130,
	y: 1536 - 921 - 86,
	h: 86,
	w: 86,
	click: function () {
		app.share('od', 'Я прошел игру "Закрепление всех навыков" в Школе вождения Nissan!');
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
	    		app.complex.pauseLayer.removeFromParent(true);  
	    		app.complex.inPause = false;
	    		app.complex.scheduleUpdate();
	    		app.complex.pauseTime += new Date() - app.complex.startPause;
	    	}
	    },
	    {
	    	x: 1536 - 78,
	    	y: 1536 - 483 - 278,
		      h: 278,
		      w: 278,
		      click: function () {
		    	  app.runStage(new Menu(), 3);
		      }
		    },
		    {
		    	x: 1536 + 291,
			      y: 1536 - 483 - 278,
			      h: 278,
			      w: 278,
			      click: function () {
			    	  app.complex.pauseLayer.removeFromParent(true);  
			    	  cc.loader.loadJson("res/data/complex.json", function(error, data) {
			  			app.complex.game(data);  
			  		});
			      }
			    }
	  ]
	},
	
	inPause: false,
	pause: function () {
	  this.inPause = true;
	  this.unscheduleUpdate();
	  this.startPause = new Date();
	  this.pauseLayer = new cc.Layer();
	  this.addChild(this.pauseLayer);
	  app.renderMenu(this.pauseLayer, this.menuPause, false);
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
		var scaleFactor = 1536/640;
		tracks.shuffle(true);
		var track = tracks[0]; 
		this.track = track;
		// Вычисляем длинну маршрута
		track.s = getPathDistance(track.path);		
	

		this.menuGame.back = 'res/complex/' + track.track; 	
		app.renderMenu(this, this.menuGame, true);


		this.worldLayer = new cc.Layer();  
		this.menu.addChild(this.worldLayer);	
		this.world = new physicWorld(this.worldLayer, {
			gravity     : [0, 0],
			//debug    : true
		});
		// Границы трассы
		track.limit1 = app.preparePath(track.limit1);
		track.limit2 = app.preparePath(track.limit2);
		
		// Добавляем физические ограничения трассы
		track.limitFinish = app.preparePath(track.limitFinish);

		// Линия финиша
		if (track.limitFinish.length >= 4) {
			//var finish = this.segmentLimit(this.world, track.limitFinish[2], track.limitFinish[3], track.limitFinish[0], track.limitFinish[1]);
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
        car.angle    = track.rotation;
        car.velocity = 0;
        car.update = function (input) {
        	this.angle    = (-1)*input.angle;
        	this.velocity = input.velocity/30;
        }
        
        var joystick = joystickComplex;
        joystick.init({
        	x           : app.localX(2298),
        	y           : app.localY(1536 - 1307),
        	radius      : 220,
        	maxVelocity : (cc.sys.platform == cc.sys.IPAD || cc.sys.platform == cc.sys.IPHONE)?16:8
        });
        
        /*
        var shape = new cc.DrawNode();
        this.worldLayer.addChild(shape);
        this.world.drawSector(shape, app.localX(2298), app.localY(1536 - 1307), 220, 0, 360, cc.color(255, 255, 255, 100), cc.color(55, 55, 55, 255));
        //*/
        
        // Добавляем элементы UI: светофор, стрелки приборов
        var light1 = new cc.Sprite('res/complex/complex-gray-light.png');
        light1.attr({
        	visible  : false,
        	x        : app.localX(1536 - 995),
        	y        : app.localY(1536 - 82),
        	anchorX  : 0,
        	anchorY  : 1
        });
        this.worldLayer.addChild(light1);
        var light2 = new cc.Sprite('res/complex/complex-gray-light.png');
        light2.attr({
        	visible  : false,
        	x        : app.localX(1536 - 995 + 76),
        	y        : app.localY(1536 - 82),
        	anchorX  : 0,
        	anchorY  : 1
        });
        this.worldLayer.addChild(light2);
        var light3 = new cc.Sprite('res/complex/complex-yellow-light.png');
        light3.attr({
        	visible  : false,
        	x        : app.localX(1536 - 995 + 76 + 76),
        	y        : app.localY(1536 - 82),
        	anchorX  : 0,
        	anchorY  : 1
        });
        this.worldLayer.addChild(light3);
        var light4 = new cc.Sprite('res/complex/complex-green-light.png');
        light4.attr({
        	visible  : false,
        	x        : app.localX(1536 - 995 + 76 + 76 + 76),
        	y        : app.localY(1536 - 82),
        	anchorX  : 0,
        	anchorY  : 1
        });
        this.worldLayer.addChild(light4);
        var light5 = new cc.Sprite('res/complex/complex-red-light.png');
        light5.attr({
        	visible  : false,
        	x        : app.localX(1536 - 995 + 76 + 76 + 76 + 70),
        	y        : app.localY(1536 - 82),
        	anchorX  : 0,
        	anchorY  : 1
        });
        this.worldLayer.addChild(light5);
        var pointGas = new cc.Sprite('res/complex/complex-point-gas.png');
        pointGas.attr({
        	visible  : false,
        	x        : app.localX(1536 + track.checkPoints[0][0]),
        	y        : app.localY(1536 - track.checkPoints[0][1]),
        	anchorX  : 0.5,
        	anchorY  : 0.5,
        	scale    : scaleFactor
        });
        this.worldLayer.addChild(pointGas);
        var arrowSpeed = new cc.Sprite('res/complex/complex-arrow-left.png');
        arrowSpeed.attr({
        	rotation : -150,
        	x        : app.localX(1536 - 298),
        	y        : app.localY(1536 - 1411),
        	anchorX  : 0.5,
        	anchorY  : 0.3846153846153846
        });
        this.worldLayer.addChild(arrowSpeed);
        var arrowFull = new cc.Sprite('res/complex/complex-arrow-center.png');
        arrowFull.attr({
        	rotation : 85,
        	x        : app.localX(1536 - 11),
        	y        : app.localY(1536 - 1347),
        	anchorX  : 0.5,
        	anchorY  : 0.3806451612903226
        });
        this.worldLayer.addChild(arrowFull);
        var arrowTax = new cc.Sprite('res/complex/complex-arrow-right.png');
        arrowTax.attr({
        	rotation : -120,
        	x        : app.localX(1536 + 288),
        	y        : app.localY(1536 - 1408),
        	anchorX  : 0.5,
        	anchorY  : 0.3814432989690722
        });
        this.worldLayer.addChild(arrowTax);
        // Таймер - Секунды
        var timerSec = new cc.LabelTTF(
        		'00:00:000',
        		'res/fonts/nissanagmed.ttf',
        		87
        );
        timerSec.setPosition(app.localX(1536 - 1002 ), app.localY(1536 - 209 - 80));
        timerSec.setAnchorPoint(0, 0);
        timerSec.setColor(cc.color(help.hexToRgb('#ffffff').r, help.hexToRgb('#ffffff').g, help.hexToRgb('#ffffff').b, 255));
        this.worldLayer.addChild(timerSec);

        // Пауза
  	    var pause = new cc.Sprite('res/coordination/pause.png');
  	    pause.attr({
  		  x        : app.localX(1536),
  		  y        : app.localY(1536 - 69/2)
  	    });
  	    this.menu.addChild(pause);
        
        
        
        // Флаг говорящий о старте игры (начало ввода контрольной информации)
        var startedGame = false;
        cc.eventManager.addListener({
        	event: cc.EventListener.TOUCH_ONE_BY_ONE,
        	// When "swallow touches" is true, then returning 'true' from the onTouchBegan method will "swallow" the touch event, preventing other listeners from using it.
        	swallowTouches: true,
        	//onTouchBegan event callback function                      
        	onTouchBegan: function (touch, event) { 
        		var location = touch.getLocation();
        		if (joystick.check(location.x, location.y)) {
        			startedGame = true;
        			joystick.active = true;
        			car.update(joystick.get(location.x, location.y));
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
        
               
        // Текущая контрольная точка
        var currentCheckPoint = 0;
        // Переодически синхронизируем скрость линейную скорость авто и спидометр
        setIntervalG(function () {
        	//cc.log(((car.velocity*30)/joystick.maxVelocity)*100 + '%');
        	var p = ((car.velocity*30)/joystick.maxVelocity);
        	var a1 = p*300 - 150;
        	arrowSpeed.runAction(cc.rotateTo(0.5, a1, a1));
        	var a2 = p*240 - 120;
        	arrowTax.runAction(cc.rotateTo(0.5, a2, a2));
        	arrowFull.runAction(cc.rotateTo(0.5,  1.7*currentFull - 85,  1.7*currentFull - 85));
        }, 600);
        // Текущее кол-во топлива в авто
        var currentFull = 100;
        // Интегральная длинна маршрута, которую проехал автомобиль
        var carS = 0;
        var carSx = car.objectEseal.x;
        var carSy = car.objectEseal.y;
       
        
        var gameTick = setIntervalG(function() {
          var a = car.angle*Math.PI/180;
          car.body.SetAngle(a);
        	
          var position = car.body.GetPosition();
          position.x +=  (-1)*car.velocity*Math.cos(a);
          position.y +=  (-1)*car.velocity*Math.sin(a);
          car.body.SetPosition(position);
          
          // Расчет игровых параметров
          // Расчитываем интегральную длинну маршрута, которую проехал автомобиль
          carS += getDistance(car.objectEseal.x, car.objectEseal.y, carSx, carSy);
          carSx = car.objectEseal.x;
          carSy = car.objectEseal.y;
          if (startedGame == true) {
        	  // Условие провала фольстарт
        	  if (light4.visible == false) {
        		light5.visible = true;
        		cc.log('Result = -1, Условие провала Фальстарт!');
        		this.result(-1);
        	  }
        	  currentFull =  100 - (carS/((track.s)/1.5))*100;
        	  // Условие провала через заправку
        	  if (currentFull < 0) {
        		  cc.log('Result = -2, Условие провала через заправку');
        		  this.result(-2);
        	  }
        	  // Условие провала - выход с трассы
        	  if ((isPointInPoly(car.objectEseal.x, car.objectEseal.y, track.limit1) == false) || (isPointInPoly(car.objectEseal.x, car.objectEseal.y, track.limit2) == true)) {
        		  cc.log('Result = -2, Условие провала - выход с трассы');
        		  this.result(-2);
        	  }
        	  
        	  if (currentCheckPoint > 2) currentCheckPoint = 2;
        	  var d = getDistance(car.objectEseal.x, car.objectEseal.y, app.localX(1536 + track.checkPoints[currentCheckPoint][0]), app.localY(1536 - track.checkPoints[currentCheckPoint][1]));
        	  if (d <= 172) {
        		  // Условие финиша
        		  if (currentCheckPoint == 2) {
        			 cc.log('Нормальный финиш!');
    				 this.result((new Date() - startTime - this.pauseTime));
        		  } else {
        			pointGas.visible = true;
        			pointGas.x = app.localX(1536 + track.checkPoints[currentCheckPoint][0]);
        			pointGas.y = app.localY(1536 - track.checkPoints[currentCheckPoint][1]);
        		  }  
        	  }	else {
        		pointGas.visible = false;  
        	  }  
          }
        }.bind(this), 1000/60);
        
        // Заправка
        // Действие - заправка авто
        this.toFuel = function () {
        	if (pointGas.visible == true) {
        		cc.log('Действие - заправка авто');
        		cc.log('currentCheckPoint = ' + currentCheckPoint);
        		carS = 0;
        		pointGas.visible = false;
        		currentFull = 100;
        		currentCheckPoint += 1;
        	}
        }
        
        
        
        
        // ЗАПУСК ИГРЫ!!! 
        this.pauseTime = 0;
        this.inPause   = false;
        var startTime = new Date();
        setTimeout(function () {
        	light1.visible = true;
        	setTimeout(function () {
        		light2.visible = true;
        		setTimeout(function () {
        			light3.visible = true;
        			setTimeout(function () {
        				light4.visible = true;
        				// Запускаем Таймер
        				startTime = new Date();
        				setIntervalG(function () {
        					if (this.inPause == false) {
        						var time = new Date() - startTime - this.pauseTime;
        						var minute = Math.floor(time/(60*1000));
        						var second = Math.floor((time - minute*(60*1000))/1000);
        						var msecond = time - minute*(60*1000) - second*1000;
        						timerSec.setString(leadZero(minute, 2) + ':' + leadZero(second, 2) + ':' + leadZero(msecond, 3));
        					}
        				}.bind(this), 150);

        				//this.result(-2);

        			}.bind(this), Math.random()*5000);
        		}.bind(this), 500);
        	}.bind(this), 500);
        }.bind(this), 2000);	


        // Запуск физики
        this.scheduleUpdate();
	},
	update: function (dt) {
		if (this.world !== null) {
			this.world.step(dt);  
		}	
	},
	result: function (time) {
		this.unscheduleUpdate();
		app.renderMenu(this, this.menuResult, true);

		var title = '';
		var line1 = '';
		var line2 = '';
		switch (time) {
		case -1: {
			title = 'Фальстарт!';
			line1 = 'Вы были дисквалифицированы.';
			line2 = 'Сосредоточьтесь и попробуйте еще раз или пройдите другие тесты.';
			break;
		}
		case -2: {
			title = 'Увы!';
			line1 = 'Вы сошли с трассы или не успели заправиться.';
			line2 = 'Сосредоточьтесь и попробуйте еще раз или пройдите другие тесты.';  
            break;
          }
          default: {
        	var timeStr = '';
        	if (time > 0) {
        	  timeStr = '00:' + leadZero(Math.floor(time/1000), 2) + ':' + leadZero(time -  Math.floor(time/1000)*1000, 3);
        	  var line = new cc.LabelTTF(
        			  timeStr,
     				 'res/fonts/nissanagmed.ttf',
     				 90
     			   );
     	      line.setPosition(app.localX(1536), app.localY(999));
     	      line.setAnchorPoint(0.5, 0.5);
     	      line.setColor(cc.color(149, 149, 149, 255));
     	      this.menu.addChild(line);
        	} 
  			title = 'Финиш!';
		  	line1 = 'Возможно, вы сможете пройти ее еще быстрее!';
		  	line2 = 'Попробуйте улучшить свой результат или пройдите другие тесты.';  
            break;
          }
       }
	   var line = new cc.LabelTTF(
		 title,
		 'res/fonts/nissanagmed.ttf',
		 56
	   );
	   line.setPosition(app.localX(1536), app.localY(1119));
	   line.setAnchorPoint(0.5, 0.5);
	   line.setColor(cc.color(198, 22, 51, 255));
	   this.menu.addChild(line);
	   
	   var line = new cc.LabelTTF(
				 line1,
				 'res/fonts/nissanagmed.ttf',
				 38
			   );
	   line.setPosition(app.localX(1536), app.localY(885));
	   line.setAnchorPoint(0.5, 0.5);
	   line.setColor(cc.color(0, 0, 0, 255));
	   this.menu.addChild(line);
	   
	   var line = new cc.LabelTTF(
				 line2,
				 'res/fonts/nissanagmed.ttf',
				 38
			   );
	   line.setPosition(app.localX(1536), app.localY(834));
	   line.setAnchorPoint(0.5, 0.5);
	   line.setColor(cc.color(0, 0, 0, 255));
	   this.menu.addChild(line);

	  
	}
	
});


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
			result.angle = (-1)*(a);

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
