/*
 * Write a function which given an array `arr`,
 * returns a counter object `cnt` satisfying the following.
 * The keys of `cnt` are the distinct values of `arr`, with
 * corresponding values being the number of occurence of the key
 * in `arr`.
 *
 * (Generated by ChatGPT)
 */

function makeCounter(arr: (string | number)[]) {
  let ret: Record<string | number, number> = {};

  if (arr.length === 0) {
    return ret;
  }

  for (let i = 0; i < arr.length; ++i) {
    if (ret[i] === undefined) {
      ret[arr[i]] = 1;
    } else {
      ret[arr[i]]++;
    }
  }

  return ret;
}


// Use to get value distribution of a categorical attribute.
export function uniqCount(table: (string | number)[][], column: number) {
  return table.reduce((c, r) => {
    const v = `${r[column]}`;
    c[v] = (c[v] || 0) + 1;
    return c;
  }, {} as Record<string | number, number>);
}

// Use to get value distribution of a (numerical) sequential attribute.
// The given table's column needs to contain numbers as no parsing is done.
// The result is normalized between 0 and 1 and returned as an array.
// NOTE: The resulting array has length `nbBins + 1`, with its last entry
// being the number of `NaN` values in the column.
export function valueDistribution(table: (string | number)[][], column: number, nbBins: number) {
    const { min, max } = minmax(table, column);
    if (min === max || nbBins <= 0) {
        return [];
    }
    const scale = nbBins / (max - min);
    const getBin = (x: number) => Math.floor((x - min) * scale);
    const count = Array.from({length: nbBins + 1}, () => 0);
    for (let i = 0; i < table.length; ++i) {
        const bin = getBin(table[i][column] as number);
        if (isNaN(bin)) {
            count[nbBins] += 1;
        }
        else {
            count[bin] += 1;
        }
    }
    for (let i = 0; i < nbBins; ++i) {
        count[i] /= nbBins;
    }
    return count;
}

function minmax(table: (string | number)[][], column: number) {
    let min = Infinity, max = -Infinity;
    for (let i = 0; i < table.length; ++i) {
        const v = table[i][column] as number;
        min = v < min ? v : min;
        max = v > max ? v : max;
    }
    return { min, max };
}
