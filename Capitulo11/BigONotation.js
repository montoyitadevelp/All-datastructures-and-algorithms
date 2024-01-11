//Complexity of O(1) constante, toma una operacion 
function increment(num) {
  return ++num;
}

//Complexity of O(n) linear, toma n operaciones (Pueden ser mas de 1000)
function sequentialSearch(array, item) {
  let cost = 0;
  for (let i = 0; i < array.length; i++) {
    cost++;
    if (item === array[i]) {
      //{1}
      return i;
    }
  }
  console.log(
    'cost for sequentialSearch with input size ' + array.length + ' is ' + cost
  );
  return -1;
}

sequentialSearch([1, 2, 3, 4, 5], 3)
