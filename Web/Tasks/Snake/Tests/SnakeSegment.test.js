const SnakeSegment = require('../snakeSegment');

describe('SnakeSegment tests', () => {
    test('SnakeSegment creation', () => {
        const segment = new SnakeSegment('board', 0, 0);
        expect(segment.getX()).toEqual(0);
        expect(segment.getY()).toEqual(0);
        expect(segment.getSize()).toEqual(100);
    });
    describe('SnakeSegment get/set tests', () => {
        test('SnakeSegment getX', () => {
            const segment = new SnakeSegment('board', 0 ,0);
            expect(segment.getX()).toEqual(0);
        });
        test('SnakeSegment getY', () => {
            const segment = new SnakeSegment('board', 0, 0);
            expect(segment.getY()).toEqual(0);
        });
        test('SnakeSegment setX', () => {
            const segment = new SnakeSegment('board', 0, 0);
            segment.setX(123);
            expect(segment.getX()).toEqual(123);
        });
        test('SnakeSegment setY', () => {
            const segment = new SnakeSegment('board', 0, 0);
            segment.setY(123);
            expect(segment.getY()).toEqual(123);
        });
        test('SnakeSegment getSize',  () => {
            const segment = new SnakeSegment('board', 0, 0, 123);
            expect(segment.getSize()).toEqual(123);
        });
        test('SnakeSegment setSize', () => {
            const segment = new SnakeSegment('board', 0, 0, 123);
            segment.setSize(234);
            expect(segment.getSize()).toEqual(234);
        });
    });
});