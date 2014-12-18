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
		
	},
	init: function (options) {
	  app.vision = this;
	  app.renderMenu(this, this.menuIntro, true);
	},
	inPause: false,
	
	
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
	  
	  // ----------------------------------------------
	  var scaleFactor = 1536/640;
	  
	  app.renderMenu(this, this.menuGame, true);
	  var back = new cc.Sprite(assets.visionGameBackX2);
	  back.attr({
		scale: 2,
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

      // Запускаем знаки
      //this.runSprite(points, 0);
      this.runRandomSprite(points, 1500); 	  
      
    

	  
	  
	}
});