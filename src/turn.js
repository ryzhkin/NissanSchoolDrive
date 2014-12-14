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
	game: function (type, track) {
	  this.currentTrack = type;	
	  this.menuGame.back = 'res/turn/turn-type' + type + '.jpg';
	  app.renderMenu(this, this.menuGame, true);
	  
	  
	  
	}
});