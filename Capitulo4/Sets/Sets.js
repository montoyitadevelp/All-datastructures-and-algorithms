function Set() {
  let items = {};

  //True si el objecto tiene una especifica propiedad
  this.has = function (value) {
    return value in items;
  };

  //Agregar un elemento al objecto
  this.add = function (value) {
    if (!this.has(value)) {
      items[value] = value; //{1}
      return true;
    }
    return false;
  };

  //Remover un elemento del objecto
  this.delete = function (value) {
    if (this.has(value)) {
      delete items[value]; //{2}
      return true;
    }
    return false;
  };

  //Limpiar el objecto
  this.clear = function () {
    items = {};
  };

  //Longitud del objecto
  this.size = function () {
    return Object.keys(items).length; //{4}
  };

  //Devuelve un array con los valores del objecto
  this.values = function () {
    let values = [];
    for (let i = 0, keys = Object.keys(items); i < keys.length; i++) {
      values.push(items[keys[i]]);
    }
    return values;
  };

  //Unión de dos sets. Devuelve un nuevo set con los elementos de ambos sets. Los elementos no pueden repetirse.
  this.union = function (otherSet) {
    let unionSet = new Set(); //{1}
    let values = this.values(); //{2}
    for (let i = 0; i < values.length; i++) {
      unionSet.add(values[i]);
    }
    values = otherSet.values(); //{3}
    for (let i = 0; i < values.length; i++) {
      unionSet.add(values[i]);
    }
    return unionSet;
  };

  //Intersección de dos sets. Devuelve un nuevo set con los elementos que se encuentran en ambos sets. Los elementos no pueden repetirse.
  this.intersection = function (otherSet) {
    let intersectionSet = new Set(); //{1}
    let values = this.values();
    for (let i = 0; i < values.length; i++) {
      //{2}
      if (otherSet.has(values[i])) {
        //{3}
        intersectionSet.add(values[i]); //{4}
      }
    }
    return intersectionSet;
  };

  //Diferencia de dos sets. Devuelve un nuevo set con los elementos que se encuentran en el primer set pero no en el segundo. Los elementos no pueden repetirse.
  this.difference = function (otherSet) {
    let differenceSet = new Set(); //{1}
    let values = this.values();
    for (let i = 0; i < values.length; i++) {
      //{2}
      if (!otherSet.has(values[i])) {
        //{3}
        differenceSet.add(values[i]); //{4}
      }
    }
    return differenceSet;
  };
  //Subconjunto de un set. Devuelve true si el set es subconjunto de otro set.
  this.subset = function (otherSet) {
    if (this.size() > otherSet.size()) {
      //{1}
      return false;
    } else {
      let values = this.values();
      for (let i = 0; i < values.length; i++) {
        //{2}
        if (!otherSet.has(values[i])) {
          //{3}
          return false; //{4}
        }
      }
      return true; //{5}
    }
  };
}

/* let setA = new Set();
setA.add(1);
setA.add(2);
setA.add(3);
let setB = new Set();
setB.add(3);
setB.add(4);
setB.add(5);
setB.add(6);
let unionAB = setA.union(setB);
console.log(unionAB.values()); */
/* let setA = new Set();
setA.add(1);
setA.add(2);
setA.add(3);
let setB = new Set();
setB.add(2);
setB.add(3);
setB.add(4);
let intersectionAB = setA.intersection(setB);
console.log(intersectionAB.values()); */
/* let setA = new Set();
setA.add(1);
setA.add(2);
setA.add(3);
let setB = new Set();
setB.add(2);
setB.add(3);
setB.add(4);
let differenceAB = setA.difference(setB);
console.log(differenceAB.values()); */
let setA = new Set();
setA.add(1);
setA.add(2)
let setB = new Set();
setB.add(1);
setB.add(2);
setB.add(3);
let setC = new Set();
setC.add(2);
setC.add(3);
setC.add(4);
console.log(setA.subset(setB));
console.log(setA.subset(setC));
console.log(setC.values())