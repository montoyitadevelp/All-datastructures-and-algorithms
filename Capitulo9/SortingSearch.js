function ArrayList() {
  let array = []; //{1}
  this.insert = function (item) {
    //{2}
    array.push(item);
  };
  this.toString = function () {
    //{3}
    return array.join();
  };

  let swap = function (array, index1, index2) {
    let aux = array[index1];
    array[index1] = array[index2];
    array[index2] = aux;
  };

  this.bubbleSort = function () {
    let length = array.length; //{1}
    for (let i = 0; i < length; i++) {
      //{2}
      for (let j = 0; j < length - 1 - i; j++) {
        //{3}
        if (array[j] > array[j + 1]) {
          //{4}
          swap(array, j, j + 1); //{5}
        }
      }
    }
  };

  this.selectionSort = function () {
    let length = array.length, //{1}
      indexMin;
    for (let i = 0; i < length - 1; i++) {
      //{2}
      indexMin = i; //{3}
      for (let j = i; j < length; j++) {
        //{4}
        if (array[indexMin] > array[j]) {
          //{5}
          indexMin = j; //{6}
        }
      }
      if (i !== indexMin) {
        //{7}
        swap(i, indexMin);
      }
    }
  };
}

function createNonSortedArray(size) {
  //{6}
  let array = new ArrayList();
  for (let i = size; i > 0; i--) {
    array.insert(i);
  }
  return array;
}

let array = createNonSortedArray(5); //{7}
console.log(array.toString());
array.bubbleSort(); //{9}
console.log(array.toString());
array = createNonSortedArray(5);
console.log(array.toString());
array.selectionSort();
console.log(array.toString())
