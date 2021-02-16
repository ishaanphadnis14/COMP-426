import {variance} from "./data/stats_helpers.js";

/**
 * Gets the sum of an array of numbers.
 * @param array
 * @returns {*}
 * see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
 * prototype functions. Very useful
 */
export function getSum(array) {
    var s = 0;
    for (var i = 0; i < array.length; i++){
        s = s + array[i];
    }
    return s;
}


/**
 * Calculates the median of an array of numbers.
 * @param {number[]} array
 * @returns {number|*}
 *
 * example:
 * let array = [3,2,5,6,2,7,4,2,7,5];
 * console.log(getMedian(array)); // 4.5
 */
export function getMedian(array) {
    var t; 
    if (array.length % 2 == 1) {
        t = array [(array.length / 2) - 1 + 0.5];
    } else {
        t = (array[(array.length / 2)] + array[(array.length / 2) - 1]) / 2
    }
    return t;
}

/**
 * Calculates statistics (see below) on an array of numbers.
 * Look at the stats_helper.js file. It does variance which is used to calculate std deviation.
 * @param {number[]} array
 * @returns {{min: *, median: *, max: *, variance: *, mean: *, length: *, sum: *, standard_deviation: *}}
 *
 * example:
 * getStatistics([3,2,4,5,5,5,2,6,7])
 * {
  length: 9,
  sum: 39,
  mean: 4.333333333333333,
  median: 5,
  min: 2,
  max: 7,
  variance: 2.6666666666666665,
  standard_deviation: 1.632993161855452
 }
 */
export function getStatistics(array) {
    var s = new Object();
    s ["length"] = array.length;
    s ["min"] = array[0];
    s ["max"] = array[0];
    s ["sum"] = getSum(array);
    s ["median"] = getMedian(array);
    s ["mean"] = getSum(array) / array.length;

    for (var i = 0; i < array.length; i++) {
        if (s ["min"] > array[i]) {
            s ["min"] = array[i]; 
        } 
        if (s ["max"] < array[i]) {
            s ["max"] = array[i]; 

        }
    }

    s ["variance"] = variance(array, (getSum(array) / array.length));
    s ["standard_deviation"] = Math.sqrt(variance(array, (getSum(array) / array.length)));

    return s;
}

