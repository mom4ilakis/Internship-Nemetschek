/* eslint-disable no-var */
var Square = function (posX, posY, squareSize) {
    let x = posX;
    let y = posY;
    let size = squareSize;

    function collision(otherSquare) {
        if (x < otherSquare.getX() + otherSquare.getSize()
            && x + size > otherSquare.getX()
            && y < otherSquare.getY() + otherSquare.getSize()
            && y + size > otherSquare.getY()) {
            return true;
        }
        
        return false;
    }

    function getX() {
        return x;
    }
    function getY() {
        return y;
    }
    function getSize() {
        return size;
    }
    function setX(newX) {
        x = newX;
    }
    function setY(newY) {
        y = newY;
    }
    function setSize(newSize) {
        size = newSize;
    }

    return {
        getSize : getSize,
        getX : getX,
        getY : getY,
        setX : setX,
        setY : setY,
        setSize : setSize,
        collision : collision,
    };
};
module.exports = Square;
