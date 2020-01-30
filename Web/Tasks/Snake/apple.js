// const Square = require('./this.square');

function toHex(num) {
    let hex = Number(num).toString(16);
    if (hex.length < 2) {
        hex = `0${hex}`;
    }
    return hex;
}

class Apple {
    constructor(gameBoard, x, y, appleSize = 20) {
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


    calculateColor() {
        let greenCol = Math.floor(this.energy * 255);
        greenCol = greenCol < 127 ? greenCol : 0;

        const red = 'ff';
        const green = toHex(greenCol);
        const blue = '00';

        return `#${red}${green}${blue}`;
    }

    draw() {
        const contex = this.board.getContext('2d', { alpha: false });
        contex.fillStyle = this.calculateColor();
        contex.fillRect(this.square.x, this.square.y,
            this.square.size, this.square.size);
    }
}
module.exports = Apple;
