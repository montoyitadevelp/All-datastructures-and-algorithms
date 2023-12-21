export default function Dictionary() {
  //Properties
  let items = {};

  //Retorna un elemento en especifico
  this.has = function (key) {
    return key in items;
  };

  //Agrega un elemento al diccionario
  this.set = function (key, value) {
    items[key] = value; //{1}
  };

  //Elimina un elemento del diccionario
  this.delete = function (key) {
    if (this.has(key)) {
      delete items[key];
      return true;
    }
    return false;
  };

  //Retorna el valor de un elemento del diccionario
  this.get = function (key) {
    return this.has(key) ? items[key] : undefined;
  };

  //Retorna un array con todos los valores del diccionario
  this.values = function () {
    let values = [];
    for (let k in items) {
      //{1}
      if (this.has(k)) {
        values.push(items[k]); //{2}
      }
    }
    return values;
  };

  //Retorna el tamaño del diccionario
  this.size = function () {
    return Object.keys(items).length;
  };

  //Retorna todas las key del diccionario
  this.keys = function () {
    return Object.keys(items);
  };

  //Retorna el diccionario
  this.getItems = function () {
    return items;
  };
}
let dictionary = new Dictionary();
dictionary.set('Gandalf', 'gandalf@email.com');
dictionary.set('John', 'johnsnow@email.com');
dictionary.set('Tyrion', 'tyrion@email.com');
console.log(dictionary.has('Gandalf'));
console.log(dictionary.size());
console.log(dictionary.keys());
console.log(dictionary.values());
console.log(dictionary.get('Tyrion'));
dictionary.delete('John');
console.log(dictionary.keys());
console.log(dictionary.values());
console.log(dictionary.getItems());

//Diccionario(Mapa) nativamente
let map = new Map();
map.set('Gandalf', 'gandalf@email.com');
map.set('John', 'johnsnow@email.com');
map.set('Tyrion', 'tyrion@email.com');
console.log(map.has('Gandalf'));
console.log(map.size);
console.log(map.keys());
console.log(map.values());

console.log(map.get('Tyrion'));
//No tienen values, keys ni entries (debilmente), object como keys
let weakMap = new WeakMap();
var ob1 = { name: 'Gandalf' },
  ob2 = { name: 'John' },
  ob3 = { name: 'Tyrion' };
weakMap.set(ob1, 'gandalf@email.com');
weakMap.set(ob2, 'johnsnow@email.com');
weakMap.set(ob3, 'tyrion@email.com');
console.log(weakMap.has(ob1));
console.log(weakMap.get(ob3));
weakMap.delete(ob2);


