var intervalTracking = new Array();
var intervalCount=0;

setIntervalG = ( function(func, interval) {
	var interval = setInterval(func, interval);
    intervalTracking[++intervalCount]=interval;
    return interval;
});

clearAllIntervals = function () {
    for (var i = 0 ; i <= intervalCount; i++) {
      clearInterval(intervalTracking[i]);
    }
    intervalCount = 0;
    intervalTracking = [];
}

/**
 * Число в строку с ведущими нулями
 * @param number  - число
 * @param length - кол-во ведущих нулей
 * @return {*}
 */
function leadZero(number, length) {
	length = (typeof(length) == 'undefined')?2:length;
	while(number.toString().length < length){
		number = '0' + number;
	}
	return number;
}

/**
 * Вычисляет растояние между 2 точками с координатами.
 * @param x1
 * @param y1
 * @param x2
 * @param y2
 * @return {Number}
 */
var getDistance = function (x1, y1, x2, y2) {
	return (Math.pow((Math.pow((x2 - x1), 2) +  Math.pow((y2 - y1), 2)), 0.5));
}

//Вычисляет длинну маршрута
var getPathDistance = function (path) {
	var s = 0;
	for (var i = 0; i < Math.floor(path.length/4)*4; i +=2) {
		s += getDistance(path[i], path[i + 1], path[i + 2], path[i + 3]);
	}
	return s;
}
