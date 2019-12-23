var Apple = function(gameBoard, appleEnergy, x, y, appleSize = 100) {

    let energy = appleEnergy;
    let board = gameBoard;
    let posX = x;
    let posY = y;
    let size = appleSize;

    function collide(snake) {
        const x1, x2, x3, x4;
        const y1, y2, y3, y4;
        x1 = posX;
        y1 = posY;
        x2 = posX + size;
        y2 = posY;
        x3 = posX + size;
        y3 = posY + size;
        x4 = posX;
        x4 = posY + size;

        if(x2 >= snake.getX());
        


    }
    function getX() {
        return posX;
    }
    function getY() {
        return getY;
    }
    function setX(newX) {
        posX = newX;
    }
    function setY(newY) {
        posY = newY;
    }
    function draw() {
        const contex = board.getContex('2d');
        contex.fillStyle = 'red';
        contex.fillRect(posX, posY, size, size);
    }



    return {
        draw : draw,
        getX : getX,
        getY : getY,
        setX : setX,
        setY : setY,
        collide : collide,
    };

};
module.exports = Apple;
