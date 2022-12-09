import fetchData from './fetchData.js';

const total = tab => {
	const lowercase = 'abcdefghijklmnopqrstuvwxyz';
	const uppercase = lowercase.toUpperCase();

	let total = 0;

	tab.map(n => {
		if (lowercase.includes(n))
			return total = total + lowercase.indexOf(n) + 1;

		if (uppercase.includes(n))
			return total = total + uppercase.indexOf(n) + 27;
	});

	return total;
};

const func = async () => {
	const data = await fetchData('3');
	const val = data.split('\n');

	// Part 1
	const items = [];

	val.map((n, k) => {
		const part1 = n.substring(0, n.length / 2);
		const part2 = n.substring(n.length / 2, n.length);

		for (let i = 0; i < part1.length; i++) {
			for (let j = 0; j < part2.length; j++) {
				if (part1[i] === part2[j]) {
					if (items[k]) continue;
					items[k] = part2[j];
				}
			}
		}
	});

	let firstPart = total(items);
	console.log({firstPart});

	// Part 2
	// Method 1
	let it = [];

	for (let i = 0; i < val.length; i+=3) {
		const first = val[i+0];
		const second = val[i+1];
		const third = val[i+2];

		let found = 0;

		[...first].map(n => {
			if (second.includes(n) && third.includes(n)) {
				if (found === 1) return;
				it.push(n);
				found = 1;
			}
		});
	}

	const secondPartFirstMethod = total(it);
	console.log({secondPartFirstMethod});

	// Method 2
	let letters = [];

	for (let i = 0; i < val.length; i+=3) {
		const first = val[i+0];
		const second = val[i+1];
		const third = val[i+2];

		letters.push(
			[...first].find(n => second.includes(n) && third.includes(n))
		);
	}

	const secondPartSecondMethod = total(letters)
	console.log({secondPartSecondMethod});
}

func();
