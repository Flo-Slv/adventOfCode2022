import fetchData from './fetchData.js';

const func = async () => {
	let data = await fetchData('10');
	data = data.split('\n').map(n => {
		const [instruction, number] = n.split(' ');

		return [instruction, Number(number)];
	});

// 	let dataTest = `addx 15
// addx -11
// addx 6
// addx -3
// addx 5
// addx -1
// addx -8
// addx 13
// addx 4
// noop
// addx -1
// addx 5
// addx -1
// addx 5
// addx -1
// addx 5
// addx -1
// addx 5
// addx -1
// addx -35
// addx 1
// addx 24
// addx -19
// addx 1
// addx 16
// addx -11
// noop
// noop
// addx 21
// addx -15
// noop
// noop
// addx -3
// addx 9
// addx 1
// addx -3
// addx 8
// addx 1
// addx 5
// noop
// noop
// noop
// noop
// noop
// addx -36
// noop
// addx 1
// addx 7
// noop
// noop
// noop
// addx 2
// addx 6
// noop
// noop
// noop
// noop
// noop
// addx 1
// noop
// noop
// addx 7
// addx 1
// noop
// addx -13
// addx 13
// addx 7
// noop
// addx 1
// addx -33
// noop
// noop
// noop
// addx 2
// noop
// noop
// noop
// addx 8
// noop
// addx -1
// addx 2
// addx 1
// noop
// addx 17
// addx -9
// addx 1
// addx 1
// addx -3
// addx 11
// noop
// noop
// addx 1
// noop
// addx 1
// noop
// noop
// addx -13
// addx -19
// addx 1
// addx 3
// addx 26
// addx -30
// addx 12
// addx -1
// addx 3
// addx 1
// noop
// noop
// noop
// addx -9
// addx 18
// addx 1
// addx 2
// noop
// noop
// addx 9
// noop
// noop
// noop
// addx -1
// addx 2
// addx -37
// addx 1
// addx 3
// noop
// addx 15
// addx -21
// addx 22
// addx -6
// addx 1
// noop
// addx 2
// addx 1
// noop
// addx -10
// noop
// noop
// addx 20
// addx 1
// addx 2
// addx 2
// addx -6
// addx -11
// noop
// noop
// noop`;
// 	dataTest = dataTest.split('\n').map(n => {
// 		const [instruction, number] = n.split(' ');
//
// 		return [instruction, Number(number)];
// 	});

	// console.log({dataTest});

	// Part 1
	let cycles = 0;
	let signalStrength = 1;

	let res = [];
	let total = 0;

	const partOne = () => {
		data.map(n => {
		// dataTest.map(n => {
			// noop = 1 cycle
			if (n[0] === 'noop') {
				cycles += 1;

				res.push([cycles, signalStrength]);
			}

			// addx = 2 cycles
			if (n[0] === 'addx') {
				for (let j = 0; j < 2; j++) {
					cycles += 1;
					res.push([cycles, signalStrength]);
				}

				signalStrength += n[1];
			}
		});

		for (let i = 0; i < res.length; i++) {
			if (res[i][0] === 20) total += res[i][0] * res[i][1];

			if (res[i][0] === 60) total += res[i][0] * res[i][1];

			if (res[i][0] === 100) total += res[i][0] * res[i][1];

			if (res[i][0] === 140) total += res[i][0] * res[i][1];

			if (res[i][0] === 180) total += res[i][0] * res[i][1];

			if (res[i][0] === 220) total += res[i][0] * res[i][1];
		}

		return total;
	};

	console.log('Part 1: ', partOne());

	// Part 2
	const partTwo = () => {

	};

	console.log('Part 2: ', partTwo());
}

func();
