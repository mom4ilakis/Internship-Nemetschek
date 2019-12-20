const Snake = require('../snake');

describe('Snake player obj tests', ()=>{
    test('Snake creation', () =>{

        const snake = new Snake('board',0,0,);
        expect(snake.getY()).toBe(0);
        expect(snake.getX()).toBe(0);
        expect(snake.getEnergy()).toBe(1);
        expect(snake.getLength()).toBe(1);

    });
    describe('snake get/set energy tests', () => {
        test('Snake energy lower', ()=> {
            const snake = new Snake('board', 0, 0);
            snake.changeEnergy(0.25);
            expect(snake.getEnergy()).toEqual(1*0.25);
        });
        test('Snake energy increase', () => {
            const snake = new Snake('board', 0, 0);
            snake.changeEnergy(1.25);
            expect(snake.getEnergy()).toEqual(1*1.25);
        });
    });
    describe('snake movement tests', () => {
        describe('basic movement', () => {
            test('snake moving up', () => {
                const snake = new Snake('board', 0, 0);
                snake.moveUp();
                expect(snake.getX()).toEqual(-1);
            });
            test('snake moving down', () =>{
                const snake = new Snake('board', 0, 0);
                snake.moveDown();
                expect(snake.getX()).toEqual(1);
            });
            test('snake moving left',() =>{
                const snake = new Snake('board', 0, 0);
                snake.moveLeft();
                expect(snake.getY()).toEqual(-1);
            });
            test('snake moving right', () => {
                const snake = new Snake('board', 0, 0);
                snake.moveRight();
                expect(snake.getY()).toEqual(1);
            });
        });
    });
});
