import fetchData from './fetchData.js';

const func = async () => {
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

		for (let line of dataTest.split('\n')) {
			line = line
				.replace(/Sensor at /g, '')
				.replace(/: closest beacon is at /g, '/')
				.split('/');

			let [sensorX, sensorY] = line[0].split(', ');
			let [beaconX, beaconY] = line[1].split(', ');

			res.push({
				sensor: {
					x: Number(sensorX.replace(/x=/g, '')),
					y: Number(sensorY.replace(/y=/g, ''))
				},
				beacon: {
					x: Number(beaconX.replace(/x=/g, '')),
					y: Number(beaconY.replace(/y=/g, ''))
				}
			});
		}

		return res;
	};

	// Part 1
	
	const getPartOne = () => {
		const res = getInput();

		return res;
	};

	console.log('Part 1: ', getPartOne());
};

func();
