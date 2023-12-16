function DoublyLinkedList() {
  let Node = function (element) {
    this.element = element;
    this.next = null;
    this.prev = null; //NEW
  };
  let length = 0;
  let head = null;
  let tail = null; //NEW

  this.insert = function (position, element) {
    //check for out-of-bounds values
    if (position >= 0 && position <= length) {
      let node = new Node(element),
        current = head,
        previous,
        index = 0;
      if (position === 0) {
        //add on first position
        if (!head) {
          //NEW {1}
          head = node;
          tail = node;
        } else {
          node.next = current;
          current.prev = node; //NEW {2}
          head = node;
        }
      } else if (position === length) {
        //last item //NEW
        current = tail; // {3}
        current.next = node;
        node.prev = current;
        tail = node;
      } else {
        while (index++ < position) {
          //{4}
          previous = current;
          current = current.next;
        }
        node.next = current; //{5}
        previous.next = node;
        current.prev = node; //NEW
        node.prev = previous;
      }
      length++; //update size of list
      return true;
    } else {
      return false;
    }
  };
  this.removeAt = function (position) {
    //look for out-of-bounds values
    if (position > -1 && position < length) {
      let current = head,
        previous,
        index = 0;
      //removing first item
      if (position === 0) {
        head = current.next; // {1}
        //if there is only one item, update tail //NEW
        if (length === 1) {
          // {2}
          tail = null;
        } else {
          head.prev = null; // {3}
        }
      } else if (position === length - 1) {
        //last item //NEW
        current = tail; // {4}
        tail = current.prev;
        tail.next = null;
      } else {
        while (index++ < position) {
          // {5}
          previous = current;
          current = current.next;
        }
        //link previous with current's next - skip it
        previous.next = current.next; // {6}
        current.next.prev = previous; //NEW
      }
      length--;
      return current.element;
    } else {
      return null;
    }
  };
}
