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
