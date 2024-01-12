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

function swap(array, index1, index2) {
  let aux = array[index1];
  array[index1] = array[index2];
  array[index2] = aux;
}


//Complexity of O(n^2) quadratic, toma n operaciones (Pueden ser mas de 1000 elevado a la 2)
function bubbleSort(array) {
  var length = array.length;
  var cost = 0;
  for (var i = 0; i < length; i++) { //{1}
    cost++;
    for (var j = 0; j < length - 1; j++) { //{2}
      cost++;
      if (array[j] > array[j + 1]) {
        swap(array, j, j + 1);
      }
    }
  }
  console.log('cost for bubbleSort with input size ' + length + 'is ' + cost);

}

bubbleSort(Array(100));
swap([1, 2, 3, 4, 5], 0, 4)


