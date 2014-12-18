var Complex = cc.Layer.extend({
	ctor: function () {
		this._super();
	},
	menuIntro: {
		back: assets.complexIntroBack,
		areas: [
		        {
		        	x: 3072/2 + 530,
		        	y: 3072/2 - 1031 - 140,
		        	h: 140,
		        	w: 396,
		        	click: function () {
		        		app.complex.game();  
		        	}	
		        }      
		        ]
	},
	menuGame: {
		back: assets.complexSorryBack
	},	
	init: function (options) {
		app.complex = this;
		app.renderMenu(this, this.menuIntro, true);
	},
	game: function (track) {
		
	  app.renderMenu(this, this.menuGame, true);
		
	}
});