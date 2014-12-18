var Vision = cc.Layer.extend({
	ctor: function () {
		this._super();
	},
	menuIntro: {
		back: assets.visionIntroBack,
		areas: [
		        {
		        	x: 1536 + 506,
		        	y: 1536 - 1270 - 140,
		        	h: 140,
		        	w: 396,
		        	click: function () {
		        		app.vision.game();  
		        	}	
		        }      
		        ]
	},
	menuGame: {
		areas: [
		        {
		        	x: 1536 - 698,
		        	y: 1536 - 1306 - 185,
		        	h: 185,
		        	w: 185,
		        	click: function () {
		        		cc.log('pointRepair');
		        		app.vision.pointRepairCount++;
		        	}
		        },
		        {
		        	x: 1536 + 480,
		        	y: 1536 - 1306 - 185,
		        	h: 185,
		        	w: 185,
		        	click: function () {
		        		cc.log('pointGas');
		        		app.vision.pointGasCount++;
		        	}
		        },
		        {
		        	x: 1536 + 724,
		        	y: 1536 - 1306 - 185,
		        	h: 185,
		        	w: 185,
		        	click: function () {
		        		cc.log('pointFood');	 
		        		app.vision.pointFoodCount++;
		        	}
		        },
		        {
		        	x: 1536 - 944,
		        	y: 1536 - 1306 - 185,
		        	h: 185,
		        	w: 185,
		        	click: function () {
		        		cc.log('pointFlag');	
		        		app.vision.pointFlagCount++;
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
		 	    		 app.vision.pause();
		 	    	 }
		 	     }
		        ]	
	},
	menuResult: {
		back: assets.visionResultBack,
		areas: [
		        {
		        	x: 1536 - 450,
		        	y: 1536 - 1072 - 140,
		        	h: 140,
		        	w: 402,
		        	click: function () {
		        		app.vision.pointFlagCount   = 0;
		        		app.vision.pointRepairCount = 0;
		        		app.vision.pointGasCount    = 0;
		        		app.vision.pointFoodCount   = 0;	
		        		app.vision.game();
		        	} 	 
		        },
		        {
		        	x: 1536 + 54,
		        	y: 1536 - 1072 - 140,
		        	h: 140,
		        	w: 402,
		        	click: function () {
		        		app.runStage(new Menu(), 3);
		        	} 	 
		        },
		        {
		        	x: 1536 -206,
		        	y: 1536 - 882 - 86,
		        	h: 86,
		        	w: 86,
		        	click: function () {
		        		app.share('fb', 'Я прошел игру "Периферическое зрение" в Школе вождения Nissan!');
		        	}
		        },
		        {
		        	x: 1536 - 94,
		        	y: 1536 - 882 - 86,
		        	h: 86,
		        	w: 86,
		        	click: function () {
		        		app.share('vk', 'Я прошел игру "Периферическое зрение" в Школе вождения Nissan!');
		        	}
		        },
		        {
	    	 x: 1536 +20,
	         y: 1536 - 882 - 86,
	         h: 86,
	         w: 86,
	         click: function () {
	        	 app.share('tw', 'Я прошел игру "Периферическое зрение" в Школе вождения Nissan!');
	         }
		        },
		        {
		        	x: 1536 +130,
		        	y: 1536 - 882 - 86,
		        	h: 86,
		        	w: 86,
		        	click: function () {
		        		app.share('od', 'Я прошел игру "Периферическое зрение" в Школе вождения Nissan!');
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
	    		app.vision.pauseLayer.removeFromParent(true);  
	    		app.vision.inPause = false;
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
			    	  app.vision.pauseLayer.removeFromParent(true);  
			    	  app.vision.game();
			      }
			    }
	  ]
	},
	init: function (options) {
	  app.vision = this;
	  app.renderMenu(this, this.menuIntro, true);
	},
	inPause: false,
	
	pause: function () {
	  this.inPause = true;	
	  this.pauseLayer = new cc.Layer();
	  this.addChild(this.pauseLayer);
	  app.renderMenu(this.pauseLayer, this.menuPause, false);
	},
	
	
	
	
	// Анимирование серии картинок
	animateSprite: function (sprite, speed, reverce) {
		if (typeof(sprite.animateTimer) !== 'undefined' && sprite.animateTimer !== null) {
			clearInterval(sprite.animateTimer);
		}
		sprite.animateTimer = setIntervalG(function () {
			if (this.inPause == false) {

				if (reverce == true) {
					if (typeof(sprite.index) == 'undefined') {
						sprite.index = sprite.maxIndex - 1;
					}
					if (sprite.index < 1) {
						sprite.index = sprite.maxIndex;
					}
					sprite.setTexture(sprite.baseName + sprite.index + ".png");
					sprite.index--;
				} else {
					if (typeof(sprite.index) == 'undefined') {
						sprite.index = 2;
					}
					if (sprite.index > sprite.maxIndex) {
						sprite.index = 1;
					}
					sprite.setTexture(sprite.baseName + sprite.index + ".png");
					sprite.index++;
				}

			}
		}.bind(this), speed);
	},
     
	trees: [ 
	        {
	        	img: "res/vision/trees/r_tree3.png",
	        	sx: 1320,
	        	sy: 800 + 420, 
	        	sscale: 0.1,
	        	
	        	ex: -300,
	        	ey: 950 + 400, 
	        	escale: 1,
	        	speed: 2000
	        },
	        {
	        	img: "res/vision/trees/r_tree2.png",
	        	sx: 1320,
	        	sy: 800  + 420, 
	        	sscale: 0.1,
	        	ex: -300,
	        	ey: 1200  + 400, 
	        	escale: 1.5,
	        	speed: 2000
	        },
	        {
	        	img: "res/vision/trees/r_tree1.png",
	        	sx: 1320,
	        	sy: 800  + 420, 
	        	sscale: 0.2,
	        	ex: -300,
	        	ey: 950  + 400, 
	        	escale: 1.5,
	        	speed: 2000
	        },
	        
	        {
	        	img: "res/vision/trees/l_tree4.png",
	        	sx: 1638,
	        	sy: 800  + 420,
	        	sscale: 0.02,
	        	ex: 2900,
	        	ey: 1150  + 400,
	        	escale: 0.5,
	        	speed: 1500
	        },
	        {
	            img: "res/vision/trees/l_tree3.png",
	            sx: 1638,
	            sy: 800  + 420,
	            sscale: 0.02,
	            ex: 2900,
	            ey: 750  + 400,
	            escale: 1.5,
	            speed: 3000
	        },
	        {
	        	img: "res/vision/trees/l_tree1.png",
	        	sx: 1638,
	        	sy: 800  + 420,
	        	sscale: 0.02,
	        	ex: 2900,
	        	ey: 750  + 400,
	        	escale: 1.5,
	        	speed: 2000
	        },
	        {
	        	img: "res/vision/trees/l_tree2.png",
	        	sx: 1638,
	        	sy: 800  + 420,
	        	sscale: 0.02,
	        	ex: 2900,
	        	ey: 980  + 400,
	        	escale: 1.5,
	        	speed: 3000
	        }//*/
	      ],

	points: [
	              {
	            	   type   : 0,
	            	   img    : "res/vision/points/pointFlag.png",
	            	   sx     : 605,
	            	   sy     : 1110,
	            	   sscale : 0.35,
	            	   
	            	   ex     : 720,
	            	   ey     : 1110,
	            	   escale : 0.1,
	            	   
	                   speed  : 2000
	                 },
	                
	                 {
	                	 type   : 1,
	                	 img    : "res/vision/points/pointRepair.png",
	                	 sx     : 605,
	                	 sy     : 1110,
	                	 sscale : 0.35,

	                	 ex     : 720,
	                	 ey     : 1110,
	                	 escale : 0.1,
	                	 speed  : 2000
	                 },
	                 {
	                	 type   : 2,
	                	 img    : "res/vision/points/pointGas.png",
	                	 sx     : 605,
	                	 sy     : 1110,
	                	 sscale : 0.35,

	                	 ex     : 720,
	                	 ey     : 1110,
	                	 escale : 0.1,
	                	 speed  : 2000
	                 },
	                 {
	                	 type   : 3,
	                	 img    : "res/vision/points/pointFood.png",
	                	 sx     : 605,
	                	 sy     : 1110,
	                	 sscale : 0.35,

	                	 ex     : 720,
	                	 ey     : 1110,
	                	 escale : 0.1,
	                	 speed  : 2000
	                 },//*/


	                 {
	                	 type   : 0,
	                	 img    : "res/vision/points/pointFlag.png",
	                	 sx     : 2370,
	                	 sy     : 1110,
	                	 sscale : 0.35,

	                	 ex     : 2310,
	                	 ey     : 1105,
	                	 escale : 0.1,

	                	 speed  : 2000
	                 },
	                 {
	                	 type   : 1,
	                	 img    : "res/vision/points/pointRepair.png",
	                	 sx     : 2370,
	                	 sy     : 1110,
	                	 sscale : 0.35,

	                	 ex     : 2310,
	                	 ey     : 1105,
	                	 escale : 0.1,
	                	 speed  : 2000
	                 },
	                  {
	                	 type   : 2,
	                	 img    : "res/vision/points/pointGas.png",
	                	 sx     : 2370,
	                	 sy     : 1110,
	                	 sscale : 0.35,

	                	 ex     : 2310,
	                	 ey     : 1105,
	                	 escale : 0.1,
	                	 speed  : 2000
	                  },
	                  {
	                	  type   : 3,
	                	  img    : "res/vision/points/pointFood.png",
	                	  sx     : 2370,
	                	  sy     : 1110,
	                	  sscale : 0.35,

	                	  ex     : 2310,
	                	  ey     : 1105,
	                	  escale : 0.1,
	                	  speed  : 2000
	                  }//*/
	                  ],

	                  
	                  
	                  
	                  
	// Загрузка массива спрайтов с начальными параметрами
	loadSprites: function (items, visible) {
		for (var i = 0; i < items.length; i++) {
			items[i].sprite = new cc.Sprite(items[i].img);
	                		  items[i].sprite.attr({
	                			  visible  : ((typeof(visible) == 'undefined')?false:visible),
	                			  scale    : ((typeof(items[i].sscale) == 'undefined')?1:items[i].sscale)*(1536/640),
	                			  x        : app.localX(items[i].sx),
	                			  y        : app.localY(items[i].sy),
	                			  anchorX  : 0,
	                			  anchorY  : 1
	                		  });
	                		  this.menu.addChild(items[i].sprite);
	                	  }
	 },
	
	 // Запуск спрайта по траектории
	runSprite: function (items, index) {
		if ((typeof(items[index].sprite) !== 'undefined') && (typeof(items[index].ex) !== 'undefined') && items[index].sprite.visible == false) {
			if (this.inPause == false) {
				if (typeof(items[index].count) == 'undefined') items[index].count = 0;
				items[index].count++;
				 items[index].sprite.attr({
					 visible  : true,
					 scale    : ((typeof(items[index].sscale) == 'undefined')?1:items[index].sscale)*(1536/640),
					 x        : app.localX(items[index].sx),
					 y        : app.localY(items[index].sy),
					 anchorX  : 0,
					 anchorY  : 1
				 });
				 var speed = items[index].speed/1000;
				 items[index].sprite.runAction(
						 new cc.MoveTo(
								 speed,
								 cc.p(app.localX(items[index].ex), app.localY(items[index].ey))
						 )
				 );

				 items[index].sprite.runAction(
						 new cc.Sequence([
						                  new cc.ScaleTo(
						                		  speed,
						                		  items[index].escale*(1536/640)
						                  ),
						                  cc.callFunc(function () {
						                	  this.sprite.visible  = false;
				                  }.bind(items[index]))
				                  ])
				 );
				 
	/*			 items[index].sprite.runAction(
						  new cc.ScaleTo(
						    speed,
						    items[index].escale*(1536/640)
						  )
				 );
	*/			 
			 }
		 }
	 },
	
	// Запуск спрайтов случайно
	runRandomSprite: function (items, interval) {
	      var index = getRandomInt(0, items.length - 1);
	      this.runSprite(items, index);
	      if (typeof(items.runTimer) == 'undefined') {
	          items.runTimer = setIntervalG(function () {this.runRandomSprite(items, interval);}.bind(this), ((typeof(interval) == 'undefined')?500:interval));
	      }
	},

	// Остановить спрайты
	stopSprites: function (items) {
	    if (typeof(items.runTimer) !== 'undefined') {
	      clearInterval(items.runTimer);
	      items.runTimer = undefined;
	    }
	},

	
	pointFlagCount   : 0,
	pointRepairCount : 0,
	pointGasCount    : 0,
	pointFoodCount   : 0,
	game: function () {
	  // Иницируем начальные значения перед новой игрой	
	  this.inPause = false;
	  this.pointFlagCount   = 0;
	  this.pointRepairCount = 0;
	  this.pointGasCount    = 0;
	  this.pointFoodCount   = 0;	
	  
	  var trees  = this.trees.slice(0);
      var points = this.points.slice(0);
      for (var i = 0; i < points.length; i++) {
          points[i].count = 0;
          points[i].speed = 2000;
          if (typeof(points[i].sprite) !== 'undefined') delete points[i].sprite;
       }
	  
	  // ----------------------------------------------
	  var scaleFactor = 1536/640;
	  
	  
	  app.renderMenu(this, this.menuGame, true);
	  
	  var back = new cc.Sprite(assets.visionGameBack);
	  back.attr({
		scale: 1,
		x: app.localX(0),
		y: app.localY(0), 
		anchorX: 0,
		anchorY: 0
	  });
	  this.menu.addChild(back);
	  
	  // Дорожная разметка
	  var roadBand = new cc.Sprite('res/vision/band/s1.png');
	  roadBand.attr({
		 scale : scaleFactor,
		 x     : app.localX(1536 -30 ),
		 y     : app.localY(410), 
		 anchorX: 0.5,
		 anchorY: 0
	  });
	  this.menu.addChild(roadBand);
	  roadBand.maxIndex = 16;
	  roadBand.baseName = 'res/vision/band/s';
	  this.animateSprite(roadBand, 20); 
	 
	  // Загружаем деревья
      this.loadSprites(trees, false);
      
      // Запускаем деревья за окнами
      //this.runSprite(trees, 0);
      this.runRandomSprite(trees, 3000);
      
      // Кабина Nissan
      var cabina = new cc.Sprite('res/vision/cabinaX2.png');
      cabina.attr({
 		 scale : 2,
 		 x     : app.localX(1536),
 		 y     : app.localY(0), 
 		 anchorX: 0.5,
 		 anchorY: 0
 	  });
 	  this.menu.addChild(cabina);
 	  
 	  
 	  
 	  
 	  
 	  // Отраженная пунктирная разметка
      var reflectionBand = new cc.Sprite('res/vision/band/m19.png');
      reflectionBand.attr({
          scale   : 1.7,
          x       : app.localX(1536 - 10),
          y       : app.localY(1536 - 275),
          anchorX : 0.5,
          anchorY : 0
      });
      reflectionBand.maxIndex = 19;
      reflectionBand.baseName = 'res/vision/band/m';
      this.menu.addChild(reflectionBand);
      this.animateSprite(reflectionBand, 30, true);
 	  
      // Загружаем знаки
      this.loadSprites(points, false);
      
      
      setTimeout(function () {
          if (this.inPause == false) {
          points.foreach(function (point) {
              point.speed = 800;
          });
          setTimeout(function () {
              points.foreach(function (point) {
                  point.speed = 600;
              });
          }.bind(this), 4000);
          }
      }.bind(this), 5000);
      

      // Запускаем знаки
      //this.runSprite(points, 0);
      this.runRandomSprite(points, 1500); 	  
      
      // Таймер
      var second = 20;
     
      
      // Таймер - Основа
      var timeLine1 = leadZero(Math.floor(second/(60*60)), 2) + ":" + leadZero(Math.floor(second/60), 2) + ":";
      var timer = new cc.LabelTTF(
    		  timeLine1,
    		  'res/fonts/nissanagmed.ttf',
			  80
	  );
      timer.setPosition(app.localX(1340), app.localY(60));
      timer.setAnchorPoint(0, 0);
      timer.setColor(cc.color(help.hexToRgb('#141414').r, help.hexToRgb('#141414').g, help.hexToRgb('#141414').b, 255));
      this.menu.addChild(timer);

      // Таймер - Секунды
      var timeLine2 = leadZero(second, 2);
      var timerSec = new cc.LabelTTF(
    		  timeLine2,
    		  'res/fonts/nissanagmed.ttf',
			  80
	  );
      timerSec.setPosition(app.localX(1560), app.localY(60));
      timerSec.setAnchorPoint(0, 0);
      timerSec.setColor(cc.color(help.hexToRgb('#c71444').r, help.hexToRgb('#c71444').g, help.hexToRgb('#c71444').b, 255));
      this.menu.addChild(timerSec);
      
     
      var b = new cc.Sprite('res/vision/buttons/repair.png');
      b.attr({
    	  x: app.localX(1536 -698),
    	  y: app.localY(1536 -1306),
    	  anchorX : 0,
          anchorY : 1  
      });
      this.menu.addChild(b);
      var b = new cc.Sprite('res/vision/buttons/gas.png');
      b.attr({
    	  x: app.localX(1536  + 480),
    	  y: app.localY(1536 -1306),
    	  anchorX : 0,
          anchorY : 1  
      });
      this.menu.addChild(b);
      var b = new cc.Sprite('res/vision/buttons/food.png');
      b.attr({
    	  x: app.localX(1536  + 724),
    	  y: app.localY(1536 -1306),
    	  anchorX : 0,
          anchorY : 1  
      });
      this.menu.addChild(b);
      var b = new cc.Sprite('res/vision/buttons/flag.png');
      b.attr({
    	  x: app.localX(1536  -944),
    	  y: app.localY(1536 -1306),
    	  anchorX : 0,
          anchorY : 1  
      });
      this.menu.addChild(b);
      
      
     // Пауза
	  var pause = new cc.Sprite('res/coordination/pause.png');
	  pause.attr({
		  x        : app.localX(1536),
		  y        : app.localY(1536 - 69/2)
	  });
	  this.menu.addChild(pause);
      
      
      
      
      // Запускаем Таймер
      var timerID = setIntervalG(function () {
          if (this.inPause == false) {
          second--;
          if (second < 0) {
             clearInterval(timerID);
             var counts = [0, 0, 0, 0];
             points.foreach(function (point) {
               counts[point.type] += (typeof(point.count) == 'number')?point.count:0;
             });
             this.stopSprites(trees);
             trees = null;
             points = null;
             cc.log('stop game');
             this.result(counts, [this.pointFlagCount, this.pointRepairCount, this.pointGasCount, this.pointFoodCount]);
          } else {
              if (second < 1) {
                this.stopSprites(points);
              }
              timer.setString(leadZero(Math.floor(second/(60*60)), 2) + ":" + leadZero(Math.floor(second/60), 2) + ":");
              timerSec.setString(leadZero(second, 2));
          }
          }
      }.bind(this), 1000);
	  
	  
	},

	result: function (counts, userCounts) {
	  cc.log(counts);
	  cc.log(userCounts);
	  var percent = 0;
	  for (var i = 0; i < counts.length; i++) {
		  if (counts[i] > 0) {
			  if (userCounts[i] !== 0) {
				  if (userCounts[i] <= counts[i]) {
					  percent += (100/counts.length)*(userCounts[i]/counts[i]);
				  }
			  }
		  }
	  }
	  if (percent == NaN) percent = 0;
	  percent = Math.round(percent*10)/10;
	  cc.log(percent + '%');
	  
	  app.renderMenu(this, this.menuResult, true);
	  
	  var line = new cc.LabelTTF(
			  percent + '%',
			  'res/fonts/nissanagmed.ttf',
			  120
	  );
	  line.setPosition(app.localX(1728), app.localY(1000));
	  line.setAnchorPoint(0, 1);
	  line.setColor(cc.color(0, 0, 0, 255));
	  this.menu.addChild(line);
	  
	  var line = new cc.LabelTTF(
			  'Отмечено флагов ' + userCounts[0] + '/' + counts[0],
			  'res/fonts/nissanagmed.ttf',
			  38
	  );
	  line.setPosition(app.localX(1038), app.localY(1096));
	  line.setAnchorPoint(0, 1);
	  line.setColor(cc.color(198, 22, 51, 255));
	  this.menu.addChild(line);
	  
	  var line = new cc.LabelTTF(
			  'Отмечено пит-стопов ' + userCounts[1] + '/' + counts[1],
			  'res/fonts/nissanagmed.ttf',
			  38
	  );
	  line.setPosition(app.localX(1038), app.localY(1096 - 60));
	  line.setAnchorPoint(0, 1);
	  line.setColor(cc.color(198, 22, 51, 255));
	  this.menu.addChild(line);
	  
	  var line = new cc.LabelTTF(
			  'Отмечено кафе ' + userCounts[2] + '/' + counts[2],
			  'res/fonts/nissanagmed.ttf',
			  38
	  );
	  line.setPosition(app.localX(1038), app.localY(1096 - 60- 60));
	  line.setAnchorPoint(0, 1);
	  line.setColor(cc.color(198, 22, 51, 255));
	  this.menu.addChild(line);

	  var line = new cc.LabelTTF(
			  'Отмечено заправок ' + userCounts[3] + '/' + counts[3],
			  'res/fonts/nissanagmed.ttf',
			  38
	  );
	  line.setPosition(app.localX(1038), app.localY(1096 - 60- 60- 60));
	  line.setAnchorPoint(0, 1);
	  line.setColor(cc.color(198, 22, 51, 255));
	  this.menu.addChild(line);
	  
	  var line1 = '';
	  var line2 = '';
	 
	  if (percent <= 35) {
	    line1 = 'Вы немного рассеяны.';
	    line2 = 'Сосредоточьтесь и попробуйте снова.';
	  } else {
		  if (percent <= 65) {
			  line1 = 'Хорошая реакция, но вы еще можете улучшить результат! ';
			  line2 = 'Пройдите игру заново или проверьте себя на других тестах.';
		  } else {
			  line1 = 'Отличный результат! Реакция, достойная гонщика! ';
			  line2 = 'Проверьте себя на других тестах.';
		  }
	  }
	  
	  var line = new cc.LabelTTF(
			  line1,
			  'res/fonts/nissanagmed.ttf',
			  38
	  );
	  line.setPosition(app.localX(1536), app.localY(792));
	  line.setAnchorPoint(0.5, 0.5);
	  line.setColor(cc.color(0, 0, 0, 255));
	  this.menu.addChild(line);
	  
	  var line = new cc.LabelTTF(
			  line2,
			  'res/fonts/nissanagmed.ttf',
			  38
	  );
	  line.setPosition(app.localX(1536), app.localY(746));
	  line.setAnchorPoint(0.5, 0.5);
	  line.setColor(cc.color(0, 0, 0, 255));
	  this.menu.addChild(line);

	  
	  
	  this.pointFlagCount   = 0;
	  this.pointFoodCount   = 0;
	  this.pointGasCount    = 0;
	  this.pointRepairCount = 0;
	}		 
});



