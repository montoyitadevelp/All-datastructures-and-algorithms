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

  this.insertionSort = function () {
    let length = array.length, //{1}
      j,
      temp;
    for (let i = 1; i < length; i++) {
      //{2}
      j = i; //{3}
      temp = array[i];
      while (j > 0 && array[j - 1] > temp) {
        //{5}
        array[j] = array[j - 1]; //{6}
        j--;
      }
      array[j] = temp; //{7}
    }
  };

  //Better performance in sorted
  this.mergeSort = function () {
    array = mergeSortRec(array);
  };

  let mergeSortRec = function (array) {
    let length = array.length;
    if (length === 1) {
      //{1}
      return array; //{2}
    }
    let mid = Math.floor(length / 2), //{3}
      left = array.slice(0, mid), //{4}
      right = array.slice(mid, length); //{5}
    return merge(mergeSortRec(left), mergeSortRec(right)); //{6}
  };

  let merge = function (left, right) {
    let result = [], // {7}
      il = 0,
      ir = 0;
    while (il < left.length && ir < right.length) {
      // {8}
      if (left[il] < right[ir]) {
        result.push(left[il++]); // {9}
      } else {
        result.push(right[ir++]); // {10}
      }
    }
    while (il < left.length) {
      // {11}
      result.push(left[il++]);
    }
    while (ir < right.length) {
      // {12}
      result.push(right[ir++]);
    }
    return result; // {13}
  };

  let quick = function (array, left, right) {
    let index; //{1}
    if (array.length > 1) {
      //{2}
      index = partition(array, left, right); //{3}
      if (left < index - 1) {
        //{4}
        quick(array, left, index - 1); //{5}
      }
      if (index < right) {
        //{6}
        quick(array, index, right); //{7}
      }
    }
  };

  let partition = function (array, left, right) {
    let pivot = array[Math.floor((right + left) / 2)], //{8}
      i = left, //{9}
      j = right; //{10}
    while (i <= j) {
      //{11}
      while (array[i] < pivot) {
        //{12}
        i++;
      }
      while (array[j] > pivot) {
        //{13}
        j--;
      }
      if (i <= j) {
        //{14}
        swap(array, i, j); //{15}
        i++;
        j--;
      }
    }
    return i;
  };

  this.quickSort = function () {
    quick(array, 0, array.length - 1);
  };

  this.heapSort = function () {
    let heapSize = array.length;
    buildHeap(array); //{1}
    while (heapSize > 1) {
      heapSize--;
      swap(array, 0, heapSize); //{2}
      heapify(array, heapSize, 0); //{3}
    }
  };

  let buildHeap = function (array) {
    let heapSize = array.length;
    for (let i = Math.floor(array.length / 2); i >= 0; i--) {
      heapify(array, heapSize, i);
    }
  };

  let heapify = function (array, heapSize, i) {
    let left = i * 2 + 1,
      right = i * 2 + 2,
      largest = i;
    if (left < heapSize && array[left] > array[largest]) {
      largest = left;
    }
    if (right < heapSize && array[right] > array[largest]) {
      largest = right;
    }
    if (largest !== i) {
      swap(array, i, largest);
      heapify(array, heapSize, largest);
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
console.log(array.toString());
array.insertionSort();
console.log(array.toString());
