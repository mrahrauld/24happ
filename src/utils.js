const MILLI = 1000

export function getHours(chrono){
    return Math.trunc(chrono/(3600 * MILLI));
}
export function getMinutes(chrono){
    return Math.trunc(chrono/(60 * MILLI)) - getHours(chrono)*60;
}
export function getSeconds(chrono){
    return Math.trunc(chrono/MILLI) - getMinutes(chrono)*60 - getHours(chrono)*3600;
}
export function getDecis(chrono){
    return Math.trunc(chrono/100) - getSeconds(chrono)*10- getMinutes(chrono)*600 - getHours(chrono)*36000;
}

export function minToMillis(minutes){
    return minutes * 60 * 1000;
}
export function secToMillis(minutes){
    return minutes * 1000;
}
export function zeroPad(value) {
    return value < 10 ? `0${value}` : value;
}

export function ChronoToString(chrono){
    const chronoAbs = Math.abs(chrono)
    // if (chrono<0){
    //     return "-"+zeroPad(getMinutes(chronoAbs).toString()) + ":" + zeroPad(getSeconds(chronoAbs).toString());
    // }
    return zeroPad(getMinutes(chronoAbs).toString()) + ":" + zeroPad(getSeconds(chronoAbs).toString());
}
export function getRemainingTime(endTime){
    return endTime - new Date();
}
export function count(array, key) {
    return array.reduce(function (r, a) {
        return r + a[key];
    }, 0);
}
export function getMeanBike(tours){
    return count(tours,"chrono").toString()/tours.length;
  }