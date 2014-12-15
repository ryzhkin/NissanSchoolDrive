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
	  /*app.moveByPath(app.preparePathPoints(track.path), car, 5, function () {
		  cc.log('Final !!!');  
	  });*/
	  
	  var path       = app.preparePathPoints(track.path);
	  var pathTime   = 15;
	  var pathLength = getPathPointsDistance(path);
	  var pathSpeed  = pathLength/pathTime;
	  
	  cc.log('pathTime = ' + pathTime);
	  cc.log('pathLength = ' + pathLength);
	  cc.log('pathSpeed = ' + pathSpeed);
	  
	  //var alpha = 180 + 90 - (180/Math.PI)*Math.atan(Math.abs(car.getPosition().y - path[0].y)/Math.abs(car.getPosition().x - path[0].x));
	  //cc.log('alpha = ' + alpha);
	  
	  //cc.v2fnormalize(p)
	  
	  alg = {
	    v2f: function (x, y) {
	      return {
	    	x: x,
	    	y: y
	      }	
	    },
	    v2fLength: function (v) {
	      return (Math.pow((Math.pow(v.x, 2) +  Math.pow(v.y, 2)), 0.5));	
	    },	
	    v2fMult: function (p, floatVar) {
	      return {
	    	x: p.x*floatVar,
	    	y: p.y*floatVar
	      } 
        },
	    v2fNormalize : function (v) {
	      return this.v2fMult(v, 1.0 / this.v2fLength(v));	
	    },
	    v2fMultVectors: function (v1, v2) {
	      return (v1.x*v2.x + v1.y*v2.y);
	    },
	    v2fAngelVectors: function (v1, v2) {
	      v1 = this.v2fNormalize(v1);
	      v2 = this.v2fNormalize(v2);
	      return (180/Math.PI*Math.acos(this.v2fMultVectors(v1, v2)));
	    }
	  }
	  
	  
	  var moves = [];
	  var prevLocation = car.getPosition();
	  var prevAlpha    = car.rotation;
	  var currentAlpha = car.rotation;
	  
	  // Нормальный вектор оси Y
	  var v0 = alg.v2fNormalize(alg.v2f(0, 1)); 
	  
	  // Нормализованный вектор текущего отрезка маршрута
	  var v = alg.v2fNormalize(alg.v2f(prevLocation.x - path[0].x, prevLocation.y - path[0].y));
	  
	  cc.log(alg.v2fAngelVectors(v0, v));
	  
	  
	  for (var i = 0; i < path.length; i++) {
		var d = getDistance(prevLocation.x, prevLocation.y, path[i].x, path[i].y);
		var t = d/pathSpeed;
		
		// Нормализованный вектор текущего отрезка маршрута
		var v = alg.v2fNormalize(alg.v2f(prevLocation.x - path[i].x, prevLocation.y - path[i].y)); 
		
		/*var alpha  =  90 - (180/Math.PI)*Math.atan((prevLocation.y - path[i].y)/(prevLocation.x - path[i].x));
		var dalpha =  prevAlpha - alpha;
		
		currentAlpha += dalpha;  
		prevAlpha = currentAlpha;
		
		//cc.log('alpha = ' + alpha);
		cc.log('currentAlpha = ' + currentAlpha);*/
		
		moves.push(cc.moveTo(t, path[i]));
		prevLocation = path[i];
	  }
	  
	  //car.runAction(new cc.Sequence(moves)); 
	  
	  /*pedal.runAction(new cc.Sequence([
	                                   new cc.ScaleTo(0.1, 0.9, 0.9),
	                                   new cc.ScaleTo(0.1, 1, 1)
	                                   ]
	  ));*/
	  
	    
	}
});