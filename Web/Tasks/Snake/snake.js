/* eslint-disable no-var */
//const SnakeSegment = require('./snakeSegment');

var Snake = function (gameBoard, x, y, snakeSize) {
    let energy = 1;
    let length = 1;
    const board = gameBoard;
    let size = snakeSize;
    let observers = [];
    const direction = {
        none: 0,
        up: 1,
        right: 2,
        down: 3,
        left: 4,
    };
    const body = [new SnakeSegment(board, x, y, size)];
    const head = body[0];
    let currentDirection = direction.none;
    function notify(msg) {
        observers.forEach(observer => {
            observer.notify(msg);
        });
    }
    function draw() {
        body.forEach((segment => {
            segment.draw();
        }));
    }
    function eatsTail() {
        body.filter(segment => segment !== head).forEach(segment => {
            if (head.collision(segment)) {
                notify('death');
            }
        });
    }
    function reachedBorder() {
        if (head.getX() < 0 || head.getX() > board.widht
            || head.getY() < 0 || head.getY > board.height) {
            notify('death');
        }
    }
    function moveUp() {
        if (currentDirection !== direction.down) {
            currentDirection = direction.up;
            body.forEach(segment => {
                segment.setY(segment.getY() - (1 * energy));
            });
            eatsTail();
            reachedBorder();
        }
    }
    function moveDown() {
        if (currentDirection !== direction.up) {
            currentDirection = direction.down;
            body.forEach(segment => {
                segment.setY(segment.getY() + (1 * energy));
            });
            eatsTail();
            reachedBorder();
        }
    }
    function moveLeft() {
        if (currentDirection !== direction.right) {
            currentDirection = direction.left;
            body.forEach(segment => {
                segment.setX(segment.getX() - (1 * energy));
            });
            eatsTail();
            reachedBorder();
        }
    }
    function moveRight() {
        if (currentDirection !== direction.left) {
            currentDirection = direction.right;
            body.forEach(segment => {
                segment.setX(segment.getX() + (1 * energy));
            });
            eatsTail();
            reachedBorder();
        }
    }
    function setSize(newSize) {
        size = newSize;
        body.forEach(segment => {
            segment.setSize(size);
        });
    }
    function setX(newX) {
        head.setX(newX);
    }
    function setY(newY) {
        head.setY(newY);
    }
    function getX() {
        return head.getX();
    }
    function getY() {
        return head.getY();
    }
    function getEnergy() {
        return energy;
    }
    function changeEnergy(delta) {
        energy *= (delta / 100);

        if (energy <= 0) {
            energy = 1;
        }
    }
    function getLength() {
        return length;
    }
    function addLength(delta) {
        length += delta;
        for (let i = 0; i < delta; ++i) {
            body.push(new SnakeSegment(board,
                body[i].getX() + size, body[i].getY() + size, size));
        }

        if (length <= 0) {
            notify('death');
        }
    }
    function continueMoving() {
        switch (currentDirection) {
        case direction.up:
            moveUp();
            notify('moved');
            break;
        case direction.down:
            moveDown();
            notify('moved');
            break;
        case direction.left:
            moveLeft();
            notify('moved');
            break;
        case direction.right:
            moveRight();
            notify('moved');
            break;
        default:
        }
    }
    function getHead() {
        return head;
    }
    function subscribe(newObserver) {
        observers.push(newObserver);
    }
    function unsubscribe(oldObserver) {
        observers = observers.filter(obs => obs !== oldObserver);
    }
    return {
        moveUp,
        moveDown,
        moveLeft,
        moveRight,
        getX,
        getY,
        setY,
        setX,
        getEnergy,
        changeEnergy,
        getLength,
        addLength,
        draw,
        setSize,
        getHead,
        subscribe,
        unsubscribe,
        continueMoving,
    };
};


module.exports = Snake;
