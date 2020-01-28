class Game {
    constructor() {
        this.canvas = document.getElementById('gameField');
        this.board = new Board(this.canvas);
        this.paused = false;
        this.framesToSkip = 20;
        this.framesCount = 0;
        this.pause = this.pause.bind(this);
        this.start = this.start.bind(this);
        this.gameLoop = this.gameLoop.bind(this);
        this.setSnakeDirection = this.setSnakeDirection.bind(this);
        this.restart = this.restart.bind(this);
        document.getElementById('startBtn').addEventListener('click', this.start);
        window.addEventListener('keydown', this.setSnakeDirection);
    }

    setSnakeDirection(event) {
        this.board.handleMovement(event);
    }

    pause() {
        this.paused = true;
    }

    restart() {
        this.board.snake = new Snake(this.canvas, 144, 144, 30);
        this.board.placeNewApple();
        this.paused = false;
    }

    onDeath() {
        this.board.clearCanvas();
        const context = this.canvas.getContext('2d');
        context.fillStyle = 'red';
        context.font = 'bold 48px Arial';
        context.fillText('You died!', this.canvas.width / 2, this.canvas.height / 2);
        this.pause();
        const restartBtn = document.getElementById('restartBtn') || document.createElement('button');
        restartBtn.setAttribute('id', 'restartBtn');
        restartBtn.addEventListener('click', this.restart);
        restartBtn.innerHTML = 'Restart';
        document.getElementById('area').append(restartBtn);
    }

    notify(msg) {
        switch (msg) {
        case 'ateApple':
            this.framesToSkip -= this.board.snake.length;
            break;
        case 'death':
            this.onDeath();
            break;
        default:
            break;
        }
    }

    start() {
        const pauseBnt = document.getElementById('pauseBtn') || document.createElement('button');
        pauseBnt.setAttribute('id', 'pauseBtn');
        pauseBnt.addEventListener('click', this.pause);
        pauseBnt.innerHTML = 'Pause';
        document.getElementById('area').append(pauseBnt);
        const startBtn = document.getElementById('startBtn');
        startBtn.removeEventListener('click', this.start);
        this.board.snake.subscribe(this);
        this.gameLoop();
    }

    gameLoop(timestamp) {
        if (!this.paused) {
            if (this.framesCount === this.framesToSkip) {
                this.board.updateBoardObjects();
                this.framesCount = 0;
            }
        }
        this.framesCount++;
        document.getElementById('collDetec').innerHTML = `${this.framesCount}\n${this.paused}`;
        window.requestAnimationFrame(this.gameLoop);
    }
}
