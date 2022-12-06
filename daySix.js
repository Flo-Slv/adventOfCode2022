import fetchData from './fetchData.js';

const func = async () => {
	let data = await fetchData('6');
	data = data.split('\n');
	data = data[0].split('');

	// Part 1
	let firstPart = '';
	for (let i = 0; i <= data.length - 4; i++) {
		const first = data[i];
		const second = data[i + 1];
		const third = data[i + 2];
		const fourth = data[i + 3];

		const arr = [first, second, third, fourth];

		const res = arr.reduce((acc, curr) => {
			if (acc === Boolean(false) || acc.includes(curr)) return Boolean(false);

			return acc + curr;
		}, '');

		if (res) {
			firstPart = i + 4;
			break;
		}
	}

	console.log({firstPart});

	// Part 2
	let secondPart = '';
	for (let i = 0; i <= data.length - 14; i++) {
		const arr = data.slice(i, i + 14);

		const res = arr.reduce((acc, curr) => {
			if (acc === Boolean(false) || acc.includes(curr)) return Boolean(false);

			return acc + curr;
		}, '');

		if (res) {
			secondPart = i + 14;
			break;
		}
	}

	console.log({secondPart});

	// Method 2 - ThomPuce & Synnv - not return right result...
	(async () => {
		let input = await fetch("https://adventofcode.com/2022/day/6/input")
			.then(r => r.text())
			.then(r => r.trim());

		console.log(
			[...Array(input.length - 13).keys()]
				.map(e => input.slice(e, e + 14))
				.findIndex(e => new Set(e).size == 14) + 14
		);
	})();
};

func();
