import fetchData from './fetchData.js';

const func = async () => {
	const data = await fetchData('3');
	const val = data.split('\n');

	// Part 1
	const lowercase = 'abcdefghijklmnopqrstuvwxyz';
	const uppercase = lowercase.toUpperCase();

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

	let total = 0;

	items.map(n => {
		if (lowercase.includes(n))
			return total = total + lowercase.indexOf(n) + 1;

		if (uppercase.includes(n))
			return total = total + uppercase.indexOf(n) + 27;
	});

	console.log({total});

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

	let total2 = 0;
	it.map(n => {
		if (lowercase.includes(n))
		return total2 = total2 + lowercase.indexOf(n) + 1;

		if (uppercase.includes(n))
		return total2 = total2 + uppercase.indexOf(n) + 27;
	})

	console.log({total2});

	// Method 2
	let newTotal = 0;
	for (let i = 0; i < val.length; i+=3) {
		const first = val[i+0];
		const second = val[i+1];
		const third = val[i+2];

		let l = [...first].find(n => second.includes(n) && third.includes(n));

		console.log('l: ', l);

		// if (lowercase.includes(l))
		// 	return newTotal = newTotal + lowercase.indexOf(l) + 1;
		//
		// if (uppercase.includes(l))
		// 	return newTotal = newTotal + uppercase.indexOf(l) + 27;
	}

	console.log({newTotal});
}

func();
