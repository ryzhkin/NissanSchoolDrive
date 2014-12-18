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
	
	init: function (options) {
	  app.vision = this;
	  app.renderMenu(this, this.menuIntro, true);
	},
	game: function () {
		
	}
});