import { LinkedList } from '../../Capitulo3/LinkedLists/LinkedList.js';

function HashTable() {
  let table = [];

  // Funcion para hashear el valor de las key que van siendo agregadas
  let djb2HashCode = function (key) {
    var hash = 5381; //{1}
    for (var i = 0; i < key.length; i++) { //{2}
    hash = hash * 33 + key.charCodeAt(i); //{3}
    }
    return hash % 1013; //{4}
   };

  // Metodo para agregar y actualizar
  this.put = function (key, value) {
    let position = djb2HashCode(key);
    if (table[position] == undefined) {
      //{1}
      table[position] = new LinkedList();
    }
    table[position].append(new ValuePair(key, value)); //{
  };

  // Metodo para obtener el valor de la ket
  this.get = function (key) {
    let position = djb2HashCode(key);
    if (table[position] !== undefined) {
      //{3}
      //iterate linked list to find key/value
      let current = table[position].getHead(); //{4}
      while (current.next) {
        //{5}
        if (current.element.key === key) {
          //{6}
          return current.element.value;
        }
        current = current.next; //{8}
      }
      //check in case first or last element
      if (current.element.key === key) {
        //{9}
        return current.element.value;
      }
    }
    return undefined; //{10}
  };

  // Metodo para eliminar un valor de la key
  this.remove = function (key) {
    let position = djb2HashCode(key);
    if (table[position] !== undefined) {
      let current = table[position].getHead;
      while (current.next) {
        if (current.element.key === key) {
          //{11}
          table[position].remove(current.element); //{12}
          if (table[position].isEmpty()) {
            //{13}
            table[position] = undefined; //{14}
          }
          return true; //{15}
        }
        current = current.next;
      }
      //check in case first or last element
      if (current.element.key === key) {
        //{16}
        table[position].remove(current.element);
        if (table[position].isEmpty()) {
          table[position] = undefined;
        }
        return true;
      }
    }
    return false; //{17}
  };

  //Helper para mostrar valores no repetidos
  this.print = function () {
    for (var i = 0; i < table.length; ++i) {
      //{1}
      if (table[i] !== undefined) {
        //{2}
        console.log(i + ': ' + table[i]); //{3}
      }
    }
  };

  //Helper para almacenar key, value en un obj
  let ValuePair = function (key, value) {
    this.key = key;
    this.value = value;

    this.toString = function () {
      return '[' + this.key + ' - ' + this.value + ']';
    };
  };
}

let hash = new HashTable();
hash.put('Gandalf', 'gandalf@email.com');
hash.put('John', 'johnsnow@email.com');
hash.put('Tyrion', 'tyrion@email.com');
hash.put('Aaron', 'aaron@email.com');
hash.put('Donnie', 'donnie@email.com');
hash.put('Ana', 'ana@email.com');
hash.put('Jonathan', 'jonathan@email.com');
hash.put('Jamie', 'jamie@email.com');
hash.put('Sue', 'sue@email.com');
hash.put('Mindy', 'mindy@email.com');
hash.put('Paul', 'paul@email.com');
hash.put('Nathan', 'nathan@email.com');
console.log(hash.print());

