function BinarySearchTree() {
  let Node = function (key) {
    this.key = key;
    this.left = null;
    this.right = null;
  };
  //Padre de todos los nodos
  let root = null;

  //Insertar nodos en el arbol binario de busqueda
  this.insert = function (key) {
    let newNode = new Node(key);
    if (root === null) {
      root = newNode;
    } else {
      insertNode(root, newNode);
    }
  };

  //Helper para agregar un nodo al arbol que sea diferente del root, y que tengan un equilibrio
  let insertNode = function (node, element) {
    if (node === null) {
      node = new Node(element);
    } else if (element < node.key) {
      node.left = insertNode(node.left, element);
      if (node.left !== null) {
        if (heightNode(node.left) - heightNode(node.right) > 1) {
        }
      }
    } else if (element > node.key) {
      node.right = insertNode(node.right, element);
      if (node.right !== null) {
        if (heightNode(node.right) - heightNode(node.left) > 1) {
        }
      }
    }
    return node;
  };
  //Recorrer el arbol en orden ascendente
  this.inOrderTraverse = function (callback) {
    inOrderTraverseNode(root, callback); //{1}
  };
  let inOrderTraverseNode = function (node, callback) {
    if (node !== null) {
      //{2}
      inOrderTraverseNode(node.left, callback); //{3}
      callback(node.key); //{4}
      inOrderTraverseNode(node.right, callback); //{5}
    }
  };

  //Recorre el arbol en orden descendente, pero empieza en el root
  this.preOrderTraverse = function (callback) {
    preOrderTraverseNode(root, callback);
  };

  let preOrderTraverseNode = function (node, callback) {
    if (node !== null) {
      callback(node.key); //{1}
      preOrderTraverseNode(node.left, callback); //{2}
      preOrderTraverseNode(node.right, callback);
    }
  };

  //Recorre el arbol en orden descendente, pero empieza en el nodo izquierdo
  this.postOrderTraverse = function (callback) {
    postOrderTraverseNode(root, callback);
  };

  let postOrderTraverseNode = function (node, callback) {
    if (node !== null) {
      postOrderTraverseNode(node.left, callback);
      postOrderTraverseNode(node.right, callback);
      callback(node.key); //{3}
    }
  };

  //Encontrando el valor minimo del nodo
  this.min = function () {
    return minNode(root); //{1}
  };

  let minNode = function (node) {
    if (node) {
      while (node && node.left !== null) {
        //{2}
        node = node.left; //{3}
      }
      return node.key;
    }
    return null;
  };

  //Encontrando el valor maximo del nodo
  this.max = function () {
    return maxNode(root);
  };

  let maxNode = function (node) {
    if (node) {
      while (node && node.right !== null) {
        //{5}
        node = node.right;
      }
      return node.key;
    }
    return null;
  };

  //Metodo para buscar un nodo en el arbol de busqueda binaria
  this.search = function (key) {
    return searchNode(root, key); //{1}
  };

  let searchNode = function (node, key) {
    if (node === null) {
      //{2}
      return false;
    }
    if (key < node.key) {
      //{3}
      return searchNode(node.left, key); //{4}
    } else if (key > node.key) {
      //{5}
      return searchNode(node.right, key); //{6}
    } else {
      return true; //{7}
    }
  };

  //Remover un nodo 
  this.remove = function (key) {
    root = removeNode(root, key);
  }; //{1}
  let removeNode = function (node, key) {
    if (node === null) {
      //{2}
      return null;
    }
    if (key < node.key) {
      //{3}
      node.left = removeNode(node.left, key); //{4}
      return node; //{5}
    } else if (key > node.key) {
      //{6}
      node.right = removeNode(node.right, key); //{7}
      return node; //{8}
    } else {
      // key is equal to node.key
      //case 1 - a leaf node
      if (node.left === null && node.right === null) {
        //{9}
        node = null; //{10}
        return node; //{11}
      }
      //case 2 - a node with only 1 child
      if (node.left === null) {
        //{12}
        node = node.right; //{13}
        return node; //{14}
      } else if (node.right === null) {
        //{15}
        node = node.left; //{16}
        return node; //{17}
      }
      let findMinNode = function (node) {
        while (node && node.left !== null) {
          node = node.left;
        }
        return node;
      };
      //case 3 - a node with 2 children
      let aux = findMinNode(node.right); //{18}
      node.key = aux.key; //{19}
      node.right = removeNode(node.right, aux.key); //{20}
      return node; //{21}
    }
  };

  //Altura del nodo
  let heightNode = function (node) {
    if (node === null) {
      return -1;
    } else {
      return Math.max(heightNode(node.left), heightNode(node.right)) + 1;
    }
  };

  //Rotacion izquierda -
  let rotationRR = function (node) {
    let tmp = node.right;
    node.right = tmp.left; //{2}
    tmp.left = node; //{3}
    return tmp;
  };

  //Rotacion derecha +
  let rotationLL = function(node) {
    var tmp = node.left; //{1}
    node.left = tmp.right; //{2}
    tmp.right = node; //{3}
    return tmp;
   }
}

let tree = new BinarySearchTree();
tree.insert(11);
tree.insert(7);
tree.insert(15);
tree.insert(5);
tree.insert(3);
tree.insert(9);
tree.insert(8);
tree.insert(10);
tree.insert(13);
tree.insert(12);
tree.insert(14);
tree.insert(20);
tree.insert(18);
tree.insert(25);
tree.insert(6);
function printNode(value) {
  //{6}
  console.log(value);
}
//tree.inOrderTraverse(printNode); <--- Ascendentemente
//tree.preOrderTraverse(printNode) <-- Desciendientemente pero empieza desde el root
//tree.postOrderTraverse(printNode); <-- Desciendientemente pero empieza desde el nodo izquierdo
console.log(tree.min());
console.log(tree.max());
console.log(tree.search(1) ? 'Key 1 found' : 'Key 1 not found');
console.log(tree.search(8) ? 'Key 1 found' : 'Key 1 not found');
