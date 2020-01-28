class Square {
    constructor(posX, posY, squareSize) {
        this.x = posX;
        this.y = posY;
        this.size = squareSize;
    }

    collides(otherSquare) {
        if (this.x < otherSquare.x + otherSquare.size
            && this.x + this.size > otherSquare.x
            && this.y < otherSquare.y + otherSquare.size
            && this.y + this.size > otherSquare.y) {
            return true;
        }
        return false;
    }
}
module.exports = Square;
