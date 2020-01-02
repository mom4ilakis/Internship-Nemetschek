/* eslint-disable no-var */
//const Square = require('./square');

var Apple = function (gameBoard, appleEnergy, x, y, appleSize = 100) {
    const energy = appleEnergy;
    const board = gameBoard;
    const square = new Square(x, y, appleSize);

    function collide(snake) {
        if (square.collide(snake.getHead())) {
            snake.changeEnergy(energy);
            snake.addLength(1);
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
    function draw() {
        const contex = board.getContex('2d');
        contex.fillStyle = 'red';
        contex.fillRect(square.getX(), square.getY(), square.getSuze(), square.getSuze());
    }
    return {
        draw: draw,
        getX: getX,
        getY: getY,
        setX: setX,
        setY: setY,
        collide: collide,
    };
};
module.exports = Apple;
