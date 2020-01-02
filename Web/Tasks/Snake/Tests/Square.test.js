const Square = require('../square');

describe('Square tests', () => {
    describe('Sqare creation', () => {
        test('Creating test', () => {
            const sq = new Square(0, 0, 10);
            expect(sq.getX()).toEqual(0);
            expect(sq.getY()).toEqual(0);
            expect(sq.getSize()).toEqual(10);
        });
    });
    describe('Collision tests', () => {
        test('collide', () => {
            const sq1 = new Square(0, 0, 100);
            const sq2 = new Square(10, 10, 100);
            expect(sq1.collision(sq2)).toBeTruthy();
        });
        test('do not collide', () => {
            const sq1 = new Square(0, 0, 100);
            const sq2 = new Square(101, 101, 100);
            expect(sq1.collision(sq2)).toBeFalsy();
        });
    });
});
