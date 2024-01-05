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

function MinCoinChange(coinsAmount) {
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
console.log(minCoinChange.makeChange(36))
