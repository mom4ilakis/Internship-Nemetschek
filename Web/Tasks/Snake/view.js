// const Snake = require('./snake');

const boardLength = 22;
const startingX = 120;
const startingY = 120;

class Board {
    constructor (target, game) {
        this.game = game;
        this.objSize = 30;
        this.canvas = target;
        this.loadBtn = document.getElementById('loadBtn');
        this.draw = this.draw.bind(this);
        this.apple = null;
        this.snakeHasMoved = true;
        this.handleMovement = this.handleMovement.bind(this);
        this.placeNewApple = this.placeNewApple.bind(this);
        this.updateBoardObjects = this.updateBoardObjects.bind(this);
        this.spawnSnake();
        this.placeNewApple();
    }

    spawnSnake () {
        this.snake = new Snake(this.canvas, startingX, startingY, this.objSize);
        this.snake.subscribe(this);
    }

    updateBoardObjects () {
        this.snake.move();
    }

    clearCanvas () {
        this.canvas.width = this.canvas.width;
    }

    notify (msg, ...others) {
        switch (msg) {
        case 'death':
            this.clearCanvas();
            this.game.onDeath();
            break;
        case 'ateApple':
            this.snake.eat();
            this.game.speedUp();
            if (this.snake.lenght === boardLength * boardLength) {
                this.game.onWin();
            }
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

    handleMovement (event) {
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

    placeNewApple () {
        let x = this.objSize * (Math.floor(Math.random() * boardLength) + 1);
        let y = this.objSize * (Math.floor(Math.random() * boardLength) + 1);
        let apple = new Apple(this.canvas, x, y, this.objSize);

        while (this.snake.body.some(segment => segment.collides(apple.square))) {
            x = this.objSize * (Math.floor(Math.random() * boardLength) + 1);
            y = this.objSize * (Math.floor(Math.random() * boardLength) + 1);
            apple = new Apple(this.canvas, x, y, this.objSize);
        }
        apple.subscribe(this);
        this.apple = apple;
    }

    draw () {
        this.clearCanvas();
        const cntx = this.canvas.getContext('2d');
        cntx.fillStyle = 'purple';
        cntx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        cntx.clearRect(this.objSize, this.objSize,
            this.canvas.width - 2 * this.objSize,
            this.canvas.height - 2 * this.objSize);
        this.snake.draw();
        this.apple.draw();
    }
}
