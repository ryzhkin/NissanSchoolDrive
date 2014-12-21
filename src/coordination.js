var Coordination = cc.Layer.extend({
	ctor: function () {
	  this._super();
	},
	menuIntro: {
		back: assets.coordinationIntroBack,
		areas: [
		        {
		        	x: 3072/2 + 508,
		        	y: 3072/2 - 954 - 140,
		        	h: 140,
		        	w: 396,
		        	click: function () {
		        		app.coordination.game();  
		        	}	
		        }      
		        ]
	},
	menuGame: {
		back: assets.coordinationGameBack,
		areas: [
		        {
		        	x: 534,
		        	y: 698,
		        	h: 360,
	        w: 360,
	        click: function () {
	        	app.coordination.applyForce('left');
	        }	
		        },
		        {
		        	x: 2191,
		        	y: 698,
		        	h: 360,
		        	w: 360,
        	  click: function () {
        		  app.coordination.applyForce('right');
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
 	    		 app.coordination.pause();
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
	    		app.coordination.pauseLayer.removeFromParent(true);  
	    		app.coordination.scheduleUpdate();
	    		app.coordination.pauseTime += new Date() - app.coordination.startPause;
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
			    	  app.coordination.pauseLayer.removeFromParent(true);  
			    	  app.coordination.game();
			      }
			    }
	  ]
	},
	menuResult: {
		back: assets.coordinationResultBack,
		areas: [
		        {
		        	x: 1536 - 450,
		        	y: 1536 - 996 - 140,
		        	h: 140,
		        	w: 402,
		        	click: function () {
		        		app.coordination.game();
		        	} 	 
		        },
		        {
		        	x: 1536 + 54,
		        	y: 1536 - 996 - 140,
		        	h: 140,
		        	w: 402,
		        	click: function () {
		        		app.runStage(new Menu(), 3);
		        	} 	 
		        },
		        {
		        	x: 1536 -206,
		        	y: 1536 - 806 - 86,
		        	h: 86,
		        	w: 86,
		        	click: function () {
		        		app.share('fb', 'Я прошел игру "Координация" в Школе вождения Nissan!');
		        	}
		        },
		        {
		        	x: 1536 - 94,
		        	y: 1536 - 806 - 86,
		        	h: 86,
		        	w: 86,
		        	click: function () {
		        		app.share('vk', 'Я прошел игру "Координация" в Школе вождения Nissan!');
		        	}
		        },
		        {
	    	 x: 1536 +20,
	         y: 1536 - 806 - 86,
	         h: 86,
	         w: 86,
	         click: function () {
	           app.share('tw', 'Я прошел игру "Координация" в Школе вождения Nissan!');
	         }
	     },
	     {
	    	 x: 1536 +130,
	         y: 1536 - 806 - 86,
	         h: 86,
	         w: 86,
	         click: function () {
	           app.share('od', 'Я прошел игру "Координация" в Школе вождения Nissan!');
	         }
	     }
	  ]
	},
	init: function (options) {
	  app.coordination = this;
	  app.renderMenu(this, this.menuIntro, true);
	},
	world: null,
	pause: function () {
	  this.unscheduleUpdate();
	  this.startPause = new Date();
	  this.pauseLayer = new cc.Layer();
	  this.addChild(this.pauseLayer);
	  app.renderMenu(this.pauseLayer, this.menuPause, false);
	},
	game: function () {
	  cc.eventManager.removeAllListeners();
	  cc.sys.garbageCollect();
	  
	  app.renderMenu(this, this.menuGame, true);
	  
	  var scaleFactor = 1536/640;
	  
	  this.worldLayer = new cc.Layer();  
	  this.menu.addChild(this.worldLayer);	
	  this.world = new physicWorld(this.worldLayer, {
		gravity  : [0, -10], 
		//debug    : true
	  });
	  
	  
	  // Земля - нижняя грань
	  this.world.addObj({
		  type: this.world.objType.Static,
		  pos: {
			  x: app.localX(1536),
			  y: app.localY(37/2)
		  },
		  shape: {
			  box: [3072, 37]
		  }
	  });
	 
	  // Нижнее большое колесо
	  var bigWeel = this.world.addObj({
		  physic: {
			  density: 50.5,
			  friction: 0.200,
			  restitution: 0.2
		  },
		  pos: {
			  x: app.localX(1536),
			  y: app.localY(37 + (86)*scaleFactor)
		  },
		  shape: {
			  radius: 86*scaleFactor 
		  },
		  bitmap: 'res/coordination/low/wheel1.png',
		  bitmapOptions: {
			  scale  : scaleFactor
		  }
	  });
	
	  // Нижняя полка
	  var board = this.world.addObj({
		  physic: {density: 30.12,friction: 5.150},
		  pos: {
			  x: app.localX(1536),
			  y: app.localY(37 + (2*86 + 36/2 - 16)*scaleFactor)
		  },
		  shape: {
			  box: [380*scaleFactor, 5*scaleFactor]
		  },
		  bitmap: 'res/coordination/low/board1.png',
		  bitmapOptions: {
			scale      : scaleFactor,
			offsetRegY : 16
		  }
	  });
	  
	 
	  // Левая маленькая канистра
	  var jar1 = this.world.addObj({
		  physic: {density: 0.4, friction: 15},
		  pos: {
			  x: app.localX(1350),
			  y: app.localY(37 + (2*86 + 36/2 - 15 + 75/2)*scaleFactor)
		  },
		  shape: {
			  box: [35*scaleFactor, (78 - 5)*scaleFactor]
		  },
		  bitmap: 'res/coordination/low/small_jar.png',
		  bitmapOptions: {
			  scale      : scaleFactor,
			  offsetRegX : 17
		  }
	  });
	 
	  // Левая красная канистра
	  var jar2 = this.world.addObj({
		  physic: {density: 0.52, friction: 15},
		  pos: {
			  x: app.localX(1224),
			  y: app.localY(37 + (2*86 + 36/2 + 75/2 - 5)*scaleFactor)
		  },
		  shape: {
			  box: [66*scaleFactor, 93*scaleFactor]
		  },
		  bitmap: 'res/coordination/low/red_jar.png',
		  bitmapOptions: {
			scale      : scaleFactor
		  }
	  });
	  
	
	  // Маленькое колесо
	  this.world.addObj({
		  physic: {density: 0.52, friction: 15},
		  pos: {
			  x: app.localX(1536),
			  y: app.localY(37 + (2*86 + 36/2 - 16 + 55 + 2)*scaleFactor)
		  },
		  shape: {
			  radius: 55*scaleFactor
		  },
		  bitmap: 'res/coordination/low/wheel2.png',
		  bitmapOptions: {
			  scale      : scaleFactor
		  }
	  });
	  
	 
	  // Правая канистра
	  var jar3 = this.world.addObj({
		  physic: {density: 0.700009094, friction: 15},
		  pos: {
			  x: app.localX(1834),
			  y: app.localY(37 + (2*86 + 36/2 - 16 + 75/2 + 15)*scaleFactor)
		  },
		  shape: {
			  box: [71*scaleFactor, 101*scaleFactor]
		  },
		  bitmap: 'res/coordination/low/big_jar.png',
		  bitmapOptions: {
			  scale      : scaleFactor
		  }
	  });
	  
	  // Верхняя полка
	  this.world.addObj({
		  physic: {density: 0.52, friction: 15},
		  pos: {
			  x: app.localX(1536),
			  y: app.localY(37 + (2*86 + 36/2 - 16 + 2*55 + 7)*scaleFactor)
		  },
		  shape: {
			  box: [380*scaleFactor, 10*scaleFactor]
		  },
		  bitmap: 'res/coordination/low/board2.png',
		  bitmapOptions: {
			  scale      : scaleFactor,
			  offsetRegY : 16
		  }
	  });
	 
	  // Верхний - левый конус
	  this.world.addObj({
		  physic: {density: 0.2},
		  pos: {
			  x: app.localX(1224 + 33*scaleFactor/* - 66*scaleFactor*/),
			  y: app.localY(37 + (2*86 + 36/2 - 16 + 2*55 + 12)*scaleFactor)
		  },
		  shape: {
			  polygon: [66*scaleFactor, 0, 33*scaleFactor, 64*scaleFactor, 0, 0]
		  },
		  bitmap: 'res/coordination/low/left_cone.png',
		  bitmapOptions: {
			  scale      : scaleFactor,
			  offsetRegY : 64,
			  offsetRegX : 0
			  /*offsetRegX : 66*/
		  }
	  });
     
	  // Нижняя покрышка
	  this.world.addObj({
		  physic: {friction: 5, density: 0.425},
		  pos: {
			  x: app.localX(1536),
			  y: app.localY(37 + (2*86 + 36/2 - 16 + 2*55 + 2 + 73/2 + 11)*scaleFactor)
		  },
		  shape: {
			  box: [176*scaleFactor, (73)*scaleFactor]
		  },
		  bitmap: 'res/coordination/low/tire1.png',
		  bitmapOptions: {
			  scale      : scaleFactor
		  }
	  });
	 
	  // Флаг !!!
	  var flag = this.world.addObj({
		  physic: {friction: 2, density: 0.01},
		  pos: {
			  x: app.localX(1536 + 136/2*scaleFactor),
			  y: app.localY(37 + (2*86 + 36/2 - 16 + 2*55 + 2 + 73 + 2 + 65 + 117/2 + 18)*scaleFactor)
		  },
		  shape: {
			  box: [117*scaleFactor, 136*scaleFactor]
		  //polygon: [0, 0, 117*scaleFactor, 59*scaleFactor, 0, 118*scaleFactor]
		  },
		  bitmap: 'res/coordination/low/flag.png',
		  bitmapOptions: {
			  scale      : scaleFactor,
			  offsetRegX : 118/2,
			  offsetRegY : 117/2,
		  }
	  });
	  


	  // Верхняя покрышка
	  this.world.addObj({
		  physic: {friction: 5, density: 0.1},
		  pos: {
			  x: app.localX(1536 + (178/8)*scaleFactor),
			  y: app.localY(37 + (2*86 + 36/2 - 16 + 2*55 + 2 + 73 + 2 + 65/2 + 8)*scaleFactor)
		  },
		  shape: {
			  box: [178*scaleFactor, (79 - 15)*scaleFactor]
		  },
		  bitmap: 'res/coordination/low/tire2.png',
		  bitmapOptions: {
			  scale      : scaleFactor,
			  offsetRegY : 30,
		  }
	  });
	  
	  // Верхний - правый конус
	  this.world.addObj({
		  physic: {density: 0.02},
		  pos: {
			  x: app.localX(1870 + 33*scaleFactor /*- 66*scaleFactor*/),
			  y: app.localY(37 + (2*86 + 36/2 - 16 + 2*55 + 12)*scaleFactor)
		  },
		  shape: {
			  polygon: [66*scaleFactor, 0, 33*scaleFactor, 64*scaleFactor, 0, 0]
		  },
		  bitmap: 'res/coordination/low/left_cone.png',
		  bitmapOptions: {
			  scale      : scaleFactor,
			  offsetRegY : 64,
			  offsetRegX : 0
			  //offsetRegX : 66
		  }
	  });
	 //*/

	  // UI
	  var leftControl = new cc.Sprite('res/coordination/low/left_control.png');
	  leftControl.attr({
		  scale    : scaleFactor,
		  x        : app.localX(710),
		  y        : app.localY(878)
	  });
	  this.worldLayer.addChild(leftControl);
	  
	  var leftControl2 = new cc.Sprite('res/coordination/low/left_control2.png');
	  leftControl2.attr({
		  visible  : false,
		  scale    : scaleFactor,
		  x        : app.localX(710),
		  y        : app.localY(878)
	  });
	  this.worldLayer.addChild(leftControl2);

	  var rightControl = new cc.Sprite('res/coordination/low/right_control.png');
	  rightControl.attr({
		  scale    : scaleFactor,
		  x        : app.localX(2366),
		  y        : app.localY(878)
	  });
	  this.worldLayer.addChild(rightControl);
	  
	  var rightControl2 = new cc.Sprite('res/coordination/low/right_control2.png');
	  rightControl2.attr({
		  visible  : false,
		  scale    : scaleFactor,
		  x        : app.localX(2366),
		  y        : app.localY(878)
	  });
	  this.worldLayer.addChild(rightControl2);
	  
	  
	  // Пауза
	  var pause = new cc.Sprite('res/coordination/pause.png');
	  pause.attr({
		  x        : app.localX(1536),
		  y        : app.localY(1536 - 69/2)
	  });
	  this.worldLayer.addChild(pause);
	  
	  
	  
	  
	  /**
	   * Приложить силу к системе
	   * @param type - тип силы: left, right
	   */
	  this.applyForce = function (type, extraForce) {
		  var delta = 20;
		  if (type == 'left') {
			  //cc.log('LEFT !');
			  leftControl.visible = false;
			  leftControl2.visible = true;

			  rightControl.visible = true;
			  rightControl2.visible = false;

			  
			  
			  //board.body.applyImpulse(cp.v(0, 800000*scaleFactor), cp.v(board.body.getPos().x - ((380/2)*scaleFactor), board.body.getPos().y));

			  board.body.ApplyImpulse(
			    this.world.vector(0, ((typeof(extraForce) == 'number')?extraForce:(50*scaleFactor))), 
			    this.world.vector(board.body.GetPosition().x + ((380/2*scaleFactor)*(1/30)), board.body.GetPosition().y)
			  );
		  } else {
			  //cc.log('RIGHT !');
			  leftControl.visible = true;
			  leftControl2.visible = false;

			  rightControl.visible = false;
			  rightControl2.visible = true;
			  
			  //board.body.applyImpulse(cp.v(0, -800000*scaleFactor), cp.v(board.body.getPos().x + ((380/2)*scaleFactor), board.body.getPos().y));
			  
			  board.body.ApplyImpulse(
			    this.world.vector(0, ((typeof(extraForce) == 'number')?extraForce:(50*scaleFactor))), 
			    this.world.vector(board.body.GetPosition().x - ((380/2*scaleFactor)*(1/30)), board.body.GetPosition().y)
			  );
		  }
	  }

	  // Текущее значение аксилирометра
	  this.accelerometerX = 0;
	  // Уровень нейтрального положения
	  var zeroLevel = 0.07;
	
	  cc.eventManager.removeListeners(cc.EventListener.ACCELERATION);
	  cc.inputManager.setAccelerometerEnabled(false);
	  setTimeout(function () {
		  cc.inputManager.setAccelerometerEnabled(true);
		  cc.eventManager.addListener({
			  event: cc.EventListener.ACCELERATION,
			  callback: function(acc, event) {
				  //cc.log(acc.x);
				  //cc.log(acc.y);
				  //cc.log(acc.z);
				  //cc.log(acc.xy);


				  //cc.log('dir = ' + ((acc.x < 0)?'left':'right'));
				  
				  this.applyForce(((acc.x < 0)?'left':'right'), Math.abs(acc.x*10)*scaleFactor);
				  
				  // Реакция на изминения ориентации устройства
				  /*if (acc.x < -zeroLevel || acc.x > zeroLevel) {
					  cc.log(acc.x);
					  cc.log('dir = ' + ((acc.x < 0)?'left':'right'));  
					  this.applyForce(((acc.x < 0)?'left':'right'), Math.abs(acc.x*10)*scaleFactor);
				  }	else {
				      cc.log('zero level');
					  leftControl.visible = true;
					  rightControl.visible = true;  

					  leftControl2.visible = false;
					  rightControl2.visible = false;	  
				  } */
				  return true;
			  }.bind(this)
		  }, this); 
	  }.bind(this), 2000);//*/
	  
	  
	
	  
	  // Запуск игры
	  this.unscheduleUpdate();
	  setTimeout(function () {
		this.scheduleUpdate();
	  }.bind(this), 1000);
	  
	  
	  this.pauseTime = 0;
	  var startTime = new Date();
	  var resultTime = 0;
	  var stopGame = false;
	
	  var gameTimer = setIntervalG(function () {
	     

		  // Условие окончания игры
		  if (
				  (flag.body.GetPosition().y*this.world.BOX2D_METER_TO_PIXELS <  2*136*scaleFactor)
				  //(flag.body.GetPosition().y <  2*136*scaleFactor) 
		  ) {
			 cc.eventManager.removeListeners(cc.EventListener.ACCELERATION);
			 clearAllIntervals();
			 resultTime = new Date() - startTime - this.pauseTime;
			 setTimeout(function () {
			   this.unscheduleUpdate();   
               this.result(resultTime);
             }.bind(this), 5000);
			 
		  }
		  //cc.log('game');
	  }.bind(this), 1000/2);
	  
	  //*/
	},
	update: function (dt) {
	  if (this.world !== null) {
		this.world.step(dt);  
	  }	
	},
	result: function (time) {
		 cc.eventManager.removeAllListeners();
		 var title = '';
		 var line1 = '';
		 var line2 = '';
		 
		 if (time/1000 < 10) {
		   var title = 'Увы!';
		   var line1 = 'Вам пока не удалось удержать равновесие достаточно долго.';
		   var line2 = 'Попробуйте еще раз или проверьте себя на других играх.';	 
		 } else
		 if (time/1000 < 15) {
 	       var title = 'Неплохо!';
		   var line1 = 'Однако, вы еще можете улучшить результат!';
		   var line2 = 'Пройдите игру заново или проверьте себя на других тестах.';	 
	     } else {
           /*	       
           var title = 'Отличный результат!';
		   var line1 = 'С чувством равновесия у вас все в порядке,';
		   var line2 = 'а как насчет остальных навыков? Проверьте себя на других тестах.';
           */	     
    	   var title = 'Отличный результат!';
	       var line1 = 'С чувством равновесия у вас все в порядке.';
	       var line2 = '';		 
	    }
		 
		 

		 var timeStr = '00:' + leadZero(Math.floor(time/1000), 2) + ':' + leadZero(time -  Math.floor(time/1000)*1000, 3);
	     console.log('Stop Game = ' + timeStr);
	     
		 app.renderMenu(this, this.menuResult, true);
	    
	      var line = new cc.LabelTTF(
	    		  timeStr,
	    		  'res/fonts/nissanagmed.ttf',
				  90
		  );
	      line.setPosition(app.localX(1536), app.localY(980));
		  line.setAnchorPoint(0.5, 0.5);
		  line.setColor(cc.color(146, 146, 146, 255));
	      this.menu.addChild(line);
	      
	      
	      var line = new cc.LabelTTF(
	    		  title,
	    		  'res/fonts/nissanagmed.ttf',
				  56
		  );
	      line.setPosition(app.localX(1536), app.localY(1095));
		  line.setAnchorPoint(0.5, 0.5);
		  line.setColor(cc.color(198, 22, 51, 255));
	      this.menu.addChild(line);
	      
	      
	      var line = new cc.LabelTTF(
	    		  line1,
	    		  'res/fonts/nissanagmed.ttf',
				  38
		  );
	      line.setPosition(app.localX(1536), app.localY(828));
		  line.setAnchorPoint(0.5, 0.5);
		  line.setColor(cc.color(0, 0, 0, 255));
	      this.menu.addChild(line);
	      
	      var line = new cc.LabelTTF(
	    		  line2,
	    		  'res/fonts/nissanagmed.ttf',
				  38
		  );
	      line.setPosition(app.localX(1536), app.localY(879));
		  line.setAnchorPoint(0.5, 0.5);
		  line.setColor(cc.color(0, 0, 0, 255));
	      this.menu.addChild(line);
	      
	      
	      
	     
	      
	}
});