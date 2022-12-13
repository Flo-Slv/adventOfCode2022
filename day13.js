import fetchData from './fetchData.js';

const func = async () => {
	// let data = await fetchData('13');

	// console.log({data});

	// Website example.
	let dataTest = `[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]`;

	// Parsing
	const getInputPartOne = () => {
		let res = [];

		// data.split('\n\n').map(pairs => {
		dataTest.split('\n\n').map(pairs => {
			let [left, right] = pairs.split('\n').map(n => {
				return JSON.parse(n);
			});

			res.push({ left, right });
		});

		return res;
	};

	const getInputPartTwo = () => {
		let res = [];

		// data.split('\n\n').map(pairs => {
		dataTest.split('\n\n').map(pairs => {
			let [left, right] = pairs.split('\n').map(n => {
				return JSON.parse(n);
			});

			res.push({ left, right });
		});

		res.push([[2]], [[6]]);

		return res;
	};
	
	// Part 1
	const compare = (left, right, res) => {
		const leftIsArray = Array.isArray(left);
		const rightIsArray = Array.isArray(right);

		if (leftIsArray && rightIsArray) { // both are arrays.
			let index = 0;

			while(true) {
				if (res.order !== undefined) return;

				// If both ran out of items.
				if (index > left.length - 1 && index > right.length - 1)
					return;

				// Right ran out of items.
				if (index <= left.length - 1 && index > right.length - 1) { 
					res.order = Boolean(false);
					return;
				}

				// Left ran out of items.
				if (index > left.length - 1 && index <= right.length - 1) {
					res.order = Boolean(true);
					return;
				}

				compare(left[index], right[index], res);

				index++;
			}
		} else if (!leftIsArray && rightIsArray) { // left is a number.
			compare([left], right, res);
		} else if (leftIsArray && !rightIsArray) { // right is a number.
			compare(left, [right], res);
		} else { // Both numbers.
			if (left < right) {
				res.order = Boolean(true);
				return;
			}

			if (left > right) {
				res.order = Boolean(false);
				return;
			}
		}
	}

	const getPartOne = () => {
		const input = getInputPartOne();

		let counter = 0;

		input.map((el, i) => {
			let finalRes = {};
			compare(el.left, el.right, finalRes);

			if (finalRes.order) {
				counter = counter + i + 1;
			}
		});

		return counter;
	};

	console.log('Part 1: ', getPartOne());

	// Part 2
	const getPartTwo = () => {
		const input = getInputPartTwo();
		console.log('input part two: ', input);

		let counter = 0;

		input.map((el, i) => {
			let finalRes = {};
			compare(el.left, el.right, finalRes);

			if (finalRes.order) {
				counter = counter + i + 1;
			}
		});

		return counter;
	};

	console.log('Part 2: ', getPartTwo());
};

func();
