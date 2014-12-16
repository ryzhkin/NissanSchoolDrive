var Menu = cc.Layer.extend({
	ctor: function () {
		this._super();
		var winsize = cc.winSize;
		var centerpos = cc.p(winsize.width / 2, winsize.height / 2);

		var spritebg = new cc.Sprite(assets.menuBack);
		spritebg.setPosition(centerpos);
		this.addChild(spritebg);
		
	},
	topMenuAreas: [
{
	x: 624, 
	y: 614,
	h: 432,
	w: 432,
	click: function () {
		cc.log('Go to video menu');	 
		app.renderMenu(app.menu, app.menu.menuVideo, true);
	}
},       
{
	x: 1084, 
	y: 614,
	h: 432,
	w: 432,
	click: function () {
		cc.log('Go to lessons menu');
		app.renderMenu(app.menu, app.menu.menuLessons, true);
	}
},
{
	x: 1539, 
	y: 614,
	h: 432,
	w: 432,
	click: function () {
		cc.log('Go to games menu');	 
		app.renderMenu(app.menu, app.menu.menuGames, true);
	}
},
{
	x: 2001, 
	y: 614,
	h: 432,
	w: 432,
	click: function () {
		cc.log('Go to site');
		
		app.renderMenu(app.menu, app.menu.menuSite, true);
		app.openURL('http://www.nissan.ru');
	}
}            
],
    menuVideo: {
    	back  : assets.menuVideoBack,
    	areas : [
    	         {
	        	 x: 1060,
	        	 y: 146,
	        	 h: 388,
	        	 w: 278,
	        	 click: function () {
	        		 cc.log('Go to video #1');	
	        		 app.runStage(new Video(), 2);
	        	 }.bind(this)
    	         },
    	         {
    	        	 x: 1376,
    	        	 y: 146,
    	        	 h: 388,
    	        	 w: 278,
    	        	 click: function () {
    	        		 cc.log('Go to video #2');
    	        		 app.runStage(new Video(), 3);
    	        	 }
    	         },
    	         {
    	        	x: 1694,
    	        	y: 146,
    	        	h: 388,
    	        	w: 278,
    	        	click: function () {
	        		 cc.log('Go to video #3');
	        		 app.runStage(new Video(), 4);
	        	 }
	         }
	      ]
    },
    menuLessons: {
	  back  : assets.menuLessonsBack,
	  areas : [
	           {
	        	   x: 740,
	        	 y: 146,
	        	 h: 388,
	        	 w: 278,
	        	 click: function () {
	        	   cc.log('Go to lesson #1');	
	        	   app.runStage(new Accelerator());
	        	 }
	           },
	         {
	        	 x: 1060,
	        	 y: 146,
	        	 h: 388,
	        	 w: 278,
	        	 click: function () {
	        		 cc.log('Go to lesson #2');
	        		 app.runStage(new Turn());
	        	 }
	         },
	         {
	        	 x: 1382,
    	         y: 146,
    	         h: 388,
    	         w: 278,
    	         click: function () {
    	            cc.log('Go to lesson #3');
    	            app.runStage(new Roll());
    	         }
             },
       {
      	 x: 1704,
      	 y: 146,
      	 h: 388,
      	 w: 278,
      	 click: function () {
      		cc.log('Go to lesson #4');
      		app.runStage(new Circle());	 
      	 }
       },
       {
         x: 2024,
         y: 146,
         h: 388,
         w: 278,
         click: function () {
           cc.log('Go to lesson #5');
           app.runStage(new Slalom());	
         }
       }
	 ]          
	},	
    menuGames: {
		back  : assets.menuGamesBack,
		areas : [
         {
           x: 740,
           y: 146,
           h: 388,
           w: 278,
           click: function () {
             cc.log('Go to game #1');
             app.runStage(new Memory());
           }
         },
         {
	       x: 1060,
	       y: 146,
	       h: 388,
	       w: 278,
	       click: function () {
	         cc.log('Go to game #2');	
	         app.runStage(new Reaction());
	       }
         },
         {
	       x: 1382,
	       y: 146,
	       h: 388,
	       w: 278,
	       click: function () {
	         cc.log('Go to game #3');
	         app.runStage(new Coordination());
	       }
         },
         {
 	       x: 1704,
 	       y: 146,
 	       h: 388,
 	       w: 278,
 	       click: function () {
 	         cc.log('Go to game #4');	 
 	       }
         },
        {
          x: 2024,
          y: 146,
          h: 388,
          w: 278,
          click: function () {
           cc.log('Go to game #5');	 
          }
        }
  	  ] 
	},
    menuSite: {
		back  : assets.menuSiteBack,
		areas : [

		         ] 
	},
	init: function (options) {
	  app.menu = this;
	  this.menuVideo.areas = this.menuVideo.areas.concat(this.topMenuAreas);
      this.menuLessons.areas = this.menuLessons.areas.concat(this.topMenuAreas);
      this.menuGames.areas = this.menuGames.areas.concat(this.topMenuAreas);
      this.menuSite.areas = this.menuSite.areas.concat(this.topMenuAreas);
      
      switch (options) {
	    case 1: {
	      app.renderMenu(this, this.menuVideo, true);	
	      break;	
	    }
	    case 2: {
		  app.renderMenu(this, this.menuLessons, true);	
		  break;	
		}
	    case 3: {
		 app.renderMenu(this, this.menuGames, true);	
		 break;	
	    }
  	    default: {
  	      app.renderMenu(this, this.menuVideo, true);	
  	      break;	
  	    }
 	  }
	  
	}/*,
	onEnter: function () {
	  this._super();
	  this.run(this.options);
	}*/
});