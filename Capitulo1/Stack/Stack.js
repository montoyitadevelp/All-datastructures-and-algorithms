function Stack() {
  let items = [];
  //properties and methods go here

  //Añade a la parte superior
  this.push = function (element) {
    items.push(element);
  };
  //Remueve la parte superir
  this.pop = function () {
    return items.pop();
  };
  //Retorna el ultimo que fue añadido
  this.peek = function () {
    return items[items.length - 1];
  };
  //True si es vacio, sino false
  this.isEmpty = function () {
    return items.length == 0;
  };
  //Tamaño de la pila
  this.size = function () {
    return items.length;
  };
  //Limpia la pila
  this.clear = function () {
    items = [];
  };
  //Muestra el resultado
  this.print = function () {
    console.log(items.toString());
  };
}
let stack = new Stack();
console.log(stack.isEmpty());
stack.push(5);
stack.push(8);
console.log(stack.peek());
stack.push(11);
console.log(stack.size());
console.log(stack.isEmpty());
stack.push(15);
stack.pop();
stack.pop();
console.log(stack.size());
stack.print();

//Decimal to binary
function divideBy2(decNumber) {
  let remStack = new Stack(),
    rem,
    binaryString = '';
  //Mientras que no sea 0
  while (decNumber > 0) {
    //Modulo y division
    rem = Math.floor(decNumber % 2);
    remStack.push(rem);
    decNumber = Math.floor(decNumber / 2);
  }
  //Si no esta vacia, eliminamos los elementos desde el final
  while (!remStack.isEmpty()) {
    binaryString += remStack.pop().toString();
  }
  return binaryString;
}

console.log(divideBy2(233));
console.log(divideBy2(10));
console.log(divideBy2(1000));

//Base converter Algorithm
function baseConverter(decNumber, base) {
  var remStack = new Stack(),
    rem,
    baseString = '',
    digits = '0123456789ABCDEF'; //{6}
  while (decNumber > 0) {
    rem = Math.floor(decNumber % base);
    remStack.push(rem);
    decNumber = Math.floor(decNumber / base);
  }
  while (!remStack.isEmpty()) {
    baseString += digits[remStack.pop()]; //{7}
  }
  return baseString;
}

console.log(baseConverter(100345, 2));
console.log(baseConverter(100345, 8));
console.log(baseConverter(100345, 16));
