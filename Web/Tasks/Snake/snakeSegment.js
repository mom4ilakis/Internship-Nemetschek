var SnakeSegment = function(Gboard, x, y, segmentSize = 100) {
    let posX = x;
    let posY = y;
    let board = Gboard;
    let size = segmentSize;

    function draw() {
        const context = board.getContext('2d');
        context.fillStyle = 'green';
        context.fillRect(posX, posY, size, size);
    }
    function getSize() {
        return size;
    }
    function setSize(newSize) {
        if(newSize > 0) {
            size = newSize;
        }
    }
    function getX() {
        return posX;
    }
    function getY() {
        return posY;
    }
    function setX(x) {
        posX = x;
    }
    function setY(y) {
        posY = y;
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