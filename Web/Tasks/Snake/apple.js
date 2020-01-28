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
        if (this.square.collides(snake.getHead().square)) {
            this.notify('ateApple', this);
        }
    }

    draw() {
        const contex = this.board.getContext('2d', { alpha: false });
        contex.fillStyle = 'red';
        contex.fillRect(this.square.x, this.square.y,
            this.square.size, this.square.size);
    }
}
module.exports = Apple;
