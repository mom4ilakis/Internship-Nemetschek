// const Snake = require('./snake');

class GameBoard {
    constructor(target) {
        this.canvas = target;
        this.loadBtn = document.getElementById('loadBtn');
        this.draw = this.draw.bind(this);
        this.apples = [new Apple(target, 100, 3, 3, 30)];
        this.snake = new Snake(target, 100, 100, 33);
        this.loadBtn.addEventListener('click', this.draw);
        this.addMovementHandling = this.addMovementHandling.bind(this);
        this.handleMovement = this.handleMovement.bind(this);
    }

    addMovementHandling() {
        this.canvas.addEventListener('keydown', this.handleMovement);
    }

    handleMovement(key) {
        switch (key) {
        case 37:
            this.snake.moveLeft();
            this.apples.forEach(apple => {
                apple.collide(this.snake);
            });
            break;// left
        case 38:
            this.snake.moveUp();
            this.apples.forEach(apple => {
                apple.collide(this.snake);
            });
            break;// up
        case 39:
            this.snake.moveRight();
            this.apples.forEach(apple => {
                apple.collide(this.snake);
            });
            break;// right
        case 40:
            this.snake.moveDown();
            this.apples.forEach(apple => {
                apple.collide(this.snake);
            });
            break;// down
        default: break;
        }
    }

    draw() {
        this.snake.draw();
        this.apples.forEach(apple => {
            apple.draw();
        });
    }
}
