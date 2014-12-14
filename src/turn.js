var Turn = cc.Layer.extend({
	ctor: function () {
		this._super();
	},
	menuIntro: {
      back: ''		
	},
	init: function () {
	  app.renderMenu(this, this.menuIntro, true);
	}
});