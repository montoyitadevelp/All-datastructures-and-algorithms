function Queue() {
  let items = [];
  //properties and methods go here

  //Añade un nuevo item al principio de la cola
  this.enqueue = (element) => {
    items.push(element);
  };

  //Remueve el primer elemento de la cola
  this.dequeue = () => {
    return items.shift();
  };

  //Retorna el primer elemento de la cola
  this.front = () => {
    return items[0];
  };

  //True si es vacio, false si no es vacio
  this.isEmpty = () => {
    return items.length == 0;
  };

  //Tamaño de la cola
  this.size = () => {
    return items.length;
  };

  //Mostrar cola
  this.print = () => {
    console.log(items.toString());
  };
}

let queue = new Queue();
console.log(queue.isEmpty());
queue.enqueue('Adrian');
queue.enqueue('Moncho');
queue.enqueue('Mateo');
queue.print();
console.log(queue.size());
console.log(queue.isEmpty());
queue.dequeue();
queue.dequeue();
queue.print();

//Priority queue
function PriorityQueue() {
  let items = [];
  function QueueElement(element, priority) {
    // {1}
    this.element = element;
    this.priority = priority;
  }
  this.enqueue = function (element, priority) {
    let queueElement = new QueueElement(element, priority);
    let added = false;
    for (let i = 0; i < items.length; i++) {
      if (queueElement.priority < items[i].priority) {
        items.splice(i, 0, queueElement);
        added = true;
        break;
      }
    }
    if (!added) {
      items.push(queueElement);
    }
  };

  this.print = function () {
    for (let i = 0; i < items.length; i++) {
      console.log(`${items[i].element} -
        ${items[i].priority}`);
    }
  };
}

let priorityQueue = new PriorityQueue();
priorityQueue.enqueue('Simon', 2);
priorityQueue.enqueue('Aleja', 1);
priorityQueue.enqueue('Fernando', 1);
priorityQueue.print();

//The circular queue Hot Potato Game
function hotPotato(nameList, num) {
  let queue = new Queue();
  for (let i = 0; i < nameList.length; i++) {
    queue.enqueue(nameList[i]);
  }
  let eliminated = '';
  while (queue.size() > 1) {
    for (let i = 0; i < num; i++) {
      queue.enqueue(queue.dequeue());
    }
    eliminated = queue.dequeue();
    console.log(eliminated + ' was eliminated from the Hot Potato game.');
  }
  return queue.dequeue();
}

let names = ['John', 'Jack', 'Camila', 'Ingrid', 'Carl'];
let winner = hotPotato(names, 10);
console.log('The winner is', winner);
