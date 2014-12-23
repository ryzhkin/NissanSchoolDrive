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
	  back: assets.memoryQuestions,
	  areas: [
	          // Вопрос №1       
	   {
		   x: 1178 - 100/2,
		   y: 986 - 100/2,
		   h: 100,
		   w: 100,
		   options: {
			   question: 1,
			   value: 12   
		   },
		   click: function (target) {
			   app.memory.click(target);			   
		   }
	   },
	   {
		   x: 1404 - 100/2,
		   y: 986 - 100/2,
		   h: 100,
		   w: 100,
		   options: {
			   question: 1,
			   value: 16   
		   },
		   click: function (target) {
			   app.memory.click(target);			   
		   }
	   },
	   {
		   x: 1628 - 100/2,
		   y: 986 - 100/2,
		   h: 100,
		   w: 100,
		   options: {
			   question: 1,
			   value: 14   
		   },
		   click: function (target) {
			   app.memory.click(target);			   
		   }
	   },
	   {
		   x: 1820 - 100/2,
		   y: 986 - 100/2,
		   h: 100,
		   w: 100,
		   options: {
			   question: 1,
			   value: 21   
		   },
		   click: function (target) {
			   app.memory.click(target);			   
		   }
	   },
	   // Вопрос №2
	   {
		   x: 1204 - 100/2,
		   y: 636 - 100/2,
		   h: 100,
		   w: 100,
		   options: {
			   question: 2,
			   value: 2   
		   },
		   click: function (target) {
			   app.memory.click(target);			   
		   }
	   },       
	   {
		   x: 1424 - 100/2,
		   y: 636 - 100/2,
		   h: 100,
		   w: 100,
		   options: {
			   question: 2,
			   value: 0   
		   },
		   click: function (target) {
			   app.memory.click(target);			   
		   }
	   },       
	   {
		   x: 1640 - 100/2,
		   y: 636 - 100/2,
		   h: 100,
		   w: 100,
		   options: {
			   question: 2,
			   value: 1   
		   },
		   click: function (target) {
			   app.memory.click(target);			   
		   }
	   },       
	   {
		   x: 1828 - 100/2,
		   y: 636 - 100/2,
		   h: 100,
		   w: 100,
		   options: {
			   question: 2,
			   value: 3   
		   },
		   click: function (target) {
			   app.memory.click(target);			   
		   }
	   },       
	   // Вопрос №3
	   {
		   x: 1204 - 100/2,
		   y: 290 - 100/2,
		   h: 100,
		   w: 100,
		   options: {
			   question: 3,
			   value: 1   
		   },
		   click: function (target) {
			   app.memory.click(target);			   
		   }
	   },       
	   {
		   x: 1424 - 100/2,
		   y: 290 - 100/2,
		   h: 100,
		   w: 100,
		   options: {
			   question: 3,
			   value: 3   
		   },
		   click: function (target) {
			   app.memory.click(target);			   
		   }
	   },       
	   {
		   x: 1640 - 100/2,
		   y: 290 - 100/2,
		   h: 100,
		   w: 100,
		   options: {
			   question: 3,
			   value: 2   
		   },
		   click: function (target) {
			   app.memory.click(target);			   
		   }
	   },       
	   {
		   x: 1828 - 100/2,
		   y: 290 - 100/2,
		   h: 100,
		   w: 100,
		   options: {
			   question: 3,
			   value: 4   
		   },
		   click: function (target) {
			   app.memory.click(target);			   
		   }
	   },       
	   
	   // Кнопка - резуьтат
	   {
		   x: 2066,
		   y: 146 - 140,
		   h: 140,
		   w: 398,
		   click: function () {
			 app.memory.result();			   
		   }
	   },       
	   


	  ]
	},
	menuResult: {
	  back: 'res/memory/memory-result-0.jpg',
	  areas: [
	    {
	    	 x: 1536 - 446,
	         y: 1536 - 998 - 140,
	         h: 140,
	         w: 398,
	         click: function () {
	        	 cc.loader.loadJson("res/data/memory.json", function(error, data) {
	        			app.memory.game(data);  
	        	});
	         }
	    },
	    {
	    	 x: 1536 + 52,
	         y: 1536 - 998 - 140,
	         h: 140,
	         w: 398,
	         click: function () {
	        	 app.runStage(new Menu(), 3);
	         }
	    },
	    {
	    	 x: 1536 - 204,
	         y: 1536 - 808 - 84,
	         h: 84,
	         w: 84,
	         click: function () {
	           app.share('fb', 'Я прошел игру "Память" в Школе вождения Nissan!');
	         }
	    },
	    {
	    	 x: 1536 - 92,
	         y: 1536 - 808 - 84,
	         h: 84,
	         w: 84,
	         click: function () {
	           app.share('vk', 'Я прошел игру "Память" в Школе вождения Nissan!');
	         }
	    },
	    {
	    	 x: 1536 + 20,
	         y: 1536 - 808 - 84,
	         h: 84,
	         w: 84,
	         click: function () {
	           app.share('tw', 'Я прошел игру "Память" в Школе вождения Nissan!');
	         }
	    },
	    {
	    	 x: 1536 + 130,
	         y: 1536 - 808 - 84,
	         h: 84,
	         w: 84,
	         click: function () {
	           app.share('od', 'Я прошел игру "Память" в Школе вождения Nissan!');
	         }
	    }
	  ]
	},
    init: function (options) {
      app.memory = this;
      app.renderMenu(this, this.menuIntro, true);
	},
	game: function (tracks) {
	  tracks.shuffle(true);
	  var track = tracks[0]; 
	  this.track = track;
	  
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
	 
	  
	  app.moveByPathConstantSpeed(app.preparePathPoints(track.path), car, 600, function () {
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
	click: function (target) {
		/*
		cc.log('question = ' + target.options.question);
		cc.log('x = ' + target.x);
		cc.log('y = ' + target.y);
		*/
		
		var allChildren = this.menu.getChildren();
		for (var i = 0; i< allChildren.length; i++) {
  		  if (typeof(allChildren[i].options) !== 'undefined' && allChildren[i].select == true && allChildren[i].options.question == target.options.question) {
  			this.menu.removeChild(allChildren[i]);			  
		  }	
		}
		
		var select = new cc.Sprite(assets.memorySelect);
		select.attr({
			x        : target.x + 100/2,
			y        : target.y + 100/2,
			select   : true,
			options  : target.options
		});
		this.menu.addChild(select);
	},
	questions: function (track) {
	  app.renderMenu(this, this.menuQuestions, true);	
	},
	result: function () {
	  cc.log('result');
	  cc.log(this.track);
	  var countOk = 0; 
	  var allChildren = this.menu.getChildren();
	  for (var i = 0; i< allChildren.length; i++) {
		  if (typeof(allChildren[i].options) !== 'undefined' && allChildren[i].select == true) {
			  switch (allChildren[i].options.question) {
			    case 1: {
			    	countOk += (this.track.answers[0] == parseInt(allChildren[i].options.value))?1:0;			    	
			      break;  	
			    }
			    case 2: {
			    	countOk += (this.track.answers[1] == parseInt(allChildren[i].options.value))?1:0;			    	
			    	break;  	
			    }
			    case 3: {
			    	countOk += (this.track.answers[2] == parseInt(allChildren[i].options.value))?1:0;			    	
			    	break;  	
			    }
			  }
			  			  
		  }	
	  }
	  cc.log('OK = ' + countOk);
	  this.menuResult.back = 'res/memory/memory-result-' + countOk + '.jpg';
	  app.renderMenu(this, this.menuResult, true);
	}
});