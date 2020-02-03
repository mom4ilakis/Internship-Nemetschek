const baseScore = 25;

class Game {
    constructor () {
        this.canvas = document.getElementById('gameField');
        this.board = new Board(this.canvas, this);
        this.paused = false;
        this.score = 0;
        this.framesToSkip = 20;
        this.framesCount = 0;
        this.pause = this.pause.bind(this);
        this.start = this.start.bind(this);
        this.gameLoop = this.gameLoop.bind(this);
        this.setSnakeDirection = this.setSnakeDirection.bind(this);
        this.restart = this.restart.bind(this);
        this.unpause = this.unpause.bind(this);
        this.keyInput = this.keyInput.bind(this);
        this.onDeath = this.onDeath.bind(this);
        document.getElementById('startBtn').addEventListener('click', this.start);
        window.addEventListener('keydown', this.keyInput);
    }

    draw () {
        this.board.draw();
    }

    keyInput (event) {
        switch (event.keyCode) {
        case 32:// Space
            if (this.paused) {
                this.unpause();
            } else {
                this.pause();
            }
            break;
        case 13: // Enter
            this.restart();
            break;
        default:
            if (!this.paused) {
                this.board.handleMovement(event);
            }
            break;
        }
    }

    setSnakeDirection (event) {
        this.board.handleMovement(event);
        this.updateBoardObjects();
    }

    unpause () {
        this.paused = false;
        document.getElementById('contBtn').removeEventListener('click', this.unpause);
    }

    createContinueButton () {
        const contBtn = document.getElementById('contBtn') || document.createElement('button');
        contBtn.setAttribute('id', 'contBtn');
        contBtn.innerHTML = 'Continue';
        contBtn.addEventListener('click', this.unpause);
        document.getElementById('area').append(contBtn);
    }

    pause () {
        this.paused = true;
        const contex = this.canvas.getContext('2d');
        contex.fillStyle = 'white';
        contex.font = '45px Arial';
        contex.fillText('Paused, press space to continue', 30, this.canvas.height / 2);
        this.createContinueButton();
    }

    restart () {
        this.board.spawnSnake();
        this.board.placeNewApple();
        this.board.clearCanvas();
        this.paused = false;
        this.score = 0;
        this.framesToSkip = 20;
        window.addEventListener('keydown', this.keyInput);
    }

    createRestartButton () {
        const restartBtn = document.getElementById('restartBtn') || document.createElement('button');
        restartBtn.setAttribute('id', 'restartBtn');
        restartBtn.addEventListener('click', this.restart);
        restartBtn.innerHTML = 'Restart';
        document.getElementById('area').append(restartBtn);
    }

    onWin () {
        this.paused = true;
        this.board.clearCanvas();
        const context = this.canvas.getContext('2d');
        context.fillStyle = 'gold';
        context.font = 'bold 50px Arial';
        context.fillText('You win!', this.canvas.width / 2, this.canvas.height / 2);
        this.createRestartButton();
    }

    onDeath () {
        this.board.clearCanvas();
        const text = `You died! Score: ${this.score}`;
        const context = this.canvas.getContext('2d');
        context.fillStyle = 'red';
        context.font = 'bold 20px Arial';
        context.fillText(text, this.canvas.width / 2, this.canvas.height / 2);
        this.paused = true;
        this.createRestartButton();
    }

    speedUp () {
        this.framesToSkip *= 0.96;
    }

    start () {
        const pauseBnt = document.getElementById('pauseBtn') || document.createElement('button');
        pauseBnt.setAttribute('id', 'pauseBtn');
        pauseBnt.addEventListener('click', this.pause);
        pauseBnt.innerHTML = 'Pause';
        document.getElementById('area').append(pauseBnt);
        const startBtn = document.getElementById('startBtn');
        startBtn.removeEventListener('click', this.start);
        this.gameLoop();
    }

    gameLoop () {
        if (!this.paused) {
            this.draw();
            if (this.framesCount >= this.framesToSkip) {
                const multiplier = this.board.snake.length - 1;
                this.score += multiplier * baseScore;
                this.board.updateBoardObjects();
                this.framesCount = 0;
            }
        }
        ++this.framesCount;
        window.requestAnimationFrame(this.gameLoop);
    }
}
