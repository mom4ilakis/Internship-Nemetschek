// const Snake = require('./snake');

class GameBoard {
    constructor(target) {
        this.objSize = 30;
        this.canvas = target;
        this.loadBtn = document.getElementById('loadBtn');
        this.draw = this.draw.bind(this);
        this.apples = [];
        this.snake = new Snake(target, 100, 100, this.objSize);
        this.addMovementHandling = this.addMovementHandling.bind(this);
        this.handleMovement = this.handleMovement.bind(this);
        this.placeNewApple = this.placeNewApple.bind(this);
        this.snake.subscribe(this);
        this.startGame = this.startGame.bind(this);
        this.loadBtn.addEventListener('click', this.startGame);
    }

    gameLoop() {
        setInterval(() => {
            this.draw();
            this.snake.continueMoving()
        }, 33);
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
            this.gameOn = false;
            break;
        case 'ateApple':
            this.apples = this.apples.filter(apple => apple !== others[0]);
            this.placeNewApple();
            this.draw();
            break;
        case 'moved':
            this.apples.forEach(apple => {
                apple.collide(this.snake);
            });
            this.draw();
            break;
        default:
        }
    }

    addMovementHandling() {
        this.canvas.setAttribute('tabindex', 0);
        this.canvas.addEventListener('keydown', this.handleMovement);
    }

    handleMovement(event) {
        switch (event.keyCode) {
        case 37:
            this.snake.moveLeft();
            this.snake.continueMoving();
            break;// left
        case 38:
            this.snake.moveUp();
            this.snake.continueMoving();
            break;// up
        case 39:
            this.snake.moveRight();
            this.snake.continueMoving();
            break;// right
        case 40:
            this.snake.moveDown();
            this.snake.continueMoving();
            break;// down
        default:
            this.snake.continueMoving();
            break;
        }
    }

    placeNewApple() {
        const x = Math.random() * this.canvas.width;
        const y = Math.random() * this.canvas.height;
        const energy = Math.random() * 100;
        const apple = new Apple(this.canvas, energy, x, y, this.objSize);

        if (apple.collide(this.snake)) {
            this.placeNewApple();
        } else {
            apple.subscribe(this);
            this.apples.push(apple);
        }
    }

    draw() {
        this.canvas.getContext('2d').clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.snake.draw();
        this.apples.forEach(apple => {
            apple.draw();
        });
    }
}
