// const Snake = require('./snake');

class Board {
    constructor(target) {
        this.objSize = 30;
        this.canvas = target;
        this.loadBtn = document.getElementById('loadBtn');
        this.draw = this.draw.bind(this);
        this.apple = null;
        this.snake = new Snake(target, 144, 144, this.objSize);
        this.handleMovement = this.handleMovement.bind(this);
        this.placeNewApple = this.placeNewApple.bind(this);
        this.snake.subscribe(this);
        this.updateBoardObjects = this.updateBoardObjects.bind(this);
        this.placeNewApple();
    }

    updateBoardObjects() {
        this.draw();
        this.snake.move();
    }

    clearCanvas() {
        this.canvas.width = this.canvas.width;
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
        const x = Math.random() * (this.canvas.width - 2 * this.objSize) + this.objSize;
        const y = Math.random() * (this.canvas.height - 2 * this.objSize) + this.objSize;
        const energy = Math.random() * 100;
        const apple = new Apple(this.canvas, energy, x, y, this.objSize);

        this.snake.body.forEach(segment => {
            if (segment.collides(apple)) {
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
