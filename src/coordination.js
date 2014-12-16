var physicWorld = function (layer, options) {
	/*if (typeof(options) == 'undefined') {
		options = {
				gravity : [0, 9.8]		  
		}	
	}
	if (typeof(options.gravity) == 'undefined') {
		options.gravity = [0, 9.8];	
	}*/
	
	this.options = help.extend({
	  gravity : [0, 9.8]	
	}, options);
	
	
	// Короткие псевдонимы основных объектов физического движка Box2D
	var b2AABB  = Box2D.Collision.b2AABB;
	var b2World = Box2D.Dynamics.b2World;
	var b2Vec2 = Box2D.Common.Math.b2Vec2;
	var b2DebugDraw = Box2D.Dynamics.b2DebugDraw;
	var b2Body = Box2D.Dynamics.b2Body;
	var b2BodyDef = Box2D.Dynamics.b2BodyDef;
	var b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
	var b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
	var b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
	var b2MouseJointDef = Box2D.Dynamics.Joints.b2MouseJointDef;
	var b2ContactListener = Box2D.Dynamics.b2ContactListener;
	var BOX2D_PIXELS_TO_METER = 1/30;                    // Для перевода пиксельных координат в метровые координаты - умножаем все на *BOX2D_PIXELS_TO_METER
	var BOX2D_METER_TO_PIXELS = 30; // Для перевода метровых координат в пиксельные координаты - умножаем все на * BOX2D_METER_TO_PIXELS

	this.BOX2D_PIXELS_TO_METER = BOX2D_PIXELS_TO_METER;
	this.BOX2D_METER_TO_PIXELS = BOX2D_METER_TO_PIXELS;

	// Типы обьектов физического мира
	this.objType = {
			Static    : b2Body.b2_staticBody,    // статический - не подвижный, монолитный объект, но он влияет на динамический объекты
			Kinematic : b2Body.b2_kinematicBody, // киниматический - объект, который движется по заданной траиктории и на него не действуют дргуие силы, но он влияет на динамический объекты
			Dynamic   : b2Body.b2_dynamicBody    // динамический - объект на него влияют все физические факторы миры, он взаимодейсвует со всеми типами объектов
	};//*/
	
	
	// Создаем наш мир.
	this.world =  new b2World(
			new b2Vec2(this.options.gravity[0], this.options.gravity[1])//new b2Vec2(0, 10)   // Вектор гравитации. Задается ускорение свободного падения, равное 10 виртуальным метрам в секунду по оси Y.
			,true               // doSleep флаг. Разрешает не обсчитывать в текущий момент неактивные элементы. Это очень сильно сказывается на скорости работы.
	);
	
	this.vector = function(x, y) {
		return new Box2D.Common.Math.b2Vec2(x, y);
	};
	
	/**
	 * Синхронизируем объекты движка рендринга eseal и текущие состояние объектов физического движка box2D
	 */
	this.updateEsealObjects = function () {
		for (var i = 0; i < this.esealObjects.length; i++) {
			this.esealObjects[i].x = this.esealObjects[i].body.GetPosition().x * BOX2D_METER_TO_PIXELS;
			this.esealObjects[i].y = this.esealObjects[i].body.GetPosition().y * BOX2D_METER_TO_PIXELS;
			this.esealObjects[i].rotation = this.esealObjects[i].body.GetAngle() * (180 / Math.PI);
		}
	}
	
	/**
	 * Добавляем объект в движок рендринга eseal
	 * @param body - экземпляр объекта физического движка eseal
	 * @param objOptions - начальные параметры объекта
	 */
	this.addObjEseal = function (body, objOptions) {
		var defColorFill = "#C0C0C1";
		var defColorBorder = "#808082";

		if (objOptions.type == this.objType.Static) {
			var defColorFill = "#A1D4A2";
			var defColorBorder = "#143014";
		}

		if (objOptions.type == this.objType.Dynamic) {
			var defColorFill = "#D86165";
			var defColorBorder = "#96484A";
		}

		if (objOptions.type == this.objType.Kinematic) {
			var defColorFill = "#F2D843";
			var defColorBorder = "#AA982E";
		}
		var objectEseal = null;
		// Добавляем объекты eseal
		if (this.options.eseal == true) {
			// Если определина тексутра спрайта - добавляем его
			if (typeof(objOptions.bitmap) !== 'undefined') {
				var sprite = new cc.Sprite(objOptions.bitmap);
				var bitmapOptions = {
						scaleX     : 1,
						scaleY     : 1,
						rotation   : 0,
						x          : 0,
						y          : 0,
						offsetRegX : 0, // смещение центра тяжести - используется в том случае когда текстура спрайта не совпадает с физической геометрией
						offsetRegY : 0  // смещение центра тяжести - используется в том случае когда текстура спрайта не совпадает с физической геометрией
				};
				bitmapOptions = jQuery().extend(true, bitmapOptions, objOptions.bitmapOptions);
				// Если у нас пропорциональное масштабирование
				if (typeof(bitmapOptions.scale) !== 'undefined') {
					bitmapOptions.scaleX = bitmapOptions.scale;
					bitmapOptions.scaleY = bitmapOptions.scale;
				}
				// Круг ...
				if ((objOptions.shape.radius > 0) && (objOptions.shape.box.length == 0) && (objOptions.shape.polygon.length == 0)) {
					bitmapOptions = jQuery().extend(true, bitmapOptions, {
						regX     : objOptions.shape.radius/bitmapOptions.scaleX + bitmapOptions.offsetRegX,
						regY     : objOptions.shape.radius/bitmapOptions.scaleY + bitmapOptions.offsetRegY
					}
					);
				}
				// Прямоугольник ...
				if (objOptions.shape.box.length == 2) {
					bitmapOptions = jQuery().extend(true, bitmapOptions, {
						regX     : (objOptions.shape.box[0]/2)/bitmapOptions.scaleX + bitmapOptions.offsetRegX,
						regY     : (objOptions.shape.box[1]/2)/bitmapOptions.scaleY + bitmapOptions.offsetRegY
					}
					);
				}

				// Полигон ....
				if (objOptions.shape.polygon.length >= 6) {
					bitmapOptions = jQuery().extend(true, bitmapOptions, {
						regX     : bitmapOptions.offsetRegX,
						regY     : bitmapOptions.offsetRegY
					}
					);
				}

				sprite.set(bitmapOptions);
				sprite.body = body;
				this.esealObjects.push(sprite);
				this.easelStage.addChild(sprite);
				objectEseal = sprite;
			}

			// Добавляем дебаг информацию для eseal
			if ((this.options.debug == true) || ((typeof(objOptions.bitmap) == 'undefined') && (this.options.showEmptyEsealObjects == true)) && body.GetType() !== this.objType.Static) {
				// this.easelStage
				var shape = new createjs.Shape();
				shape.alpha = 0.5;
				shape.graphics.setStrokeStyle(1).beginStroke(defColorBorder).beginFill(defColorFill);
				// Круг ...
				if ((objOptions.shape.radius > 0) && (objOptions.shape.box.length == 0) && (objOptions.shape.polygon.length == 0)) {
					shape.graphics.drawCircle(0, 0, objOptions.shape.radius);
				}

				// Прямоугольник ...
				if (objOptions.shape.box.length == 2) {
					shape.graphics.drawRect( -objOptions.shape.box[0]/2, -objOptions.shape.box[1]/2, objOptions.shape.box[0], objOptions.shape.box[1]);
				}

				// Полигон ....
				if (objOptions.shape.polygon.length >= 6) {
					shape.graphics.moveTo(objOptions.shape.polygon[0], objOptions.shape.polygon[1]);
					for (var i = 2; i < objOptions.shape.polygon.length; i +=2) {
						shape.graphics.lineTo(objOptions.shape.polygon[i], objOptions.shape.polygon[i + 1]);
					}
					shape.graphics.closePath();
				}

				shape.graphics.endStroke();
				shape.body = body;
				this.esealObjects.push(shape);
				this.easelStage.addChild(shape);

				if (typeof(sprite) == 'undefined') {
					objectEseal = shape;
				}
			} //*/
			this.updateEsealObjects();
		}
		return (objectEseal);
	}
	
	
	
	
	
    	
	
	
/*	this.space = new cp.Space();
	this.space.gravity = cp.v(0, -9.8);
	cc.PhysicsSprite
*/
}	

var Coordination = cc.Layer.extend({
	ctor: function () {
	  this._super();
	},
	menuIntro: {
		back: assets.coordinationIntroBack,
		areas: [
		        {
		        	x: 3072/2 + 508,
		        	y: 3072/2 - 954 - 140,
		        	h: 140,
		        	w: 396,
		        	click: function () {
	        		  app.coordination.game();  
		        	}	
		        }      
		        ]
	},
	menuGame: {
		back: assets.coordinationGameBack	
	},
	init: function (options) {
	  app.coordination = this;
	  app.renderMenu(this, this.menuIntro, true);
	},
	world: null,
	game: function () {
	  app.renderMenu(this, this.menuGame, true);
	  
	  this.world = new cc.Layer();  
	  this.addChild(this.world);	
	  var g = new physicWorld(this.world, {
		//debug    : true
	  });	
	}
});