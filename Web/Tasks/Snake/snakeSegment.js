/* eslint-disable no-var */
//const Square = require('./square');

var SnakeSegment = function(Gboard, x, y, segmentSize = 100) {
    const square = new Square(x, y, segmentSize);
    const board = Gboard;
    console.log(board);

    function draw() {
        const context = board.getContext('2d');
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


    return {
        draw : draw,
        getX : getX,
        getY : getY,
        setX : setX,
        setY : setY,
        getSize : getSize,
        setSize : setSize,
    };
};
module.exports = SnakeSegment;
