class GameBoard {
    constructor(target) {
        this.target = target;
        this.loadBtn = document.getElementById('loadBtn');
        this.loadBtn.addEventListener('click', this.draw);
        this.draw = this.draw.bind(this);
    }

    draw(percent) {
        console.log('drawing...');
        const canvas = document.getElementById('canvas').getContext('2d');
        const  img = document.getElementById('apple');
        canvas.drawImage(img, 0, 0);
        
    }
}
