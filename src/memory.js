var Memory = cc.Layer.extend({
	ctor: function () {
		this._super();
	},
	menuIntro: {
		back: assets.memoryIntroBack,
		areas: [
		        {
		        	x: 3072/2 + 530,
	    	y: 3072/2 - 1031 - 140,
	    	h: 140,
	    	w: 396,
	    	click: function () {
	    		cc.loader.loadJson("res/data/memory.json", function(error, data) {
	    			app.memory.game(data);  
	    		});
	    	}	
	    }      
	  ]
	},
	menuGame: {
	  back: 'res/memory/memory-track1.jpg'	
	},
	init: function (options) {
      app.memory = this;
      app.renderMenu(this, this.menuIntro, true);
	},
	game: function (tracks) {
	  //tracks.shuffle(true);
	  var track = tracks[0];
	  this.menuGame.back = 'res/memory/' + track.track; 	
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
	  app.drawPath(this.menu, app.preparePathPoints(track.path));
	 
	  
	  app.moveByPathConstant(app.preparePathPoints(track.path), car, 15, function () {
		 cc.log('Final !!!'); 
	  });
	  
	    
	}
});