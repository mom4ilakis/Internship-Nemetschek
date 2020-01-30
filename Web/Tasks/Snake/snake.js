// const SnakeSegment = require('./snakeSegment');

const direction = {
    default: 0,
    up: 1,
    right: 2,
    down: 3,
    left: 4,
};

class Snake {
    constructor(gameBoard, x, y, snakeSize) {
        this.length = 1;
        this.board = gameBoard;
        this.size = snakeSize;
        this.observers = [];
        this.snakeHasMoved = true;
        this.body = [new SnakeSegment(this.board, x, y, this.size)];
        this.head = this.body[0];
        this.speed = snakeSize;
        this.ate = false;
        this.currentDirection = direction.default;
        this.eatsTail = this.eatsTail.bind(this);
    }

    notify(msg) {
        this.observers.forEach(observer => {
            observer.notify(msg);
        });
    }

    draw() {
        this.body.forEach((segment => {
            segment.draw();
        }));
    }

    eat() {
        this.ate = true;
    }

    eatsTail() {
        if (this.body.some(segment => this.head !== segment
            && this.head.square.collides(segment.square))) {
            this.notify('death');
        }
    }

    reachedBorder() {
        if (this.head.square.x < this.size
            || this.head.square.x >= this.board.width - this.size
            || this.head.square.y < this.size
            || this.head.square.y >= this.board.height - this.size) {
            this.notify('death');
        }
    }

    move() {
        let newHead = null;
        switch (this.currentDirection) {
        case direction.up:
            newHead = new SnakeSegment(this.board,
                this.head.square.x,
                this.head.square.y - this.speed,
                this.head.square.size);
            break;
        case direction.down:
            newHead = new SnakeSegment(this.board,
                this.head.square.x,
                this.head.square.y + this.speed,
                this.head.square.size);
            break;
        case direction.left:
            newHead = new SnakeSegment(this.board,
                this.head.square.x - this.speed,
                this.head.square.y,
                this.head.square.size);
            break;
        case direction.right:
            newHead = new SnakeSegment(
                this.board, this.head.square.x + this.speed,
                this.head.square.y,
                this.head.square.size,
            );
            break;
        default:
            newHead = this.head;
            break;
        }
        this.snakeHasMoved = true;
        this.body.unshift(newHead);
        this.head = this.body[0];
        if (this.ate) {
            this.ate = false;
            this.length++;
        } else {
            this.body.pop();
        }
        this.notify('moved');
        this.eatsTail();
        this.reachedBorder();
    }

    moveUp() {
        if (this.currentDirection !== direction.down && this.snakeHasMoved) {
            this.currentDirection = direction.up;
            this.snakeHasMoved = false;
        }
    }

    moveDown() {
        if (this.currentDirection !== direction.up && this.snakeHasMoved) {
            this.currentDirection = direction.down;
            this.snakeHasMoved = false;

        }
    }

    moveLeft() {
        if (this.currentDirection !== direction.right && this.snakeHasMoved) {
            this.currentDirection = direction.left;
            this.snakeHasMoved = false;

        }
    }

    moveRight() {
        if (this.currentDirection !== direction.left && this.snakeHasMoved) {
            this.currentDirection = direction.right;
            this.snakeHasMoved = false;
        }
    }

    getEnergy() {
        return this.energy;
    }

    getHead() {
        return this.head;
    }

    subscribe(newObserver) {
        this.observers.push(newObserver);
    }

    unsubscribe(oldObserver) {
        this.observers = this.observers.filter(obs => obs !== oldObserver);
    }
}
module.exports = Snake;
