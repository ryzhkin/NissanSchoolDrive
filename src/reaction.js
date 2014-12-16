var Reaction = cc.Layer.extend({
	ctor: function () {
		this._super();
	},
	menuIntro: {
	  back: assets.reactionIntroBack,
	  areas: [
       { 
	     x: 1536 + 505,
	     y: 1536  - 667 - 140,
	     h: 140,
	     w: 400,
	     click: function () {
		   app.reaction.game();
	     }
       }     
	  ]
	},
	menuGame: {
	  back: assets.reactionGameBack,
	  areas: [
	    {
	      x: 1778,
	      y: 634,
	      h: 346,
	      w: 146,
	      click: function() {
	    	cc.log('right');  
	    	app.reaction.pressRightPedal();
	      }
	    },
	    {
	   	  x: 1610,
	      y: 634,
	      h: 346,
	      w: 146,
	      click: function() {
	    	cc.log('left');  
	    	app.reaction.pressLeftPedal();
	      }
	    }      
	  ]
	},
	menuResult: {
		back: assets.reactionResult1,
		areas: [
		        {
		        	x: 1536 -563,
		        	y: 1536 - 1000 - 140,
		        	h: 140,
		        	w: 500,
		        	click: function() {
		        	  app.reaction.game();	
		        	}
		        },
		        {
		        	x: 1536 + 56,
		        	y: 1536 - 1000 - 140,
		        	h: 140,
		        	w: 500,
		        	click: function() {
		        		app.runStage(new Menu(), 3);	
		        	}
		        },
		        
		        {
		        	x: 1536 -235,
		        	y: 1536 - 820 - 99,
		        	h: 99,
		        	w: 99,
		        	click: function() {
		        		app.share('fb', 'Я прошел игру "Реакция" в Школе вождения Nissan!');
		        	}
		        },
		        {
		        	x: 1536 -107,
		        	y: 1536 - 820 - 99,
		        	h: 99,
		        	w: 99,
		        	click: function() {
		        		app.share('vk', 'Я прошел игру "Реакция" в Школе вождения Nissan!');
		        	}
		        },
		        {
		        	x: 1536 +23,
		        	y: 1536 - 820 - 99,
		        	h: 99,
		        	w: 99,
		        	click: function() {
		        		app.share('tw', 'Я прошел игру "Реакция" в Школе вождения Nissan!');
		        	}
		        },
		        {
		        	x: 1536 +150,
		        	y: 1536 - 820 - 99,
		        	h: 99,
		        	w: 99,
		        	click: function() {
		        		app.share('od', 'Я прошел игру "Реакция" в Школе вождения Nissan!');
		        	}
		        }
		     ]
	},
	init: function (options) {
	  app.reaction = this;
	  app.renderMenu(this, this.menuIntro, true);
	},
	game: function () {
	  app.renderMenu(this, this.menuGame, true);
	  var carCenter = new cc.Sprite(assets.reactionCarCenter);
	  carCenter.attr({
		  scale    : 1.5, 
		  x        : app.localX(1536 + 0),
		  y        : app.localY(1536 - 1520),
		  /*anchorX  : 0,
		  anchorY  : 1*/
	  });
	  this.menu.addChild(carCenter);
	  var carLeft = new cc.Sprite(assets.reactionCarLeft);
	  carLeft.attr({
		  scale    : 1.5, 
		  x        : app.localX(1536 - 850 - 20),
		  y        : app.localY(1536 - 1520 - 20),
		  skewX    : 20
		  /*anchorX  : 0,
		  anchorY  : 1*/
	  });
	  this.menu.addChild(carLeft);
	  var carRight = new cc.Sprite(assets.reactionCarRight);
	  carRight.attr({
		  scale    : 1.5, 
		  x        : app.localX(1536 + 850 ),
		  y        : app.localY(1536 - 1520  - 20),
		  skewX    : -20,
		  /*anchorX  : 0,
		  anchorY  : 1*/
	  });
	  this.menu.addChild(carRight);
	  
	  var baner = new cc.Sprite(assets.reactionBaner);
	  baner.attr({
		  scale    : 2, 
		  x        : app.localX(1536 + 0),
		  y        : app.localY(1536 - 105),
		  anchorY  : 1
	  });
	  this.menu.addChild(baner);
	  
	  var light1 = new cc.Sprite(assets.reactionLight1);
	  light1.attr({
		  visible  : false, 
		  x        : app.localX(1536 - 77),
		  y        : app.localY(1536 - 110),
		  anchorX  : 0,
		  anchorY  : 1
	  });
	  this.menu.addChild(light1);
	  
	  var light2 = new cc.Sprite(assets.reactionLight2);
	  light2.attr({
		  visible  : false, 
		  x        : app.localX(1536 - 77),
		  y        : app.localY(1536 - 191),
		  anchorX  : 0,
		  anchorY  : 1
	  });
	  this.menu.addChild(light2);
	  
	  var light3 = new cc.Sprite(assets.reactionLight3);
	  light3.attr({
		  visible  : false, 
		  x        : app.localX(1536 - 77),
		  y        : app.localY(1536 - 250),
		  anchorX  : 0,
		  anchorY  : 1
	  });
	  this.menu.addChild(light3);
	  
	  var light4 = new cc.Sprite(assets.reactionLight4);
	  light4.attr({
		  visible  : false, 
		  x        : app.localX(1536 - 77),
		  y        : app.localY(1536 - 312),
		  anchorX  : 0,
		  anchorY  : 1
	  });
	  this.menu.addChild(light4);
	  
	  var light5 = new cc.Sprite(assets.reactionLight5);
	  light5.attr({
		  visible  : false, 
		  x        : app.localX(1536 - 77),
		  y        : app.localY(1536 - 374),
		  anchorX  : 0,
		  anchorY  : 1
	  });
	  this.menu.addChild(light5); 
	  
	  var panel = new cc.Sprite(assets.reactionPanel);
	  panel.attr({
		  x        : app.localX(1536 - 0),
		  y        : app.localY(1536 - 514),
		  anchorX  : 0.5,
		  anchorY  : 1
	  });
	  this.menu.addChild(panel); 
	  
	  var pedalLeft = new cc.Sprite(assets.reactionPedalLeft);
	  pedalLeft.attr({
		  x        : app.localX(1536 + 76),
		  y        : app.localY(1536 - 565),
		  anchorX  : 0,
		  anchorY  : 1
	  });
	  this.menu.addChild(pedalLeft);
	  
	  var pedalRight = new cc.Sprite(assets.reactionPedalRight);
	  pedalRight.attr({
		  x        : app.localX(1536 + 250),
		  y        : app.localY(1536 - 565),
		  anchorX  : 0,
		  anchorY  : 1
	  });
	  this.menu.addChild(pedalRight);
	  
	  this.pressRightPedal = function () {
		  var endTime = new Date();
		  var folstart = light4.visible;
		    
		  pedalRight.runAction(new cc.Sequence([
		                                   new cc.ScaleTo(0.1, 0.9, 0.9),
		                                   new cc.ScaleTo(0.1, 1, 1)
		                                   ]
		  ));  
		  carCenter.runAction(new cc.MoveTo(1.7, cc.p(app.localX(1536 - 50), app.localY(1536 + 100))));
		  carCenter.runAction(new cc.Sequence([
		                       new cc.ScaleTo(1.7, 0.44, 0.44 - 0.1),
		                       cc.callFunc(function () {
		                    	   if (folstart == true) {
	                    	    	 app.reaction.result(endTime - startTime);
		                    	   } else {
		                    		 light5.visible = true;
		                 			 app.reaction.result(-1);
		                 		   }                  	 
		                   	  })
		                      ]));
		  
		  
	  }
	  
      this.pressLeftPedal = function () {
    	  pedalLeft.runAction(new cc.Sequence([
    	                                        new cc.ScaleTo(0.1, 0.9, 0.9),
    	                                        new cc.ScaleTo(0.1, 1, 1)
    	                                        ]
    	  ));
    	  /*carLeft.runAction(new cc.MoveTo(1.7, cc.p(app.localX(1536 - 160 - 50), app.localY(1536 + 100))));
    	  carLeft.runAction(new cc.ScaleTo(1.7, 0.44, 0.44 - 0.25));
    	  
    	  carRight.runAction(new cc.MoveTo(1.7, cc.p(app.localX(1536 + 60 + 50 + 30), app.localY(1536 + 100))));
    	  carRight.runAction(new cc.ScaleTo(2, 0.44, 0.44 - 0.25));*/
	  }
      
      var startTime = new Date();
      var timeOuts = [];
      this.timeOuts = timeOuts;
      // Начало игры
      timeOuts.push(setTimeout(function () {
    	  light1.visible = true;
    	  timeOuts.push(setTimeout(function () {
    		  light2.visible = true;
    		  timeOuts.push(setTimeout(function () {
    			  light3.visible = true;
    			  timeOuts.push(setTimeout(function () {
    				  light4.visible = true;
    				  var startTime = new Date();
    				  
    				  carLeft.runAction(new cc.MoveTo(1.7, cc.p(app.localX(1536 - 160 - 50), app.localY(1536 + 100))));
    				  carLeft.runAction(new cc.ScaleTo(1.7, 0.44, 0.44 - 0.25));

    				  carRight.runAction(new cc.MoveTo(1.7, cc.p(app.localX(1536 + 60 + 50 + 30), app.localY(1536 + 100))));
    				  carRight.runAction(new cc.ScaleTo(2, 0.44, 0.44 - 0.25));
    				  
    				  timeOuts.push(setTimeout(function () {
    					  app.reaction.result(new Date() - startTime);
    				  }, 6000));
    			  }, Math.random()*3000));
    		  }, 500));
    	  }, 500));
      }, 1000)); 
      //*/
	  
	},
	timeOuts: [],
	result: function (time) {
	  for (var i = 0; i < this.timeOuts.length; i++) {
		clearTimeout(this.timeOuts[i]);
	  }	
	  this.timeOuts = [];
	  cc.log('Final = ' + time);
	  if (time < 0) {
		this.menuResult.back = assets.reactionResult1; 
	  } else {
		this.menuResult.back = assets.reactionResult2; 
	  }
	  
	  app.renderMenu(this, this.menuResult, true);
	  
	  if (time > 0) {
	    var timeStr = '00:' + leadZero(Math.floor(time/1000), 2) + ':' + leadZero(time -  Math.floor(time/1000)*1000, 3);
	    var line = new cc.LabelTTF(
			  timeStr,
			  'res/fonts/nissanagmed.ttf',
			  100
	    );
	    line.setPosition(app.localX(1536), app.localY(900));
	    line.setAnchorPoint(0.5, 1);
	    line.setColor(cc.color(136, 136, 136, 255));
	    //line.setColor(cc.color(197, 23, 50, 255));
	    this.menu.addChild(line);
	  }
	}
});