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
		back: assets.coordinationGameBack	
	},
	init: function (options) {
	  app.coordination = this;
	  app.renderMenu(this, this.menuIntro, true);
	},
	world: null,
	game: function () {
	  app.renderMenu(this, this.menuGame, true);
	  
	  var scaleFactor = 1536/640;
	  
	  this.worldLayer = new cc.Layer();  
	  this.addChild(this.worldLayer);	
	  this.world = new physicWorld(this.worldLayer, {
		debug    : true
	  });
	  
	  // Земля - нижняя грань
	  this.world.addObj({
		  type: this.world.objType.Static,
		  //type: this.world.objType.Dynamic,
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
			  y: app.localY(37 + (2*86 + 36/2 - 16 + 75/2)*scaleFactor)
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
			  y: app.localY(37 + (2*86 + 36/2 - 16 + 75/2)*scaleFactor + 28)
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
			  y: app.localY(37 + (2*86 + 36/2 - 16 + 75/2)*scaleFactor + 37)
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
			  y: app.localY(37 + (2*86 + 36/2 - 16 + 2*55 + 2)*scaleFactor)
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
			  x: app.localX(1224 + 33*scaleFactor),
			  y: app.localY(37 + (2*86 + 36/2 - 16 + 2*55 + 2)*scaleFactor + 10)
		  },
		  shape: {
			  polygon: [66*scaleFactor, 0, 33*scaleFactor, 64*scaleFactor, 0, 0]
		  },
		  bitmap: 'res/coordination/low/left_cone.png',
		  bitmapOptions: {
			  scale      : scaleFactor,
			  offsetRegY : 64,
			  offsetRegX : 0
		  }
	  });
		
	  // Нижняя покрышка
	  this.world.addObj({
		  physic: {friction: 5, density: 0.425},
		  pos: {
			  x: app.localX(1536),
			  y: app.localY(37 + (2*86 + 36/2 - 16 + 2*55 + 2 + 73/2 + 2)*scaleFactor + 10)
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
			  y: app.localY(37 + (2*86 + 36/2 - 16 + 2*55 + 2 + 73 + 2 + 65 + 117/2 + 10)*scaleFactor + 10)
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
			  y: app.localY(37 + (2*86 + 36/2 - 16 + 2*55 + 2 + 73 + 2 + 65/2)*scaleFactor + 10)
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
			  x: app.localX(1870 + 33*scaleFactor),
			  y: app.localY(37 + (2*86 + 36/2 - 16 + 2*55 + 2)*scaleFactor + 10)
		  },
		  shape: {
			  polygon: [66*scaleFactor, 0, 33*scaleFactor, 64*scaleFactor, 0, 0]
		  },
		  bitmap: 'res/coordination/low/left_cone.png',
		  bitmapOptions: {
			  scale      : scaleFactor,
			  offsetRegY : 64,
			  offsetRegX : 0
		  }
	  });
	  
	  this.scheduleUpdate();
	},
	update: function (dt) {
	  if (this.world !== null) {
		this.world.step(dt);  
	  }	
	}
});