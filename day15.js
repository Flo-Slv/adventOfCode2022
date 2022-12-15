import fetchData from './fetchData.js';

const func = async () => {
	// Puzzle input.
	// let data = await fetchData('15');

	// Website example.
	let dataTest = `Sensor at x=2, y=18: closest beacon is at x=-2, y=15
Sensor at x=9, y=16: closest beacon is at x=10, y=16
Sensor at x=13, y=2: closest beacon is at x=15, y=3
Sensor at x=12, y=14: closest beacon is at x=10, y=16
Sensor at x=10, y=20: closest beacon is at x=10, y=16
Sensor at x=14, y=17: closest beacon is at x=10, y=16
Sensor at x=8, y=7: closest beacon is at x=2, y=10
Sensor at x=2, y=0: closest beacon is at x=2, y=10
Sensor at x=0, y=11: closest beacon is at x=2, y=10
Sensor at x=20, y=14: closest beacon is at x=25, y=17
Sensor at x=17, y=20: closest beacon is at x=21, y=22
Sensor at x=16, y=7: closest beacon is at x=15, y=3
Sensor at x=14, y=3: closest beacon is at x=15, y=3
Sensor at x=20, y=1: closest beacon is at x=15, y=3`;

	// Parsing
	const getInput = () => {
		const res = [];

		// for (let line of data.split('\n')) { // Puzzle input.
		for (let line of dataTest.split('\n')) { // Website example.
			line = line
				.replace(/Sensor at /g, '')
				.replace(/: closest beacon is at /g, '/')
				.split('/');

			let [sensorX, sensorY] = line[0].split(', ');
			let [beaconX, beaconY] = line[1].split(', ');

			sensorX = Number(sensorX.replace(/x=/g, ''));
			sensorY = Number(sensorY.replace(/y=/g, ''));
			beaconX = Number(beaconX.replace(/x=/g, ''));
			beaconY = Number(beaconY.replace(/y=/g, ''));

			res.push({
				sensor: { x: sensorX, y: sensorY },
				beacon: { x: beaconX, y: beaconY },
				manhattanDistance: Math.abs(sensorX - beaconX) + Math.abs(sensorY - beaconY)
			});
		}

		return res;
	};

	// Part 1
	// const getImpossiblesX = (input, row = 2_000_000) => { // Puzzle input
	const getImpossiblesX = (input, row = 10) => { // Website example
		const res = new Set();

		for (const line of input) {
			// Thanks SynnVoid for explanations on your live on Twitch !
			const distanceFromSensorToRow = Math.abs(line.sensor.y - row);
			const nbOfCells = line.manhattanDistance - distanceFromSensorToRow; // Most important to understand !
			// console.log({line, row, distanceFromSensorToRow, nbOfCells});

			if (nbOfCells < 0) continue; // no '#' on the line.

			for (let i = line.sensor.x - nbOfCells; i <= line.sensor.x + nbOfCells; i++) {
				res.add(i);
			}

			// Delete beacons on row.
			for (const line of input) {
				if (line.beacon.y === row) res.delete(line.beacon.x);
			}
		};

		return res;
	};

	const getPartOne = () => {
		const input = getInput();

		const res = getImpossiblesX(input);

		return res.size;
	};

	console.log('Part 1: ', getPartOne());
};

func();
