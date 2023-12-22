import Queue from '../Capitulo2/Queus/Queues.js';
import Dictionary from '../Capitulo5/Dictionary/Dictionary.js';
import Stack from '../Capitulo1/Stack/Stack.js';

function Graph() {
  let vertices = []; //{1}
  let adjList = new Dictionary(); //{2}

  //Añadir un vertice al grafo
  this.addVertex = function (v) {
    vertices.push(v); //{3}
    adjList.set(v, []); //{4}
  };
  //Añadir un arista al grafo
  this.addEdge = function (v, w) {
    adjList.get(v).push(w); //{5}
    adjList.get(w).push(v); //{6}
  };

  //Mostrar el grafo
  this.toString = function () {
    let s = '';
    for (var i = 0; i < vertices.length; i++) {
      //{10}
      s += vertices[i] + ' -> ';
      let neighbors = adjList.get(vertices[i]); //{11}
      for (let j = 0; j < neighbors.length; j++) {
        //{12}
        s += neighbors[j] + ' ';
      }
      s += '\n'; //{13}
    }
    return s;
  };

  //White - Vertices no visitados
  //Gray - Vertices visitados pero no explorados
  //Black - Vertices completamente explorados
  let initializeColor = function () {
    let color = [];
    for (let i = 0; i < vertices.length; i++) {
      color[vertices[i]] = 'white'; //{1}
    }
    return color;
  };
  //Busqueda exhaustiva
  this.bfs = function (v) {
    let color = initializeColor(),
      queue = new Queue(),
      d = [], //{1}
      pred = []; //{2}
    queue.enqueue(v);
    for (let i = 0; i < vertices.length; i++) {
      //{3}
      d[vertices[i]] = 0; //{4}
      pred[vertices[i]] = null; //{5}
    }
    while (!queue.isEmpty()) {
      let u = queue.dequeue(),
        neighbors = adjList.get(u);
      color[u] = 'grey';
      for (let i = 0; i < neighbors.length; i++) {
        let w = neighbors[i];
        if (color[w] === 'white') {
          color[w] = 'grey';
          d[w] = d[u] + 1; //{6}
          pred[w] = u; //{7}
          queue.enqueue(w);
        }
      }
      color[u] = 'black';
    }
    return {
      //{8}
      distances: d,
      predecessors: pred,
    };
  };

  //Busqueda profunda
  this.dfs = function (callback) {
    let color = initializeColor(); //{1}
    for (let i = 0; i < vertices.length; i++) {
      //{2}
      if (color[vertices[i]] === 'white') {
        //{3}
        dfsVisit(vertices[i], color, callback); //{4}
      }
    }
  };
  let dfsVisit = function (u, color, callback) {
    color[u] = 'grey'; //{5}
    if (callback) {
      callback(u);
    }
    let neighbors = adjList.get(u); //{7}
    for (let i = 0; i < neighbors.length; i++) {
      //{8}
      let w = neighbors[i]; //{9}
      if (color[w] === 'white') {
        //{10}
        dfsVisit(w, color, callback); //{11}
      }
    }
    color[u] = 'black'; //{12}
  };
}

let graph = new Graph();
let myVertices = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']; //{7}
for (let i = 0; i < myVertices.length; i++) {
  //{8}
  graph.addVertex(myVertices[i]);
}
graph.addEdge('A', 'B'); //{9}
graph.addEdge('A', 'C');
graph.addEdge('A', 'D');
graph.addEdge('C', 'D');
graph.addEdge('C', 'G');
graph.addEdge('D', 'G');
graph.addEdge('D', 'H');
graph.addEdge('B', 'E');
graph.addEdge('B', 'F');
graph.addEdge('E', 'I');
console.log(graph.toString());

function printNode(value) {
  console.log('Visited vertex: ' + value);
}
graph.bfs(myVertices[0], printNode);

let shortestPathA = graph.bfs(myVertices[0]);
console.log(shortestPathA);

//Encontrando las rutas cortas de BFS
let fromVertex = myVertices[0]; //{9}
for (let i = 1; i < myVertices.length; i++) {
  //{10}
  let toVertex = myVertices[i], //{11}
    path = new Stack(); //{12}
  for (let v = toVertex; v !== fromVertex; v = shortestPathA.predecessors[v]) {
    //{13}
    path.push(v); //{14}
  }
  path.push(fromVertex); //{15}
  let s = path.pop(); //{16}
  while (!path.isEmpty()) {
    //{17}
    s += ' - ' + path.pop(); //{18}
  }
  console.log(s); //{19}
}
graph.dfs(printNode)
