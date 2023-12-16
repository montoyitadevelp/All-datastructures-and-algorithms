export function LinkedList() {
  function Node(element) {
    //Crear un nodo con un elemento y un puntero al siguiente nodo.
    this.element = element;
    this.next = null;
  }
  //Longitud y cabeza de la lista.
  let length = 0;
  let head = null;

  //Añade un elemento al final.
  this.append = function (element) {
    let node = new Node(element),
      current;
    if (head === null) {
      head = node;
    } else {
      current = head;
      while (current.next) {
        current = current.next;
      }
      current.next = node;
    }
    length++;
  };
  //Inserta un elemento en una posicion especifica.
  this.insert = function (position, element) {
    if (position >= 0 && position <= length) {
      //{1}
      let node = new Node(element),
        current = head,
        previous,
        index = 0;
      if (position === 0) {
        //add on first position
        node.next = current; //{2}
        head = node;
      } else {
        while (index++ < position) {
          //{3}
          previous = current;
          current = current.next;
        }
        node.next = current; //{4}
        previous.next = node; //{5}
      }
      length++;
      return true;
    } else {
      return false;
    }
  };
  //Remueve un elemento de una posicion especifica.
  this.removeAt = function (position) {
    //check for out-of-bounds values
    if (position > -1 && position < length) {
      let current = head,
        previous,
        index = 0;
      if (position === 0) {
        head = current.next;
      } else {
        while (index++ < position) {
          previous = current;
          current = current.next;
        }
        //link previous with current's next: skip it to remove
        previous.next = current.next;
      }
      length--;
      return current.element;
    } else {
      return null;
    }
  };
  //Remueve un elemento de la lista.
  this.remove = function (element) {
    let index = this.indexOf(element);
    return this.removeAt(index);
  };
  //Busca un elemento en la lista y retorna su posicion, sino retorna -1.
  this.indexOf = function (element) {
    let current = head, //{1}
      index = -1;
    while (current) {
      //{2}
      if (element === current.element) {
        return index; //{3}
      }
      index++; //{4}
      current = current.next; //{5}
    }
    return -1;
  };
  //True si es vacio, sino false.
  this.isEmpty = function () {
    return length === 0;
  };
  //Retorna la longitud de la lista.
  this.size = function () {
    return length;
  };
  //Muestra los elementos de la lista
  this.toString = function () {
    let current = head, //{1}
      string = ''; //{2}
    while (current) {
      //{3}
      string += current.element + (current.next ? 'n' : ''); //{4}
      current = current.next; //{5}
    }
    return string;
  };
  this.getHead = function () {
    return head;
  };
}

let list = new LinkedList();
list.append(15);
list.append(20);
