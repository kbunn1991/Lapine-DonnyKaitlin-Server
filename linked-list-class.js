'use strict';
class _DllNode {
  constructor(value, next, prev){
    this.value = value;
    this.next = next;
    this.prev = prev;
  }
}

class LinkedList{
  constructor(){
    this.head = null;
  }

  insertFirst(value){
    if(this.head === null)
      this.head = new _DllNode(value, null, null);
    else{
      const newNode = new _DllNode(value, this.head, null);
      this.head = newNode;
    }
  }

  insertLast(value){
    if(this.head === null)
      this.head = new _DllNode(value, null, null);
    else{
      let curNode = this.head;
      while(curNode.next !== null){
        curNode = curNode.next;
      }
      curNode.next = new _DllNode(value, null, curNode);
    }
  }

  remove(value){
    
    let curNode = this.head;
    let prevNode;

    while(curNode !== null && curNode.value !== value ){
      prevNode = curNode;
      curNode = curNode.next;
    }

    if(curNode === null){
      console.log('Linked list: Could not find val to delete');
      return -1;
    }else{
      prevNode.next = curNode.next;
      //TODO: free old node? maybe
      return 1;
    }
  }

  find(value){
    let curNode = this.head;

    while(curNode.value !== value && curNode !== null){
      curNode = curNode.next;
    }

    if(curNode === null)
      return null;
    else
      return curNode;
  }

  insertBefore(newVal,targetVal){
    let curNode = this.head;
    let prevNode;

    while(curNode !== null && curNode.value !== targetVal ){
      prevNode = curNode;
      curNode = curNode.next;
    }

    if(curNode === null){
      console.log('Linked list: Could not find val to insert before');
      return -1;
    }else if (curNode === this.head){
      let newNode = new _DllNode(newVal, curNode, null);

      this.head = newNode;
    }
    
    else{
      let newNode = new _DllNode(newVal, curNode, prevNode);
      prevNode.next = newNode;
      //TODO: free old node? maybe
      return 1;
    }
  }
  insertAfter(newVal,targetVal){
    let curNode = this.head;
    let nextNode;

    while(curNode !== null && curNode.value !== targetVal ){
      curNode = curNode.next;
      nextNode = curNode.next;

    }

    if(curNode === null){
      console.log('Linked list: Could not find val to insert after');
      return -1;
    }else{
      let newNode = new _DllNode(newVal, curNode.next, curNode.prev);
      curNode.next = newNode;
      //TODO: free old node? maybe
      return 1;
    }
  }
  insertAt(newVal,targetPos){
    let curNode = this.head, counter =0;
    let prevNode = curNode.prev;

    
    while(curNode !== null &&  counter !== targetPos){
      prevNode = curNode;
      curNode = curNode.next;
      counter++;
    }

    if(curNode === null){
      console.log('Linked list: Could not find position to insert at');
      return -1;
    }else if (targetPos ===0){
      let newNode = new _DllNode(newVal, curNode, curNode.prev);

      this.head = newNode;
    }
    
    else{
      let newNode = new _DllNode(newVal, curNode.next, curNode.prev);
      

      prevNode.next = newNode;
      //TODO: free old node? maybe
      return 1;
    }
  }

}

module.exports = LinkedList;