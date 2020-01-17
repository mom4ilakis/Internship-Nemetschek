// const Snake = require('./snake');

class GameBoard {
    constructor(target) {
        this.objSize = 30;
        this.canvas = target;
        this.loadBtn = document.getElementById('loadBtn');
        this.draw = this.draw.bind(this);
        this.apple = null;
        this.snake = new Snake(target, 144, 144, this.objSize);
        this.gameOn = false;
        this.addMovementHandling = this.addMovementHandling.bind(this);
        this.handleMovement = this.handleMovement.bind(this);
        this.placeNewApple = this.placeNewApple.bind(this);
        this.snake.subscribe(this);
        this.startGame = this.startGame.bind(this);
        this.loadBtn.addEventListener('click', this.startGame);
        this.gameLoop = this.gameLoop.bind(this);
        this.update = this.update.bind(this);
    }

    update() {
        this.snake.move();
    }

    gameLoop() {
        this.draw();
        window.requestAnimationFrame(this.update);
    }

    clearCanvas() {
        this.canvas.width = this.canvas.width;
    }

    startGame() {
        this.addMovementHandling();
        this.placeNewApple();
        this.gameOn = true;
        this.gameLoop();
    }

    notify(msg, ...others) {
        switch (msg) {
        case 'death':
            delete this.snake;
            delete this.apple;
            this.clearCanvas();
            this.gameOn = false;
            break;
        case 'ateApple':
            this.snake.eat();
            this.placeNewApple();
            this.draw();
            break;
        case 'moved':
            this.apple.collide(this.snake);
            this.draw();
            break;
        default:
        }
    }

    addMovementHandling() {
        window.addEventListener('keydown', this.handleMovement);
    }

    handleMovement(event) {
        switch (event.keyCode) {
        case 37:
            this.snake.moveLeft();
            break;// left
        case 38:
            this.snake.moveUp();
            break;// up
        case 39:
            this.snake.moveRight();
            break;// right
        case 40:
            this.snake.moveDown();
            break;// down
        default:
            break;
        }
    }

    placeNewApple() {
        const x = Math.random() * (this.canvas.width - 2 * this.objSize) + 2 * this.objSize;
        const y = Math.random() * (this.canvas.height - 2 * this.objSize) + 2 * this.objSize;
        const energy = Math.random() * 100;
        const apple = new Apple(this.canvas, energy, x, y, this.objSize);

        this.snake.getBody().forEach(segment => {
            if (segment.collision(apple)) {
                this.placeNewApple();
            }
        });
        apple.subscribe(this);
        this.apple = apple;
    }

    draw() {
        this.clearCanvas();
        const cntx = this.canvas.getContext('2d');
        cntx.fillStyle = 'purple';
        cntx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        cntx.clearRect(30, 30, this.canvas.width - 60, this.canvas.height - 60);
        this.snake.draw();
        this.apple.draw();
    }
}
