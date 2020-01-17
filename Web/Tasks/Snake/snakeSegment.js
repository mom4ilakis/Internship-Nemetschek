// const Square = require('./square');

class SnakeSegment {
    constructor(Gboard, x, y, segmentSize = 35) {
        this.square = new Square(x, y, segmentSize);
        this.board = Gboard;
    }

    draw() {
        const context = this.board.getContext('2d', { alpha: false });
        context.fillStyle = 'yellow';

        context.fillRect(this.square.getX() - 2, this.square.getY() - 2,
            this.square.getSize() + 4, this.square.getSize() + 4);

        context.fillStyle = 'green';

        context.fillRect(this.square.getX(), this.square.getY(),
            this.square.getSize(), this.square.getSize());
    }

    getSize() {
        return this.square.getSize();
    }

    setSize(newSize) {
        if (newSize > 0) {
            this.square.setSize(newSize);
        }
    }

    getX() {
        return this.square.getX();
    }

    getY() {
        return this.square.getY();
    }

    setX(newX) {
        this.square.setX(newX);
    }

    setY(newY) {
        this.square.setY(newY);
    }

    collision(segment) {
        return this.square.collision(segment);
    }
}
module.exports = SnakeSegment;
