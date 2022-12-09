import fetchData from './fetchData.js';

const func = async () => {
	let data = await fetchData('5');
	data = data.split('\n');

	// Get instuctions and data.
	const instructions = data.slice(10);
	// const instructions = ['move 3 from 6 to 2'];
	data = data.slice(0, 9);

	// Loop through data to get letters for each stack.
	let stacks = {};

	data.map(n => {
		Array.from(n).map((m, i) => {
			// Check if string is a letter.
			if (m.toLowerCase() !== m.toUpperCase()) {
			if (stacks[i] !== undefined) stacks[i].unshift(m);

			if (stacks[i] === undefined) stacks[i] = [m];
			}
		});
	});

	// Go through keys of each stack to change keys.
	Object.keys(stacks).map((n, i) => {
		// Key 1 doesn't need to change.
		if (n === '1') return;

		// Change keys from 2 to 9 instead of 5, 9, 13, 17, 21, 25, 29 and 33.
		delete Object.assign(stacks, { [i + 1]: stacks[n] })[n];
	});

	let copy = structuredClone(stacks);

	// Part 1
	// Loop through each instruction.
	instructions.map(n => {
		// To avoid \n at the end when we trim.
		n = `${n} `;

		const num = `${n[5]}${n[6]}`;
		const start = `${n[12]}${n[13]}`;
		const end = `${n[17]}${n[18]}`;

		// Loop on each stack.
		for (const [key, value] of Object.entries(stacks)) {
			if (start.trim() === key) {
				for (let i = 0; i < num.trim(); i++) {
					const arrToPush = value.splice(value.length - 1);

					stacks[end.trim()].push(arrToPush[0]);
				}
			}
		}
	});

	// Get last value of each stack.
	let res = [];
	Object.values(stacks).map(n => res.push(n[n.length - 1]))

	// Join to have a string instead of an array.
	res = res.join('');

	console.log('res part 1: ', res);

	// Part 2
	instructions.map(n => {
		// To avoid \n at the end when we trim.
		n = `${n} `;

		const num = `${n[5]}${n[6]}`;
		const start = `${n[12]}${n[13]}`;
		const end = `${n[17]}${n[18]}`;

		// Loop on each stack.
		for (const [key, value] of Object.entries(copy)) {
			if (start.trim() === key) {
				const arrToPush = value.splice(value.length - num.trim());

				copy[end.trim()].push(...arrToPush);
			}
		}
	});

	res = [];
	Object.values(copy).map(n => res.push(n[n.length - 1]))

	// Join to have a string instead of an array.
	res = res.join('');

	console.log('res part 2: ', res);
};

func();
