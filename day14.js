import fetchData from './fetchData.js';

const func = async () => {
	// let data = await fetchData('14');

	// Website example.
	let dataTest = `498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9`;

	// Parsing
	const getInput = () => {
		let minX = 1000;
		let maxX = 0;
		let maxY = 0;
		let coordinates = [];

		dataTest.split('\n').map(str => {
			str.split(' -> ')
				.map(n => {
					const [x, y] = n.split(',');

					minX > Number(x) ? minX = Number(x) : minX;

					maxX < Number(x) ? maxX = Number(x) + 1 : maxX;

					maxY < Number(y) ? maxY = Number(y) + 1 : maxY;

					coordinates.push({ x: Number(x), y: Number(y) });
				});
		});

		coordinates = coordinates.sort((a, b) => a.x - b.x);

		const map = Array.from(Array(maxX - minX), () => new Array(maxY));

		return { map, coordinates };
	};

	const drawCave = (map, coordinates) => {
		console.log('coordinates: ', coordinates);
		for (let i = 0; i < map.length; i++) {
			for (let j = 0; j < map[i].length; j++) {
				for (let k = 0; k < coordinates.length; k++) {

					if (i === k && j === coordinates[k].y) {
						console.log({i, j, k});
						console.log('coordinates[k].x', coordinates[k].x);
						console.log('coordinates[k].y', coordinates[k].y);
					}
				}
			}
		}
	};

	// Part 1
	// rock = #
	// air = .

	const getPartOne = () => {
		const { map, coordinates } = getInput();

		const testCave = drawCave(map, coordinates);
	};

	getPartOne();
	// console.log('Part 1: ', getPartOne());
};

func();
