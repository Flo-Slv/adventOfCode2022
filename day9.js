import fetchData from './fetchData.js';

const func = async () => {
	// Fetch and parse data.
	let data = await fetchData('9');
	data = data.split('\n').map(n => {
		const [direction, number] = n.split(' ');

		return { direction, move: Number(number) };
	});

	// Website example
// 	let dataTest = `R 4
// U 4
// L 3
// D 1
// R 4
// D 1
// L 5
// R 2`;

	// dataTest = dataTest.split('\n').map(n => {
	// 	const [direction, number] = n.split(' ');
	//
	// 	return {
	// 		direction,
	// 		move: Number(number)
	// 	}
	// })

	// console.log({dataTest});

	// Part 1
	const movesDefinition = {
		R: { x: 1, y: 0 },
		L: { x: -1, y: 0 },
		U: { x: 0, y: 1 },
		D: { x: 0, y: -1 },
	};

	class Point {
		constructor(x, y) {
			this.x = x;
			this.y = y;
		}

		move = direction => {
			const delta = movesDefinition[direction];
			this.x += delta.x;
			this.y += delta.y;
		};

		follow = point => {
			const distance = Math.max(
				Math.abs(this.x - point.x),
				Math.abs(this.y - point.y)
			);

			if (distance > 1) {
				const directionX = point.x - this.x;
				this.x += Math.abs(directionX) === 2 ? directionX / 2 : directionX;

				const directionY = point.y - this.y;
				this.y += Math.abs(directionY) === 2 ? directionY / 2 : directionY;
			}
		};
	}

	const addVisit = (x, y, visitedPositions) => visitedPositions.add(`${x}-${y}`);

	const partOne = () => {
		const head = new Point(0, 0);
		const tail = new Point(0, 0);
		const visitedPositions = new Set();

		addVisit(0, 0, visitedPositions);

		for (const line of data) {
			for (let i = 0; i < line.move; i++) {
				head.move(line.direction);
				tail.follow(head);

				addVisit(tail.x, tail.y, visitedPositions);
			}
		}

		return visitedPositions.size;
	};

	console.log('Part 1: ', partOne());
}; 

func();
