// const Square = require('./this.square');

class Apple {
    constructor(gameBoard, appleEnergy, x, y, appleSize = 20) {
        this.board = gameBoard;
        this.square = new Square(x, y, appleSize);
        this.observers = [];
    }

    subscribe(newObserver) {
        this.observers.push(newObserver);
    }

    unsubscribe(oldObserver) {
        this.observers = this.observers.filter(obs => obs !== oldObserver);
    }

    notify(msg, ...others) {
        this.observers.forEach(observer => {
            observer.notify(msg, ...others);
        });
    }

    collide(snake) {
        if (this.square.collision(snake.getHead())) {
            this.notify('ateApple', this);
        }
    }

    getX() {
        return this.square.getX();
    }

    getY() {
        return this.square.getY();
    }

    setX(newX) {
        this.square.setX(newX);
    }

    setY(newY) {
        this.square.setY(newY);
    }

    draw() {
        const contex = this.board.getContext('2d', { alpha: false });
        contex.fillStyle = 'red';
        contex.fillRect(this.square.getX(), this.square.getY(),
            this.square.getSize(), this.square.getSize());
    }

    getSize() {
        return this.square.getSize();
    }
}
module.exports = Apple;
