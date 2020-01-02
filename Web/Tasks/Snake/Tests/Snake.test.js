const Snake = require('../snake');

const board = {};
board.getContext = jest.fn();
board.getContext.mockReturnValue({ fillRect: jest.fn });
describe('Snake player obj tests', () => {
    test('Snake creation', () => {
        const snake = new Snake(board, 0, 0);
        expect(snake.getY()).toBe(0);
        expect(snake.getX()).toBe(0);
        expect(snake.getEnergy()).toBe(1);
        expect(snake.getLength()).toBe(1);
    });
    describe('snake get/set energy tests', () => {
        test('Snake energy lower', ()=> {
            const snake = new Snake(board, 0, 0);
            snake.changeEnergy(0.25);
            expect(snake.getEnergy()).toEqual(1*0.25);
        });
        test('Snake energy increase', () => {
            const snake = new Snake(board, 0, 0);
            snake.changeEnergy(1.25);
            expect(snake.getEnergy()).toEqual(1*1.25);
        });
    });
    describe('snake get/set pos', () => {
        test('snake getX', () => {
            const snake = new Snake(board, 0, 0);
            expect(snake.getX()).toEqual(0);
        });
        test('snake getY', () => {
            const snake = new Snake(board, 0, 0);
            expect(snake.getY()).toEqual(0);
        });
        test('snake setX', () => {
            const snake = new Snake(board, 0, 0);
            snake.setX(123);
            expect(snake.getX()).toEqual(123);
            expect(snake.getY()).toEqual(0);
        });
        test('snake setY', () => {
            const snake = new Snake(board, 0, 0);
            snake.setY(123);
            expect(snake.getX()).toEqual(0);
            expect(snake.getY()).toEqual(123);
        });
    });
    describe('snake movement tests', () => {
        describe('basic movement', () => {
            test('snake moving up', () => {
                const snake = new Snake(board, 0, 0);
                snake.moveUp();
                expect(snake.getX()).toEqual(-1);
                expect(snake.getY()).toEqual(0);
            });
            test('snake moving down', () =>{
                const snake = new Snake(board, 0, 0);
                snake.moveDown();
                expect(snake.getX()).toEqual(1);
                expect(snake.getY()).toEqual(0);
            });
            test('snake moving left',() =>{
                const snake = new Snake(board, 0, 0);
                snake.moveLeft();
                expect(snake.getX()).toEqual(0);
                expect(snake.getY()).toEqual(-1);
            });
            test('snake moving right', () => {
                const snake = new Snake(board, 0, 0);
                snake.moveRight();
                expect(snake.getX()).toEqual(0);
                expect(snake.getY()).toEqual(1);
            });
        });
        describe('energetic movement' , () => {
            test('snake moving up, higher energy', () => {
                const snake = new Snake(board, 0, 0);
                snake.changeEnergy(1.25);
                snake.moveUp();
                expect(snake.getX()).toEqual(-1.25);
                expect(snake.getY()).toEqual(0);
            });
            test('snake moving up, lower energy', () => {
                const snake = new Snake(board, 0, 0);
                snake.changeEnergy(0.25);
                snake.moveUp();
                expect(snake.getX()).toEqual(-0.25);
                expect(snake.getY()).toEqual(0);
            });
            test('snake moving down, higher energy', () => {
                const snake = new Snake(board, 0, 0);
                snake.changeEnergy(1.25);
                snake.moveDown();
                expect(snake.getX()).toEqual(1.25);
                expect(snake.getY()).toEqual(0);
            });
            test('snake moving down, lower energy', () => {
                const snake = new Snake(board, 0, 0);
                snake.changeEnergy(0.25);
                snake.moveDown();
                expect(snake.getX()).toEqual(0.25);
                expect(snake.getY()).toEqual(0);
            });
            test('snake moving left, high energy', () => {
                const snake = new Snake(board, 0, 0);
                snake.changeEnergy(1.25);
                snake.moveLeft();
                expect(snake.getX()).toEqual(0);
                expect(snake.getY()).toEqual(-1.25);
            });
            test('snake moving left, lower energy', () => {
                const snake = new Snake(board, 0, 0);
                snake.changeEnergy(0.25);
                snake.moveLeft();
                expect(snake.getX()).toEqual(0);
                expect(snake.getY()).toEqual(-0.25);
            });
            test('snake moving right, higher energy', () => {
                const snake = new Snake(board, 0, 0);
                snake.changeEnergy(1.25);
                snake.moveRight();
                expect(snake.getX()).toEqual(0);
                expect(snake.getY()).toEqual(1.25);
            });
            test('snake moving right, lower energy', () => {
                const snake = new Snake(board, 0, 0);
                snake.changeEnergy(0.25);
                snake.moveRight();
                expect(snake.getX()).toEqual(0);
                expect(snake.getY()).toEqual(0.25);
            });
        });
    });
});
