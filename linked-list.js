/** Node: node for a singly linked list. */

class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val); // Initialize the list with values from the array 'vals' if provided
  }

  push(val) {
    const newNode = new Node(val); // Create a new node with the given value

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode; // Point the current tail's next to the new node
      this.tail = newNode; // Update the tail to be the new node
    }

    this.length++; // Increase the length of the list
  }

  unshift(val) {
    const newNode = new Node(val); // Create a new node with the given value

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head; // Point the new node's next to the current head
      this.head = newNode; // Update the head to be the new node
    }

    this.length++; // Increase the length of the list
  }

  pop() {
    if (!this.head) return undefined; // If the list is empty, return undefined

    let current = this.head;
    let newTail = current;

    while (current.next) { // Traverse the list until reaching the second-to-last node
      newTail = current;
      current = current.next;
    }

    this.tail = newTail; // Update the tail to be the newTail
    this.tail.next = null; // Set the new tail's next to null
    this.length--; // Decrease the length of the list

    if (this.length === 0) { // If the list becomes empty, reset head and tail
      this.head = null;
      this.tail = null;
    }

    return current.val; // Return the value of the removed node
  }

  shift() {
    if (!this.head) return undefined; // If the list is empty, return undefined

    const shiftedNode = this.head; // Save a reference to the current head
    this.head = shiftedNode.next; // Update the head to be the next node
    this.length--; // Decrease the length of the list

    if (this.length === 0) { // If the list becomes empty, reset head and tail
      this.tail = null;
    }

    return shiftedNode.val; // Return the value of the removed node
  }

  getAt(idx) {
    if (idx < 0 || idx >= this.length) return undefined; // If the index is out of bounds, return undefined

    let count = 0;
    let current = this.head;

    while (count !== idx) { // Traverse the list until reaching the desired index
      current = current.next;
      count++;
    }

    return current.val; // Return the value at the index
  }

  setAt(idx, val) {
    const node = this.getAt(idx); // Get the node at the specified index using the getAt method

    if (node) {
      node.val = val; // Update the value of the node if it exists
      return true;
    }

    return false; // Return false if the index is out of bounds
  }

  insertAt(idx, val) {
    if (idx < 0 || idx > this.length) return false; // If the index is out of bounds, return false

    if (idx === 0) { // If inserting at the beginning, use unshift method
      this.unshift(val);
      return true;
    }

    if (idx === this.length) { // If inserting at the end, use push method
      this.push(val);
      return true;
    }

    const newNode = new Node(val);
    const prevNode = this.getAt(idx - 1); // Get the node before the specified index

    newNode.next = prevNode.next; // Point the new node's next to the next node of the previous node
    prevNode.next = newNode; // Point the previous node's next to the new node
    this.length++; // Increase the length of the list

    return true;
  }

  removeAt(idx) {
    if (idx < 0 || idx >= this.length) return undefined; // If the index is out of bounds, return undefined

    if (idx === 0) { // If removing the first node, use shift method
      return this.shift();
    }

    if (idx === this.length - 1) { // If removing the last node, use pop method
      return this.pop();
    }

    const prevNode = this.getAt(idx - 1); // Get the node before the specified index
    const removedNode = prevNode.next; // Save a reference to the node to be removed

    prevNode.next = removedNode.next; // Point the previous node's next to the node after the removed node
    this.length--; // Decrease the length of the list

    return removedNode.val; // Return the value of the removed node
  }

  average() {
    if (!this.head) return 0; // If the list is empty, return 0

    let sum = 0;
    let count = 0;
    let current = this.head;

    while (current) { // Traverse the list and sum up the values
      sum += current.val;
      current = current.next;
      count++;
    }

    return sum / count; // Return the average by dividing the sum by the number of elements
  }
}
