import fetchData from './fetchData.js';

const func = async () => {
	let data = await fetchData('13');

	// Website example.
// 	let dataTest = `[1,1,3,1,1]
// [1,1,5,1,1]
//
// [[1],[2,3,4]]
// [[1],4]
//
// [9]
// [[8,7,6]]
//
// [[4,4],4,4]
// [[4,4],4,4,4]
//
// [7,7,7,7]
// [7,7,7]
//
// []
// [3]
//
// [[[]]]
// [[]]
//
// [1,[2,[3,[4,[5,6,7]]]],8,9]
// [1,[2,[3,[4,[5,6,0]]]],8,9]`;

	// Parsing
	const getInput = part => {
		let res = [];

		// Part one.
		if (part === 'partOne') {
			data.split('\n\n').map(pairs => {
			// dataTest.split('\n\n').map(pairs => {
				let [left, right] = pairs.split('\n').map(n => {
					return JSON.parse(n);
				});

			res.push({ left, right });
			});

			return res;
		}

		// Part two.
		if (part === 'partTwo') {
			res = data
			// res = dataTest
				.replace(/\n\n/g, '\n')
				.split('\n')
				.map(n => JSON.parse(n));

			res.push([[2]], [[6]]);

			return res;
		}

		throw new Error('Wrong part !');
	};
	
	// Part 1
	const compare = (left, right, res) => {
		const leftIsArray = Array.isArray(left);
		const rightIsArray = Array.isArray(right);

		if (leftIsArray && rightIsArray) { // Both are arrays.
			let index = 0;

			while(true) {
				// To avoid edge case.
				if (res.order !== undefined) return;

				// If both arrays ran out of items.
				if (index > left.length - 1 && index > right.length - 1)
					return;

				// Right array ran out of items.
				if (index <= left.length - 1 && index > right.length - 1) { 
					res.order = Boolean(false);
					return;
				}

				// Left array ran out of items.
				if (index > left.length - 1 && index <= right.length - 1) {
					res.order = Boolean(true);
					return;
				}

				compare(left[index], right[index], res);

				index++;
			}
		} else if (!leftIsArray && rightIsArray) { // Left is a number.
			compare([left], right, res);
		} else if (leftIsArray && !rightIsArray) { // Right is a number.
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
		const input = getInput('partOne');

		let counter = 0;

		input.map((pair, i) => {
			const finalRes = {};
			compare(pair.left, pair.right, finalRes);

			if (finalRes.order) counter += i + 1;
		});

		return counter;
	};

	console.log('Part 1: ', getPartOne());

	// Part 2
	const getPartTwo = () => {
		const input = getInput('partTwo');

		let resPartTwo = input.sort((a, b) => {
			const res = {};

			compare(a, b, res);

			if (res.order) return -1;
			else return 1;
		});

		// Each array as a string.
		resPartTwo = resPartTwo.map(n => JSON.stringify(n));

		// Add 1 because index start at 1.
		const two = resPartTwo.indexOf('[[2]]') + 1;
		const six = resPartTwo.indexOf('[[6]]') + 1;

		return two * six;
	};

	console.log('Part 2: ', getPartTwo());
};

func();
