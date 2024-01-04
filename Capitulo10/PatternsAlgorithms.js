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
