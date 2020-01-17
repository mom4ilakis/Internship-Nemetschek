// const SnakeSegment = require('./snakeSegment');

const direction = {
    none: 0,
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
        this.body = [new SnakeSegment(this.board, x, y, this.size)];
        this.head = this.body[0];
        this.ate = false;
        this.currentDirection = direction.none;
        this.eatsTail = this.eatsTail.bind(this);
        this.coordinates = document.getElementById('snkCoor');
    }

    notify(msg) {
        this.observers.forEach(observer => {
            observer.notify(msg);
        });
    }

    draw() {
        this.coordinates.innerHTML = `X ${this.head.getX()}\nY:${this.head.getY()}`;
        this.body.forEach((segment => {
            segment.draw();
        }));
    }

    eat() {
        this.ate = true;
    }

    eatsTail() {
        if (this.body.some(segment => this.head !== segment && this.head.collision(segment))) {
            this.notify('death');
        }
    }

    reachedBorder() {
        if (this.head.getX() <= 30 || this.head.getX() >= this.board.width - 30
            || this.head.getY() <= 30 || this.head.getY() >= this.board.height - 30) {
            this.notify('death');
        }
    }

    move() {
        let newHead = null;
        switch (this.currentDirection) {
        case direction.up:
            newHead = new SnakeSegment(this.board, this.head.getX(),
                this.head.getY() - this.size, this.head.getSize());
            break;
        case direction.down:
            newHead = new SnakeSegment(this.board, this.head.getX(),
                this.head.getY() + this.size, this.head.getSize());
            break;
        case direction.left:
            newHead = new SnakeSegment(this.board, this.head.getX() - this.size,
                this.head.getY(), this.head.getSize());
            break;
        case direction.right:
            newHead = new SnakeSegment(this.board, this.head.getX() + this.size,
                this.head.getY(), this.head.getSize());
            break;
        default:
            break;
        }
        this.body.unshift(newHead);
        if (this.ate) {
            this.ate = false;
            this.length++;
        } else {
            this.body.pop();
        }
        this.eatsTail();
        this.reachedBorder();
    }

    moveUp() {
        if (this.currentDirection !== direction.down) {
            this.currentDirection = direction.up;
            // const newHead = new SnakeSegment(this.board, this.head.getX(),
            //     this.head.getY() - this.size, this.head.getSize());

            // this.body.unshift(newHead);
            // this.head = this.body[0];

            // if (this.ate) {
            //     this.ate = false;
            //     this.length++;
            // } else {
            //     this.body.pop();
            // }

            // this.eatsTail();

            // this.reachedBorder();
        }
    }

    moveDown() {
        if (this.currentDirection !== direction.up) {
            this.currentDirection = direction.down;
        }

        //     const newHead = new SnakeSegment(this.board, this.head.getX(),
        //         this.head.getY() + this.size, this.head.getSize());
        //     this.body.unshift(newHead);

        //     this.head = this.body[0];

        //     if (this.ate) {
        //         this.ate = false;
        //         this.length++;
        //     } else {
        //         this.body.pop();
        //     }

        //     this.eatsTail();
        //     this.reachedBorder();
        // }
    }

    moveLeft() {
        if (this.currentDirection !== direction.right) {
            this.currentDirection = direction.left;
        }
        //     const newHead = new SnakeSegment(this.board, this.head.getX() - this.size,
        //         this.head.getY(), this.head.getSize());
        //     this.body.unshift(newHead);
        //     this.head = this.body[0];
        //     if (this.ate) {
        //         this.ate = false;
        //         this.length++;
        //     } else {
        //         this.body.pop();
        //     }
        //     this.eatsTail();
        //     this.reachedBorder();
        // }
    }

    moveRight() {
        if (this.currentDirection !== direction.left) {
            this.currentDirection = direction.right;
        }
        //     const newHead = new SnakeSegment(this.board, this.head.getX() + this.size,
        //         this.head.getY(), this.head.getSize());
        //     this.body.unshift(newHead);

        //     this.head = this.body[0];

        //     if (this.ate) {
        //         this.ate = false;
        //         this.length++;
        //     } else {
        //         this.body.pop();
        //     }
        //     this.eatsTail();
        //     this.reachedBorder();
        // }
    }

    getEnergy() {
        return this.energy;
    }

    changeEnergy(delta) {
        // energy += (delta / 100);

        if (this.energy <= 0) {
            this.energy = 1;
        }
    }

    getLength() {
        return this.length;
    }

    continueMoving() {
        switch (this.currentDirection) {
        case direction.up:
            this.moveUp();
            this.notify('moved');
            break;
        case direction.down:
            this.moveDown();
            this.notify('moved');
            break;
        case direction.left:
            this.moveLeft();
            this.notify('moved');
            break;
        case direction.right:
            this.moveRight();
            this.notify('moved');
            break;
        default:
        }
    }

    getHead() {
        return this.head;
    }

    getBody() {
        return this.body;
    }

    subscribe(newObserver) {
        this.observers.push(newObserver);
    }

    unsubscribe(oldObserver) {
        this.observers = this.observers.filter(obs => obs !== oldObserver);
    }
}
module.exports = Snake;
