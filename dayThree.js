import fetchData from './fetchData.js';

const func = async () => {
	const data = await fetchData('3');

	// Part 1
	const lowercase = 'abcdefghijklmnopqrstuvwxyz';
	const uppercase = lowercase.toUpperCase();

	const items = [];

	data.split('\n').map((n, k) => {
		const part1 = n.substring(0, n.length / 2);
		const part2 = n.substring(n.length / 2, n.length);

		for (let i = 0; i < part1.length; i++) {
			for (let j = 0; j < part2.length; j++) {
				if (part1[i] === part2[j]) {
					if (items[k] && items[k] === part2[j]) continue;
					items[k] = part2[j];
				}
			}
		}
	});

	console.log({items});

	let total = 0;

	items.map(n => {
		if (lowercase.includes(n))
			return total = total + lowercase.indexOf(n) + 1;

		if (uppercase.includes(n))
			return total = total + uppercase.indexOf(n) + 27;
	});

	console.log({total});

	// Part 2 - TO DO !
}

func();
