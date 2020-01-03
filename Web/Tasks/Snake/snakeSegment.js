/* eslint-disable no-var */
//const Square = require('./square');

var SnakeSegment = function(Gboard, x, y, segmentSize = 35) {
    const square = new Square(x, y, segmentSize);
    const board = Gboard;

    function draw() {
        const context = board.getContext('2d', { alpha: false });
        context.fillStyle = 'green';
        context.fillRect(square.getX(), square.getY(), square.getSize(), square.getSize());
    }
    function getSize() {
        return square.getSize();
    }
    function setSize(newSize) {
        if (newSize > 0) {
            square.setSize(newSize);
        }
    }
    function getX() {
        return square.getX();
    }
    function getY() {
        return square.getY();
    }
    function setX(newX) {
        square.setX(newX);
    }
    function setY(newY) {
        square.setY(newY);
    }
    function collision(segment) {
        square.collision(segment);
    }
    return {
        draw,
        getX,
        getY,
        setX,
        setY,
        getSize,
        setSize,
        collision,
    };
};
module.exports = SnakeSegment;
