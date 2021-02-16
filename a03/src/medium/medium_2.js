import mpg_data from "./data/mpg_data.js";
import {getStatistics} from "./medium_1.js";

/*
This section can be done by using the array prototype functions.
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
see under the methods section
*/


/**
 * This object contains data that has to do with every car in the `mpg_data` object.
 *
 *
 * @param {allCarStats.avgMpg} Average miles per gallon on the highway and in the city. keys `city` and `highway`
 *
 * @param {allCarStats.allYearStats} The result of calling `getStatistics` from medium_1.js on
 * the years the cars were made.
 *
 * @param {allCarStats.ratioHybrids} ratio of cars that are hybrids
 */
export const allCarStats = {
    avgMpg: {
         city: mpg_data.map(a => a.city_mpg).reduce((x,y) => x + y) / mpg_data.length,
         highway: mpg_data.map(a => a.highway_mpg).reduce((x,y) => x + y) / mpg_data.length,
    },
    allYearStats: getStatistics(mpg_data.map(b => b.year)),
    ratioHybrids: mpg_data.map(c => c.hybrid). filter(r => r == true).length / mpg_data.length,
};


/**
 * HINT: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
 *
 * @param {moreStats.makerHybrids} Array of objects where keys are the `make` of the car and
 * a list of `hybrids` available (their `id` string). Don't show car makes with 0 hybrids. Sort by the number of hybrids
 * in descending order.
 *
 *[{
 *     "make": "Buick",
 *     "hybrids": [
 *       "2012 Buick Lacrosse Convenience Group",
 *       "2012 Buick Lacrosse Leather Group",
 *       "2012 Buick Lacrosse Premium I Group",
 *       "2012 Buick Lacrosse"
 *     ]
 *   },
 *{
 *     "make": "BMW",
 *     "hybrids": [
 *       "2011 BMW ActiveHybrid 750i Sedan",
 *       "2011 BMW ActiveHybrid 750Li Sedan"
 *     ]
 *}]
 *
 *
 *
 *
 * @param {moreStats.avgMpgByYearAndHybrid} Object where keys are years and each year
 * an object with keys for `hybrid` and `notHybrid`. The hybrid and notHybrid
 * should be an object with keys for `highway` and `city` average mpg.
 *
 * Only years in the data should be keys.
 *
 * {
 *     2020: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *     2021: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *
 * }
 */

export function hybHelp() {
    var a = mpg_data.reduce(function(temp,curr) {
        if (temp.findIndex( h => h.make == curr.make) == -1) {
            let hybrids = mpg_data.filter(y => y.make == curr.make).filter(y => y.hybrid).map(y => y.id);
            if (hybrids.length > 0) {
                temp.push({make: curr.make, hybrids});
            }
        }
        return temp;
    },[]);

    return a;
}

export function mpgAvg(data) {
    return {
    city: data.map(m =>m.city_mpg).reduce((x,y) => x + y)/data.length,
    highway: data.map(m => m.highway_mpg).reduce((x,y) => x + y)/data.length,
    }
}

export function yrHelp() {
    let t = mpg_data.map(y => y.year);
    let obj = {};
    let hybrid = mpg_data.filter(y => y.hybrid == true);
    let nonhybrid = mpg_data.filter(y => y.hybrid == false);
    
    for (var i = 0; i < t.length; i++) {
        let a = t[i];
        let oth = {
            hybrid: mpgAvg(hybrid.filter(y => y.year == a)),
            notHybrid: mpgAvg(nonhybrid.filter(y => y.year == a)),
        }
        obj[a] = oth;
    };
    return obj;
}

 
export const moreStats = {
    makerHybrids: hybHelp(),
    avgMpgByYearAndHybrid: yrHelp(),
};
