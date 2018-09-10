'use strict';

class _Node {
  constructor(value, next) {
    this.value = value;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }
  // insert at the first position
  insertFirst(item) {
    this.head = new _Node(item, this.head);
  }
  // insert at the last position
  insertLast(item, next = null) {
    if (this.head === null) {
      // if there is no first node, insert it at the first position
      this.insertFirst(item);
    }
    else {
      let tempNode = this.head;
      while(tempNode.next !== null) {
        // filter through nodes until you find the last one
        tempNode = tempNode.next;
      }
      // create the node after the last node
      tempNode.next = new _Node(item, next);
    }
  }
  // find a node and place it before
  insertBefore(item, key) {
    if(this.head === null) {
      return;
    }
    else {
      // start at the head
      let currNode = this.head;
      // keep track of previous
      let prevNode = this.head;

      while (currNode && !(key in currNode.value)) {
        prevNode = currNode;
        currNode = currNode.next;

        if (currNode && key in currNode.value) {
          prevNode.next = new _Node(item, currNode);
        }
      }
    }
  }

  insertAfter(item, key) {
    if (this.head === null) {
      return;
    }
    else {
      let currNode = this.head;
      let prevNode = this.head;

      while (currNode && !(key in currNode.value)) {
        prevNode = currNode;
        currNode = currNode.next;

        if (currNode && key in currNode.value) {
          currNode.next = new _Node(item, currNode.next)
        }
      }
    }
  }

  insertAt(item, position) {
    if (position < 0) {
      throw new Error('Position error');
    }
    if (position === 0) {
      this.insertFirst(item);
    } else {
      let node = this._findNthElement(position - 1);
      const newNode = new _Node(item, null);

      newNode.next = node.next;
      node.next = newNode;
    }
  }
  
  find(item) {
    // start at the head
    let currNode = this.head;
    // if it's empty
    if (!this.head) {
      return null;
    }
    // check for item value
    while (currNode.value !== item) {
      // return null if end of the list
      // and the item is not on the list
      if (currNode.next === null) {
        return null;
      }
      else {
        // keep looking
        currNode = currNode.next;
      }
    }
    // found it
    return currNode;
  }

  remove(item) {
    // if the list is emoty
    if (!this.head) {
      return null;
    }
    // if the node to be removed is head, make the next node head
    if (item in this.head.value) {
      this.head = this.head.next;
      return;
    }
    // start at the head
    let currNode = this.head;
    // keep track of previous
    let prevNode = this.head;

    while(currNode && !(item in currNode.value)) {
      // save the previous node
      prevNode = currNode;
      currNode = currNode.next;
    }
    if (currNode === null) {
      console.log('Item not found');
      return;
    }
    prevNode.next = currNode.next;
  }
}

module.exports = LinkedList;