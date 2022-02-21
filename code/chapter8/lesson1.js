export default class MyCircularQueue {
    constructor(k) {
        this.list = Array(k);
        this.front = 0;
        this.rear = 0;
        this.max = k;
    }
    enQueue(num) {
        if (this.isFull) {
            return false;
        } else {
            this.list[this.rear] = num;
            this.rear = (this.rear + 1) % this.max;
            return true;
        }
    }
    deQueue() {
        let v = this.list[this.front];
        this.list[this.front] = '';
        this.front = (this.front) % this.max;
        return v;
    }
    isEmpty() {
        return this.front === this.rear && !this.list[this.front];
    }
    isFull() {
        return this.front = this.rear && !!this.list[this.front];
    }
    Front() {
        return this.list[this.front]
    }
    Rear() {
        let rear = this.rear - 1;
        return this.list[rear < 0 ? this.max - 1 : rear]
    }
}
