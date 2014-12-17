var physicWorld = function (layer, options) {


	// Начальные настройки physicWorld
	this.options = help.extend({
		gravity     : [0, -9.8], // Вектор гравитации. По-умолчанию задается ускорение свободного падения, равное 9.8 виртуальным метрам в секунду по оси Y.
		scaleFactor : 1,     // Кооэфициент масштаба
		frameRate   : 30,    // Частота обновления рендринга esealJS
		// Задали предельное количество обрабатываемых событий изменения скорости объектов и их положения на 1 такт работы
		// При увеличении этих параметров общая скорость реакции будет увеличиваться,
		// но с увеличением количества объектов мы можем уткнуться в системные ресурсы,
		// при уменьшении — получим неправильную обработку объектов от такта к такту. 10 — вполне вменяемое среднее значение.
		velocityIterations: 8, // Предельное изминение скорости на одну итерацию
		positionIterations: 1, // Предельное изминение позиции на одну итерацию

		showEmptyEsealObjects: true, // Показывать пустые объекты Eseal
		debug                : false // По-умолчанию использовать рендринг в режиме отладки
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
	var BOX2D_PIXELS_TO_METER = 1/32;                    // Для перевода пиксельных координат в метровые координаты - умножаем все на *BOX2D_PIXELS_TO_METER
	var BOX2D_METER_TO_PIXELS = 32; // Для перевода метровых координат в пиксельные координаты - умножаем все на * BOX2D_METER_TO_PIXELS

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

	this.esealObjects = [];
	/**
	 * Синхронизируем объекты движка рендринга eseal и текущие состояние объектов физического движка box2D
	 */
	this.updateEsealObjects = function () {
		for (var i = 0; i < this.esealObjects.length; i++) {
			this.esealObjects[i].x = this.esealObjects[i].body.GetPosition().x * BOX2D_METER_TO_PIXELS;
			this.esealObjects[i].y = this.esealObjects[i].body.GetPosition().y * BOX2D_METER_TO_PIXELS;
			this.esealObjects[i].rotation = -this.esealObjects[i].body.GetAngle() * (180 / Math.PI);
		}
	},

	
	this.drawSector = function (node, x, y, r, minAngle, maxAngle, colorFill, colorBorder)  {
		minAngle = (-1)*minAngle + 90;
		maxAngle = (-1)*maxAngle + 90;
		var t = minAngle;
		minAngle = maxAngle;
		maxAngle = t;
		var dAngle = 5;
		var verts = [];	
		verts.push(cc.p(x, y));
		while (minAngle <= maxAngle) {
			verts.push(cc.p(x + r*Math.cos((Math.PI/180)*minAngle), y + r*Math.sin((Math.PI/180)*minAngle)));  
			minAngle += dAngle;  
		}
		verts.push(cc.p(x, y));
		node.clear();
		node.drawPoly(verts, colorFill, 1, colorBorder);
	},
	
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

		defColorFill = help.hexToRgb(defColorFill);
		defColorBorder = help.hexToRgb(defColorBorder);

		var objectEseal = null;

		// Если определина тексутра спрайта - добавляем его
		if (typeof(objOptions.bitmap) !== 'undefined') {
			var sprite = new cc.Sprite(objOptions.bitmap);
			var bitmapOptions = {
					scale      : 1,
					rotation   : 0,
					x          : 0,
					y          : 0,
					anchorX    : 0.5, // смещение центра тяжести - используется в том случае когда текстура спрайта не совпадает с физической геометрией
					anchorY    : 0.5  // смещение центра тяжести - используется в том случае когда текстура спрайта не совпадает с физической геометрией
			};
			bitmapOptions = help.extend(bitmapOptions, objOptions.bitmapOptions); 
			
			if (typeof(bitmapOptions.offsetRegY) !== 'undefined') {
			  //cc.log(sprite.getContentSize().width);
			  //cc.log(sprite.getContentSize().height);
				bitmapOptions.anchorY = (sprite.getContentSize().height - bitmapOptions.offsetRegY)/sprite.getContentSize().height;
			}
			
			if (typeof(bitmapOptions.offsetRegX) !== 'undefined') {
				//cc.log(sprite.getContentSize().width);
				//cc.log(sprite.getContentSize().height);
				bitmapOptions.anchorX = (sprite.getContentSize().width - bitmapOptions.offsetRegX)/sprite.getContentSize().width;
			}
			
			sprite.attr(bitmapOptions);
			sprite.body = body;
			this.esealObjects.push(sprite);
			layer.addChild(sprite);
			objectEseal = sprite;
		}

		// Добавляем дебаг информацию для eseal
		if ((this.options.debug == true) || ((typeof(objOptions.bitmap) == 'undefined') && (this.options.showEmptyEsealObjects == true)) && body.GetType() !== this.objType.Static) {
			var shape = new cc.DrawNode();
			// Круг ...
			if ((objOptions.shape.radius > 0) && (objOptions.shape.box.length == 0) && (objOptions.shape.polygon.length == 0)) {
/*				shape.drawCircle(
						cc.p(0, 0), 
						objOptions.shape.radius, 
						0, 
						20, 
						false, 
						5, 
						cc.color(defColorBorder.r, defColorBorder.g, defColorBorder.b, 255));
*/				
				
				this.drawSector(shape, 0, 0, objOptions.shape.radius, 0, 360, cc.color(defColorFill.r, defColorFill.g, defColorFill.b, 100), cc.color(defColorBorder.r, defColorBorder.g, defColorBorder.b, 255));
				
			}

			// Прямоугольник ...
			if (objOptions.shape.box.length == 2) {
				shape.drawRect(
						cc.p(-objOptions.shape.box[0]/2, -objOptions.shape.box[1]/2), 
						cc.p(objOptions.shape.box[0]/2, objOptions.shape.box[1]/2),			
						cc.color(defColorFill.r, defColorFill.g, defColorFill.b, 100), 
						1, 
						cc.color(defColorBorder.r, defColorBorder.g, defColorBorder.b, 255) 
				);
			}

			// Полигон ....
			if (objOptions.shape.polygon.length >= 6) {
				/*shape.graphics.moveTo(objOptions.shape.polygon[0], objOptions.shape.polygon[1]);
					for (var i = 2; i < objOptions.shape.polygon.length; i +=2) {
						shape.graphics.lineTo(objOptions.shape.polygon[i], objOptions.shape.polygon[i + 1]);
					}
					shape.graphics.closePath();*/

			}
			shape.body = body;
			this.esealObjects.push(shape);
			layer.addChild(shape);

			if (typeof(sprite) == 'undefined') {
				objectEseal = shape;
			}
		} //*/
		this.updateEsealObjects();
		return (objectEseal);
	}

	/**
	 * Добавить новый физический объект в физический мир Box2D
	 * @param objOptions
	 * @return {Object}
	 */
	this.addObj = function (objOptions) {
		var objOptions = help.extend({
			// Тип создоваемого объекта:
			// this.objType.Static     - статический - не подвижный, монолитный объект, но он влияет на динамический объекты
			// this.objType.Kinematic  - киниматический - объект, который движется по заданной траиктории и на него не действуют дргуие силы, но он влияет на динамический объекты
			// this.objType.Dynamic    - динамический - объект на него влияют все физические факторы миры, он взаимодейсвует со всеми типами объектов
			type: this.objType.Dynamic,
			// Координаты объекта в пикселях, относительно левого верхнего угла canvas:
			// по-умолчанию средина canvas
			pos: {
				x: 0,
				y: 0,
				rotation: 0
			},
			// Физичиеские параметры объекта
			physic: {
				density: 1.0,    // кооэфициент плотности объекта
				friction: 0.5,   // кооэфициент трения объектов мира: 0 - нет трения у объекта, 1 - максимальное трение у объекта
				restitution: 0.5 // кооэфициент упругости объектов мира: 0 - очень жесткие объект, 1 - максимально упругий объект
			},
			// Геометрическая форма объекта
			shape: {
				radius  : 100,    // Если указан радиус  в пикселях - это круг
				box     : [],     // Если размеры прямоугольника не пустые и > 0 будет построен прямоугольник
				polygon : []      // Если координаты полигона не пустые - будет построен полигон

			}
		}, objOptions);





		var bodyDef = new b2BodyDef();
		bodyDef.type = objOptions.type;
		bodyDef.position.x = objOptions.pos.x*BOX2D_PIXELS_TO_METER;
		bodyDef.position.y = objOptions.pos.y*BOX2D_PIXELS_TO_METER;
		bodyDef.angle = objOptions.pos.rotation*(Math.PI/180);


		var fixDef = new b2FixtureDef();
		fixDef.density = objOptions.physic.density;
		fixDef.friction = objOptions.physic.friction;
		fixDef.restitution = objOptions.physic.restitution;

		// Круг ...
		if ((objOptions.shape.radius > 0) && (objOptions.shape.box.length == 0) && (objOptions.shape.polygon.length == 0)) {
			fixDef.shape = new b2CircleShape(objOptions.shape.radius*BOX2D_PIXELS_TO_METER); // геометрическая фигура объекта
		} else {
			fixDef.shape = new b2PolygonShape;
			// Прямоугольник ...
			if (objOptions.shape.box.length == 2) {
				fixDef.shape.SetAsBox((objOptions.shape.box[0]/2)*BOX2D_PIXELS_TO_METER, (objOptions.shape.box[1]/2)*BOX2D_PIXELS_TO_METER);
			}
			// Полигон ....
			// Вершины задаются по следующим правилам:
			// 1) по часовой стрелке - против часовой
			// 2) многоугольник должен быть выпуклым
			// 3) максимум 8 вершин
			// 4) замыкать фигуру не нужно, по-умолчанию замыкаются первая вершина и последняя
			if (objOptions.shape.polygon.length >= 6) {
				// .....
				var sX = objOptions.shape.polygon[0];
				var sY = objOptions.shape.polygon[1];
				for (var i = 0; i < objOptions.shape.polygon.length; i +=2) {
					objOptions.shape.polygon[i] = objOptions.shape.polygon[i] - sX;
					objOptions.shape.polygon[i + 1] = objOptions.shape.polygon[i + 1] - sY;
				}
				var vertices = [];
				for (var i = 0; i < objOptions.shape.polygon.length; i +=2) {
					vertices.push((new Box2D.Common.Math.b2Vec2(
							objOptions.shape.polygon[i]*BOX2D_PIXELS_TO_METER, // - objOptions.shape.polygon[0]*BOX2D_PIXELS_TO_METER,
							objOptions.shape.polygon[i + 1]*BOX2D_PIXELS_TO_METER // - objOptions.shape.polygon[1]*BOX2D_PIXELS_TO_METER
					)));
				}
				fixDef.shape.SetAsArray(vertices, vertices.length);
			}
		}

		// Добавляем киниматическое прдеставление объекта в мир (добаляем геометрический центр будущего объекта)
		var body = this.world.CreateBody(bodyDef);
		// Создаем на базе киниматического представления объекта его физическое представление (физ. параметры + геометрическая форма)
		body.CreateFixture(fixDef);
		// world.CreateBody(bodyDef).CreateFixture(fixDef);
		// Добавляем объект в движок рендринга eseal
		var objectEseal = this.addObjEseal(body, objOptions);

		return ({
			bodyDef     : bodyDef,
			fixDef      : fixDef,
			body        : body,
			objectEseal : objectEseal
		});
	}

	this.step = function (dt) {
		this.world.Step(dt, this.options.velocityIterations, this.options.positionIterations); 
		this.world.ClearForces();
		this.updateEsealObjects();
	}
}	