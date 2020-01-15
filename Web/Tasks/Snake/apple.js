/* eslint-disable no-var */
// const Square = require('./square');

var Apple = function (gameBoard, appleEnergy, x, y, appleSize = 20) {
    const energy = appleEnergy;
    const board = gameBoard;
    const square = new Square(x, y, appleSize);
    let observers = [];

    function subscribe(newObserver) {
        observers.push(newObserver);
    }
    function unsubscribe(oldObserver) {
        observers = observers.filter(obs => obs !== oldObserver);
    }
    function notify(msg) {
        observers.forEach(observer => {
            observer.notify(msg, this);
        });
    }
    function collide(snake) {
        if (square.collision(snake.getHead())) {
            snake.changeEnergy(energy);
            snake.addLength(1);
            notify('ateApple', this);
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
        const contex = board.getContext('2d', { alpha: false });
        contex.fillStyle = 'red';
        contex.fillRect(square.getX(), square.getY(), square.getSize(), square.getSize());
    }
    return {
        draw,
        getX,
        getY,
        setX,
        setY,
        collide,
        subscribe,
        unsubscribe,
    };
};
module.exports = Apple;
