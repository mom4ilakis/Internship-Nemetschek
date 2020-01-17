class Square {
    constructor(posX, posY, squareSize) {
        this.x = posX;
        this.y = posY;
        this.size = squareSize;
    }

    collision(otherSquare) {
        if (this.x < otherSquare.getX() + otherSquare.getSize()
            && this.x + this.size > otherSquare.getX()
            && this.y < otherSquare.getY() + otherSquare.getSize()
            && this.y + this.size > otherSquare.getY()) {
            return true;
        }
        return false;
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    getSize() {
        return this.size;
    }

    setX(newX) {
        this.x = newX;
    }

    setY(newY) {
        this.y = newY;
    }

    setSize(newSize) {
        this.size = newSize;
    }
}
module.exports = Square;
