function recursiveFunction(someParam) {
  recursiveFunction(someParam);
}

function recursiveFunction1(someParam) {
  recursiveFunction2(someParam);
}

function recursiveFunction2(someParam) {
  recursiveFunction1(someParam);
}

let i = 0;
function recursiveFn() {
  i++;
  recursiveFn();
}
try {
  recursiveFn();
} catch (ex) {
  alert('i = ' + i + ' error: ' + ex);
}
function fibonacci(num) {
  if (num === 1 || num === 2) {
    //{1}
    return 1;
  }
  return fibonacci(num - 1) + fibonacci(num - 2);
}

function fib(num) {
  let n1 = 1,
    n2 = 1,
    n = 1;
  for (let i = 3; i <= num; i++) {
    n = n1 + n2;
    n1 = n2;
    n2 = n;
  }
  return n;
}

console.log(fib(3));

/* function MinCoinChange(coinsAmount) {
  let coins = coinsAmount; //{1}
  let cache = {}; //{2}
  this.makeChange = function (amount) {
    let me = this;
    if (!amount) {
      //{3}
      return [];
    }
    if (cache[amount]) {
      //{4}
      return cache[amount];
    }
    let min = [],
      newMin,
      newAmount;
    for (let i = 0; i < coins.length; i++) {
      //{5}
      let coin = coins[i];
      newAmount = amount - coin; //{6}
      if (newAmount >= 0) {
        newMin = me.makeChange(newAmount); //{7}
      }
      if (
        newAmount >= 0 && //{8}
        (newMin.length < min.length - 1 || !min.length) && //{9}
        (newMin.length || !newAmount) //{10})
      ) {
        min = [coin].concat(newMin); //{11}
        console.log('new Min ' + min + ' for ' + amount);
      }
    }
    return (cache[amount] = min); //{12}
  };
}

let minCoinChange = new MinCoinChange([1, 5, 10, 25]);
console.log(minCoinChange.makeChange(36)); */

function knapSack(capacity, weights, values, n) {
  let i,
    w,
    a,
    b,
    kS = [];
  for (i = 0; i <= n; i++) {
    //{1}
    kS[i] = [];
  }
  for (i = 0; i <= n; i++) {
    for (w = 0; w <= capacity; w++) {
      if (i == 0 || w == 0) {
        //{2}
        kS[i][w] = 0;
      } else if (weights[i - 1] <= w) {
        //{3}
        a = values[i - 1] + kS[i - 1][w - weights[i - 1]];
        b = kS[i - 1][w];
        kS[i][w] = a > b ? a : b; //{4} max(a,b)
      } else {
        kS[i][w] = kS[i - 1][w]; //{5}
      }
    }
  }
  findValues(n, capacity, kS, weights, values);
  return kS[n][capacity]; //{6}
}

function findValues(n, capacity, kS, weights, values) {
  let i = n,
    k = capacity;
  console.log('Items that are part of the solution:');
  while (i > 0 && k > 0) {
    if (kS[i][k] !== kS[i - 1][k]) {
      console.log(
        'item ' +
          i +
          ' can be part of solution w,v: ' +
          weights[i - 1] +
          ',' +
          values[i - 1]
      );
      i--;
      k = k - kS[i][k];
    } else {
      i--;
    }
  }
}

function lcs(wordX, wordY) {
  var m = wordX.length,
    n = wordY.length,
    l = [],
    i,
    j,
    a,
    b;
  for (i = 0; i <= m; ++i) {
    l[i] = [];
    //{1}
    for (j = 0; j <= n; ++j) {
      l[i][j] = 0;
      //{2}
    }
  }
  for (i = 0; i <= m; i++) {
    for (j = 0; j <= n; j++) {
      if (i == 0 || j == 0) {
        l[i][j] = 0;
      } else if (wordX[i - 1] == wordY[j - 1]) {
        l[i][j] = l[i - 1][j - 1] + 1;
        //{3}
      } else {
        a = l[i - 1][j];
        b = l[i][j - 1];
        l[i][j] = a > b ? a : b; //max(a,b)
        //{4}
      }
    }
  }

  //{5}
  return l[m][n];
}

function printSolution(solution, l, wordX, wordY, m, n) {
  let a = m,
    b = n,
    i,
    j,
    x = solution[a][b],
    answer = '';
  while (x !== '0') {
    if (solution[a][b] === 'diagonal') {
      answer = wordX[a - 1] + answer;
      a--;
      b--;
    } else if (solution[a][b] === 'left') {
      b--;
    } else if (solution[a][b] === 'top') {
      a--;
    }
    x = solution[a][b];
  }
  console.log('lcs: ' + answer);
}

function matrixChainOrder(p, n) {
  let i,
    j,
    k,
    l,
    q,
    m = [],
    s = [];
  for (i = 0; i <= n; i++) {
    s[i] = [];
    for (j = 0; j <= n; j++) {
      s[i][j] = 0;
    }
  }
  for (i = 1; i <= n; i++) {
    m[i] = [];
    m[i][i] = 0;
  }
  for (l = 2; l < n; l++) {
    for (i = 1; i <= n - l + 1; i++) {
      j = i + l - 1;
      m[i][j] = Number.MAX_SAFE_INTEGER;
      for (k = i; k <= j - 1; k++) {
        q = m[i][k] + m[k + 1][j] + p[i - 1] * p[k] * p[j]; //{1}
        if (q < m[i][j]) {
          m[i][j] = q;
          s[i][j] = k;
          //{2}
        }
      }
    }
  }
  //{3}
  return m[1][n - 1];
}
function MinCoinChange(coinsParameter) {
  let coins = coinsParameter; //{1}
  this.makeChange = function (amount) {
    let change = [],
      total = 0;
    for (let i = coins.length; i >= 0; i--) {
      //{2}
      let coin = coins[i];
      while (total + coin <= amount) {
        //{3}
        change.push(coin); //{4}
        total += coin; //{5}
      }
    }
    return change;
  };
}

function knapSack(capacity, values, weights) {
  let n = values.length,
    load = 0,
    i = 0,
    val = 0;
  for (i = 0; i < n && load < capacity; i++) {
    //{1}
    if (weights[i] <= capacity - load) {
      //{2}
      val += values[i];
      load += weights[i];
    } else {
      let r = (capacity - load) / weights[i]; //{3}
      val += r * values[i];
      load += weights[i];
    }
  }
  return n;
}

let values = [3, 4, 5],
  weights = [2, 3, 4],
  capacity = 5,
  n = values.length;
console.log(knapSack(capacity, weights, values, n));
console.log(lcs('AGGTAB', 'GXTXAYB'));
function printOptimalParenthesis(s, i, j) {
  if (i == j) {
    console.log('A[' + i + ']');
  } else {
    console.log('(');
    printOptimalParenthesis(s, i, s[i][j]);
    printOptimalParenthesis(s, s[i][j] + 1, j);
    console.log(')');
  }
}

let minCoinChange = new MinCoinChange([1, 5, 10, 25]);
console.log(minCoinChange.makeChange(36));

//Programación imperativa
let printArray = function (array) {
  for (var i = 0; i < array.length; i++) {
    console.log(array[i]);
  }
};
printArray([1, 2, 3, 4, 5]);

//Programación funcional
let forEach = function (array, action) {
  for (var i = 0; i < array.length; i++) {
    action(array[i]);
  }
};

let logItem = function (item) {
  console.log(item);
};

let findMinArray = function (array) {
  let minValue = array[0];
  for (let i = 1; i < array.length; i++) {
    if (minValue > array[i]) {
      minValue = array[i];
    }
  }
  return minValue
};



forEach([1, 2, 3, 4, 5], logItem);
console.log(findMinArray([8,6,4,5,9])); 
