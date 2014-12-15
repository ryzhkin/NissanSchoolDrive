var Slalom = cc.Layer.extend({
	ctor: function () {
		this._super();
	},
	menuIntro: {
	  back: assets.slalomIntroBack,
	  areas : [
	           {
	        	   x: 3072/2 -485,
	        	   y: 1536 - 1174 - 306,
	        	   w: 306,
	        	   h: 306,
	        	   click: function () {
	        		   cc.loader.loadJson("res/data/slalom.json", function(error, data) {
	        			   app.slalom.game(data[0]);  
	        		   });	
	        	   }	
	           },
	           {
	        	   x: 3072/2 - 135,
	        	   y: 1536 - 1174 - 306,
	        	   w: 306,
	        	   h: 306,
	        	   click: function () {
	        		   app.runStage(new Theory(), {
	        			   back: assets.theoryAcceleratorBack,
	        			   url: 'res/data/theory_slalom.html',   
	        			   onBack: function () {
	        				   app.runStage(new Slalom());
	        			   }  
	        		   });
	        	   }	
	           },
	           {
	        	   x: 3072/2 + 215,
	        	   y: 1536 - 1174 - 306,
	        	   w: 306,
	        	   h: 306,
	        	   click: function () {
	        		   app.menu = new Menu();	
	        		   app.runStage(app.menu, 2);
	        	   }	
	           }
	    ]
	},
	menuGame: {
	  back: assets.slalomGameBack		
	},
	init: function () {
	  app.slalom = this;	
	  app.renderMenu(this, this.menuIntro, true);	
	},
	game: function (track) {
	  app.renderMenu(this, this.menuGame, true);	
	}
});