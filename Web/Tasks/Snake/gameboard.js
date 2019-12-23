var gameBoard = function(canvas, snake) {
    let cvs = canvas;
    let apples = [];

    function startGame() {

    }

    function endGame() {

    }
    
    function update() {

    }

    function checkForCollision() {
        apples.forEach((apple) => {
            apple.collide(snake);
        });
    }

    function draw() {
        snake.draw();
        apples.forEach((apple) => {
            apple.draw();
        });
    }
};
