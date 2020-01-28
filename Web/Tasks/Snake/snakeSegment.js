// const Square = require('./square');

class SnakeSegment {
    constructor(Gboard, x, y, segmentSize = 35) {
        this.square = new Square(x, y, segmentSize);
        this.board = Gboard;
    }

    draw() {
        const context = this.board.getContext('2d', { alpha: false });
        context.fillStyle = 'yellow';

        context.fillRect(this.square.x - 2, this.square.y - 2,
            this.square.size + 4, this.square.size + 4);

        context.fillStyle = 'green';

        context.fillRect(this.square.x, this.square.y,
            this.square.size, this.square.size);
    }

    collides(segment) {
        return this.square.collides(segment);
    }
}
module.exports = SnakeSegment;
