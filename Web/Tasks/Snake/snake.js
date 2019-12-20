var Snake = function(gameBoard, x, y) {
    let posX = x;
    let posY = y;
    let energy = 1;
    let length = 1;
    let board = gameBoard;
    let boxSize = 10;
    let direction = {
        none: 0,
        up: 1,
        right: 2,
        down: 3,
        left: 4
    };
    
    let body = [new SnakeSegmnet(board, posX, posY)];

    let currentDirection = direction.none;

    function moveUp() {
        if(currentDirection != direction.down){
            currentDirection = direction.up;
            posX-= (1 * energy);
        }
    }
    function moveDown() {
        if(currentDirection != direction.up){
            currentDirection = direction.down;
            posX+= (1 * energy);
        }
    }
    function moveLeft() {
        if(currentDirection != direction.right){
            currentDirection = direction.left;
            posY-= (1 * energy);
        }
    }
    function moveRight() {
        if(currentDirection != direction.left){
            currentDirection = direction.right;
            posY+=(1 * energy);
        }
    }
    
    function getX() {
        return posX;
    }

    function getY() {
        return posY;
    }

    function getEnergy() {
        return energy;
    }

    function changeEnergy(delta) {
        
        energy*= delta;
        
        if(energy <= 0) {
            energy = 1;
        }
    }

    function getLength() {
        return length;
    }

    function addLength(delta) {
        length+= delta;
        for(let i = 0; i < delta; ++i){
            body.push(new SnakeSegmnet(board, 
                body[i].getX() + boxSize, body[i].getY())+ boxSize);
        }
        
        if(length <= 0 ){
            board.endGame();
        }
    }

    function draw() {
        body.forEach((segment => {
            segment.draw();
        }));
    }

    return {
        moveUp : moveUp,
        moveDown: moveDown,
        moveLeft: moveLeft,
        moveRight: moveRight,
        getX: getX,
        getY: getY,
        getEnergy: getEnergy,
        changeEnergy: changeEnergy,
        getLength: getLength,
        addLength: addLength,
    };
};


module.exports = Snake;