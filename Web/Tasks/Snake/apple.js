var Apple = function(gameBoard, appleEnergy, x, y) {

    let energy = appleEnergy;
    let board = gameBoard;
    let posX = x;
    let posY = y;

    function collide(snake) {
        snake.changeEnergy(energy);
        //tell board that the apple has been eated
    }

    function draw() {
        //board holds the canvas
    }





};
