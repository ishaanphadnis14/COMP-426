/**
 *
 * @param {number} a
 * @param {number} b
 * @returns {string} 'a + b = (a + b)'
 *
 * example: sumToString(3, 4)
 * returns: '3 + 4 = 7'
 * see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
 */
export function sumToString(a, b) {
    return a + " + " + b + " = " + (a + b);
}


/**
 *
 * @param {number} startNumber
 * @param {number} endNumber
 * @returns {number[]}
 *
 * example: getIncreasingArray(3, 7)
 * returns: [ 3, 4, 5, 6, 7 ]
 *
 */
export function getIncreasingArray(startNumber, endNumber) {
    var a = [];
    for (var i = startNumber; i <= endNumber; i++){
        a.push(i);
    }
    return a;
}

/**
 *
 * @param {number[]} numbers
 * @return {{min: number, max: number}}
 * see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
 * and https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math
 */
export function maxAndMin(numbers) {
    var m = new Object();
    m ["min"] = numbers[0];
    m ["max"] = numbers[0];
    for (var i = 0; i < numbers.length; i++){
        if (m ["min"] > numbers[i]){
            m ["min"] = numbers[i];
        }
        if (m ["max"] < numbers[i]){
            m ["max"] = numbers[i];
        }

    }
   
    return m;
}

/**
 *
 * @param array - An array of any primitive type
 * @returns {object} Object where the keys are the values that were passed in
 * and the value was the number of times it occurred.
 *
 * example: countArray([3, 6, 3, 2, 2, 3, 'some', 'hello', 'some', [1, 2]])
 * returns: {'2': 2, '3': 3, '6': 1, some: 2, hello: 1, '1,2': 1}
 *
 */
export function countArray(array) {
    var o = new Object();
    for (var i = 0; i < array.length; i++){
        o[array[i]] = 0;
    }
    for (var i = 0; i < array.length; i++){
        o[array[i]]++;
    }
    return o;
}
