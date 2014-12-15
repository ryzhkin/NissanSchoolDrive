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
	menuQuestions: {
	  back: assets.memoryQuestions	
	},
	init: function (options) {
      app.memory = this;
      app.renderMenu(this, this.menuIntro, true);
	},
	game: function (tracks) {
	  tracks.shuffle(true);
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
	  //app.drawPath(this.menu, app.preparePathPoints(track.path));
	 
	  
	  app.moveByPathConstant(app.preparePathPoints(track.path), car, 15, function () {
		 cc.log('Final !!!'); 
	  });
	  
	  // Таймер - Секунды
	  var timerSec = new cc.LabelTTF(
			  "00:05:000",
			  'res/fonts/nissanagmed.ttf',
			  85
	  );
	  timerSec.setPosition(app.localX(1536 - 1006), app.localY(1536 - 208));
	  timerSec.setAnchorPoint(0, 1);
	  timerSec.setColor(cc.color(255, 255, 255, 255));
	  this.menu.addChild(timerSec);
	  
	  
	  var startTime = new Date();
	  var gameTime  = 5030;
	  var timerID = setIntervalG(function () {
		  var delta = gameTime - (new Date() - startTime);

		  if (delta < 0) {
			  clearInterval(timerID);
			  
			  this.questions(track);
			  cc.log('End game !!!');
		  } else {
			timerSec.setString('00:' + leadZero(Math.floor(delta/1000), 2) + ':' + leadZero(delta -  Math.floor(delta/1000)*1000, 3));
		  }
	  }.bind(this), 10);
	    
	},
	questions: function (track) {
	  app.renderMenu(this, this.menuQuestions, true);	
	}
});