import Queue from '../Capitulo2/Queus/Queues.js';
import Dictionary from '../Capitulo5/Dictionary/Dictionary.js';
import Stack from '../Capitulo1/Stack/Stack.js';

let adyacentMatrix = [
  [0, 2, 4, 0, 0, 0],
  [2, 0, 2, 4, 2, 0],
  [4, 2, 0, 0, 3, 0],
  [0, 4, 0, 0, 3, 2],
  [0, 2, 3, 3, 0, 2],
  [0, 0, 0, 2, 2, 0],
];

function Graph() {
  this.adyacentMatrix = adyacentMatrix;
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
  let time = 0;
  this.dfs = function () {
    let color = initializeColor(), //{1}
      d = [],
      f = [],
      p = [];
    time = 0;

    for (let i = 0; i < vertices.length; i++) {
      //{3}
      f[vertices[i]] = 0;
      d[vertices[i]] = 0;
      p[vertices[i]] = null;
    }
    for (let i = 0; i < vertices.length; i++) {
      //{2}
      if (color[vertices[i]] === 'white') {
        //{3}
        dfsVisit(vertices[i], color, d, f, p); //{4}
      }
    }

    return {
      discovered: d,
      finished: f,
      predecessors: p,
    };
  };
  //Funcion recursiva para la busqueda profunda
  let dfsVisit = function (u, color, d, f, p) {
    console.log('discovered ' + u);
    color[u] = 'grey';
    d[u] = ++time; //{5}
    let neighbors = adjList.get(u);
    for (let i = 0; i < neighbors.length; i++) {
      let w = neighbors[i];
      if (color[w] === 'white') {
        p[w] = u; //{6}
        dfsVisit(w, color, d, f, p);
      }
    }
    color[u] = 'black';
    f[u] = ++time; //{7}
    console.log('explored ' + u);
  };
  //Busqueda mas corta entre rutas
  this.dijkstra = function (src) {
    let dist = [],
      visited = [],
      length = this.adyacentMatrix.length;
    for (let i = 0; i < length; i++) {
      //{1}
      dist[i] = Infinity;
      visited[i] = false;
    }
    dist[src] = 0; //{2}
    for (let i = 0; i < length - 1; i++) {
      //{3}
      let u = minDistance(dist, visited); //{4}
      visited[u] = true; //{5}
      for (let v = 0; v < length; v++) {
        if (
          !visited[v] &&
          this.adyacentMatrix[u][v] != 0 &&
          dist[u] != Infinity &&
          dist[u] + this.adyacentMatrix[u][v] < dist[v]
        ) {
          //{6}
          dist[v] = dist[u] + this.adyacentMatrix[u][v]; //{7}
        }
      }
    }
    return dist;
  };

  let minDistance = function (dist, visited) {
    let min = Infinity,
      minIndex = -1;

    for (let v = 0; v < dist.length; v++) {
      if (visited[v] == false && dist[v] <= min) {
        min = dist[v];
        minIndex = v;
      }
    }
    return minIndex;
  };

  this.floydWarshall = function () {
    let dist = [],
      length = this.adyacentMatrix.length,
      i,
      j,
      k;
    for (i = 0; i < length; i++) {
      //{1}
      dist[i] = [];
      for (j = 0; j < length; j++) {
        dist[i][j] = this.adyacentMatrix[i][j];
      }
    }
    for (k = 0; k < length; k++) {
      //{2}
      for (i = 0; i < length; i++) {
        for (j = 0; j < length; j++) {
          if (dist[i][k] + dist[k][j] < dist[i][j]) {
            dist[i][j] = dist[i][k] + dist[k][j];
          }
        }
      }
    }
    return dist;
  };

  //MST - Minimun Spanning tree
  this.prim = function () {
    let parent = [],
      key = [],
      visited = [],
      i;
    length = this.adyacentMatrix.length;
    for (i = 0; i < length; i++) {
      //{1}
      key[i] = Number.MAX_SAFE_INTEGER;
      visited[i] = false;
    }
    key[0] = 0; //{1}
    parent[0] = -1;
    for (i = 0; i < length - 1; i++) {
      //{3}
      let u = minDistance(key, visited); //{4}
      visited[u] = true; //{5}
      for (let v = 0; v < length; v++) {
        if (
          this.adyacentMatrix[u][v] &&
          visited[v] == false &&
          this.adyacentMatrix[u][v] < key[v]
        ) {
          //{6}
          parent[v] = u; //{7}
          key[v] = this.adyacentMatrix[u][v]; //{8}
        }
      }
    }
    return parent;
  };
  let find = function (i, parent) {
    while (parent[i]) {
      i = parent[i];
    }
    return i;
  };

  let union = function (i, j, parent) {
    if (i != j) {
      parent[j] = i;
      return true;
    }
    return false;
  };
  
  this.kruskal = function () {
    let length = this.adyacentMatrix.length,
      parent = [],
      cost,
      ne = 0,
      a,
      b,
      u,
      v,
      i,
      j,
      min;
    cost = initializeColor(); //{1}
    while (ne < length - 1) {
      //{2}
      for (i = 0, min = Number.MAX_SAFE_INTEGER; i < length; i++) {
        //{3}
        for (j = 0; j < length; j++) {
          if (cost[i][j] < min) {
            min = cost[i][j];
            u = i;
            v = j;
          }
        }
      }
      u = find(u, parent); //{4}
      v = find(v, parent); //{5}
      if (union(u, v, parent)) {
        //{6}
        ne++;
      }
      cost[u][v] = cost[v][u] = Number.MAX_SAFE_INTEGER;
    }
    return parent;
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
graph.dfs(printNode);
graph = new Graph();
myVertices = ['A', 'B', 'C', 'D', 'E', 'F'];
for (let i = 0; i < myVertices.length; i++) {
  graph.addVertex(myVertices[i]);
}
graph.addEdge('A', 'C');
graph.addEdge('A', 'D');
graph.addEdge('B', 'D');
graph.addEdge('B', 'E');
graph.addEdge('C', 'F');
graph.addEdge('F', 'E');
let result = graph.dfs();

console.log(result);
console.log(graph.dijkstra(0));
console.log(graph.floydWarshall());
console.log(graph.prim());
console.log(graph.kruskal())
