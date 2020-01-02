/* eslint-disable no-var */
//const SnakeSegment = require('./snakeSegment');

var Snake = function (gameBoard, x, y, snakeSize) {
    let energy = 1;
    let length = 1;
    const board = gameBoard;
    let size = snakeSize;
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

    function draw() {
        body.forEach((segment => {
            segment.draw();
        }));
    }
    function moveUp() {
        if (currentDirection !== direction.down) {
            currentDirection = direction.up;
            body.forEach(segment => {
                segment.setX(segment.getX() - (1 * energy));
            });
            draw();
        }
    }
    function moveDown() {
        if (currentDirection !== direction.up) {
            currentDirection = direction.down;
            body.forEach(segment => {
                segment.setX(segment.getX() + (1 * energy));
            });
            draw();
        }
    }
    function moveLeft() {
        if (currentDirection !== direction.right) {
            currentDirection = direction.left;
            body.forEach(segment => {
                segment.setY(segment.getY() - (1 * energy));
            });
            draw();
        }
    }
    function moveRight() {
        if (currentDirection !== direction.left) {
            currentDirection = direction.right;
            body.forEach(segment => {
                segment.setY(segment.getY() + (1 * energy));
            });
            draw();
        }
    }
    function setSize(newSize) {
        size = newSize;
        body.forEach(segment => {
            segment.setSize(size);
        });
        draw();
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
        energy *= delta;

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
            board.endGame();
        }
        draw();
    }
    function getHead() {
        return head;
    }
    return {
        moveUp : moveUp,
        moveDown: moveDown,
        moveLeft: moveLeft,
        moveRight: moveRight,
        getX: getX,
        getY: getY,
        setY : setY,
        setX : setX,
        getEnergy: getEnergy,
        changeEnergy: changeEnergy,
        getLength: getLength,
        addLength: addLength,
        draw: draw,
        setSize: setSize,
        getHead: getHead,
    };
};


module.exports = Snake;
