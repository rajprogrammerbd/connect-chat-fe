type Msg_Type = 'message' | 'user_joined' | 'user_removed' | 'unknown' | "typing"

export type IValues = {
    type: Msg_Type;
    userName: string;
    userId: string;
    message: string;
    timeStamp: Date;
}

class Node {
    public value: IValues;
    public next: null | Node;
    public prev: null | Node;
    
    constructor (val: IValues) {
        this.value = val;
        this.next = null;
        this.prev = null;
    }
}

class LinkedList {
    public head: null | Node;
    public tail: null | Node;
    public length: number;

    constructor () {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    push(val: IValues) {
        const newNode = new Node(val);

        if (this.length === 0) {
            this.head = newNode;
            this.tail = newNode;
            this.length = 1;
            return this;
        }
        
        if (this.tail !== null) {
            this.tail.next = newNode;
            this.tail = newNode;
            this.length++;

            return this;
        }
    }
}

export default LinkedList;
