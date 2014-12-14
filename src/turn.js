var Turn = cc.Layer.extend({
	ctor: function () {
		this._super();
	},
	menuIntro: {
	  back: assets.turnIntroBack,
	  areas: [
	    {
	    	x: 1536 - 485,
	    	y: 1536 - 1174 - 306,
	    	w: 306,
	    	h: 306,
	    	click: function () {
	    	  app.turn.choose();
	    	}
	    },
	    {
	    	x: 1536 - 135,
	    	y: 1536 - 1174 - 306,
	    	w: 306,
	    	h: 306,
	    	click: function () {
	    		app.runStage(new Theory(), {
	    			back: assets.theoryTurnBack,
	    			url: 'res/data/theory_turn.html',   
	    			onBack: function () {
	    				app.runStage(new Turn());
	    			}  
	    		});
	    	}
	    },
	    {
	    	x: 1536 + 215,
	    	y: 1536 - 1174 - 306,
	    	w: 306,
	    	h: 306,
	    	click: function () {
	    	  app.runStage(new Menu(), 2);
	    	}
	    }
	  ]
	},
	menuChoose: {
	  back: assets.turnChooseBack,
	  areas: [
	    {
	    	x: 1536 - 850,
	    	y: 1536 - 574 - 365,
	    	w: 365,
	    	h: 365,
	    	click: function () {
	    	  cc.loader.loadJson("res/data/turn.json", function(error, data) {
	    		app.turn.game(1, data[0]);  
	    	  });	
	    	}	
	    },
	    {
	    	x: 1536 - 416,
	    	y: 1536 - 574 - 365,
	    	w: 365,
	    	h: 365,
	    	click: function () {
	    		cc.loader.loadJson("res/data/turn.json", function(error, data) {
	    			app.turn.game(2, data[1]);  
	    		});
	    	}	
	    },
	    {
	    	x: 1536 + 10,
	    	y: 1536 - 574 - 365,
	    	w: 365,
	    	h: 365,
	    	click: function () {
	    		cc.loader.loadJson("res/data/turn.json", function(error, data) {
	    			app.turn.game(3, data[2]);  
	    		});
	    	}	
	    },
	    {
	    	x: 1536 + 440,
	    	y: 1536 - 574 - 365,
	    	w: 365,
	    	h: 365,
	    	click: function () {
    		  app.runStage(new Menu(), 2);
	    	}	
	    }
	  ]
	},
	menuGame: {
		back: assets.turnType1,
		areas: [
	    {
	    	x     : 1536 - 955,
	    	y     : 1536 - 420 - 268,
	    	w     : 268,
	    	h     : 268,
	    	click : function () {
	    		app.turn.help();	
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
	    		app.turn.choose();
	    	}
	    }
	  ]
	},
	menuHelp: {
      back: assets.turnHelp,
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
            	cc.loader.loadJson("res/data/turn.json", function(error, data) {
	    			app.turn.game(app.turn.currentTrack, data[app.turn.currentTrack - 1]);  
	    		}); 
            }
       }
      ]
	},
	init: function () {
	  app.turn = this;	
	  app.renderMenu(this, this.menuIntro, true);
	},
	choose: function () {
	  app.renderMenu(this, this.menuChoose, true);
	},
	help: function () {
	  app.renderMenu(this, this.menuHelp, true);
	},
	drawPath: function (parent, path) {
		var pathLine = new cc.DrawNode();
		parent.addChild(pathLine);

		var i = 0;
		while (i < path.length) {
			if (i%4 == 0) {
				pathLine.drawSegment(
						cc.p(app.localX(path[i]), app.localY(1536 - path[i + 1])), 
						cc.p(app.localX(path[i + 2]), app.localY(1536 - path[i + 3])), 
						2, 
						cc.color(26, 252, 22, 255)
				);
				if (i > 0) {
				}
			}  
			pathLine.drawDot(cc.p(app.localX(path[i]), app.localY(1536 - path[i + 1])), 10, cc.color(242, 120, 14, 255));
			i += 2;  
		}
	},
	preparePathPoints: function (path) {
		var points = [];
		var i = 0;
		while (i < path.length) {
		  points.push(cc.p(app.localX(path[i]), app.localY(1536 - path[i + 1])));	
		  i += 2;
		}	
		return points;
	},
	preparePath: function (path) {
		var points = [];
		var i = 0;
		while (i < path.length) {
		  points.push(app.localX(path[i]));
		  points.push(app.localY(1536 - path[i + 1]));
		  i += 2;
		}	
		return points;
	},
	game: function (type, track) {
	  this.currentTrack = type;	
	  this.menuGame.back = 'res/turn/turn-type' + type + '.jpg';
	  app.renderMenu(this, this.menuGame, true);
	  this.drawPath(this.menu, track.path);
	  
	  var car = new cc.Sprite(assets.car);
	  car.attr({
		  x: app.localX(1536 + track.x),
		  y: app.localY(1536 - track.y),
		  rotation : track.rotation
	  });
	  this.menu.addChild(car);
	  
    
	  var action = cc.cardinalSplineTo(5, this.preparePathPoints(track.path), 0);
	  //var action = cc.catmullRomTo(5, this.preparePathPoints(track.path));
	  //action.easeing(cc.easeIn(3.0));
	  var prevCarPosition = cc.p(app.localX(1536 + track.x), app.localY(1536 - track.y));
	  var prevAngle = car.rotation;
	  var actionExt = setIntervalG(function () {
		try {
			action.isDone();
			var p = car.getPosition();  
			var d = getDistance(p.x, p.y, prevCarPosition.x, prevCarPosition.y);
			/*if (d > 20)*/ {
				var alpha = 180 - (180/Math.PI)*Math.acos((prevCarPosition.y - p.y)/d);
				if (Math.abs(alpha - prevAngle) < 30) {
				  car.rotation = alpha;
				  prevAngle = alpha;	
				}
				prevCarPosition = p;
				cc.log(prevAngle);
			}	
		} catch (e) {
  		  cc.log('STOP !!!');	
		  clearInterval(actionExt);		
        }
		
		
	  }.bind(this), 50);
	  car.runAction(action);
	  //*/
	  
	  
	  
	  
	}
});