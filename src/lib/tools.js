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
