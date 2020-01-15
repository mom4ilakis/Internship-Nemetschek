/* eslint-disable no-var */
//const SnakeSegment = require('./snakeSegment');

var Snake = function (gameBoard, x, y, snakeSize) {
    let energy = 12;
    let length = 1;
    const board = gameBoard;
    let size = snakeSize;
    let observers = [];
    let displayCoor = document.getElementById('snkCoor');

    const direction = {
        none: 0,
        up: 1,
        right: 2,
        down: 3,
        left: 4,
    };
    const body = [new SnakeSegment(board, x, y, size)];
    const head = body[0];
    let tail = body[body.length - 1];
    let toMove = false;
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
        if (head.getX() <= 0 || head.getX() >= board.widht
            || head.getY() <= 0 || head.getY() >= board.height) {
            notify('death');
        }
    }
    function moveBody() {
        for (let i = 1; i < body.length - 1; ++i) {
            body[i].setX(body[i-1].getX());
            body[i].setY(body[i-1].getY());
        }
    }
    function moveTail() {
        if(toMove){
            if(body.length >= 2){
                tail.setX(body[body.length - 2].getX());
                tail.setY(body[body.length - 2].getY());
            }
        } else {
            toMove = true
        }
    }
    function moveUp() {
        if (currentDirection !== direction.down) {
            currentDirection = direction.up;
            moveBody();
            head.setY(head.getY() - 1 * energy);
            moveTail();
            eatsTail();
            reachedBorder();
        }
    }
    function moveDown() {
        if (currentDirection !== direction.up) {
            currentDirection = direction.down;
            moveBody();
            head.setY(head.getY() + 1 * energy);
            moveTail();
            eatsTail();
            reachedBorder();
        }
    }
    function moveLeft() {
        if (currentDirection !== direction.right) {
            currentDirection = direction.left;
            moveBody();
            head.setX(head.getX() - 1 * energy);
            moveTail();
            eatsTail();
            reachedBorder();
        }
    }
    function moveRight() {
        if (currentDirection !== direction.left) {
            currentDirection = direction.right;
            moveBody();
            head.setX(head.getX() + 1 * energy);
            moveTail();
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
        // energy += (delta / 100);

        if (energy <= 0) {
            energy = 1;
        }
    }
    function getLength() {
        return length;
    }
    function addLength() {
        length += 1;
        
        body.push(new SnakeSegment(board, body[body.length-1].getX(), body[body.length-1].getY(), size));
        tail = body[body.length - 1];
        toMove = false;
    }
    function displayCoordinates() {
        const info =`snake head\nX: ${head.getX()}\nY: ${head.getY()}\nDirection: ${currentDirection}\nEnergy: ${energy}\nLength:${length}`;
        displayCoor.innerHTML = info;
    }
    function continueMoving() {
        switch (currentDirection) {
        case direction.up:
            moveUp();
            displayCoordinates();
            notify('moved');
            break;
        case direction.down:
            moveDown();
            displayCoordinates();
            notify('moved');
            break;
        case direction.left:
            moveLeft();
            displayCoordinates();
            notify('moved');
            break;
        case direction.right:
            moveRight();
            displayCoordinates();
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
