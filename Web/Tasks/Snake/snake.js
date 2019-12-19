var Snake = function(x,y) {
    const posX = x;
    const posY = y;

    moveUp = function() {
    };
    moveDown = function() {

    };
    moveLeft = function() {

    };
    moveRight = function() {

    };
    move = function(dir) {
        switch(dir) {
        case 'up' : moveUp();break;
        case 'down': moveDown();break;
        case 'left': moveLeft();break;
        case 'right': moveRight();break;
        }
    };



}