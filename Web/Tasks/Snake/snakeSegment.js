var SnakeSegment = function(Gboard, x, y) {
    let posX = x;
    let posY = y;
    let board = Gboard;

    function draw() {
        board.fillRect(posX, posY, 10, 10);
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
    };
};
module.exports = SnakeSegment;