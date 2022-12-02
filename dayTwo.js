import fetchData from './fetchData.js';

// OPPONENT
// A = Rock
// B = Paper
// C = Scissors

// ME
// X = Rock
// Y = Paper
// Z = Scissors

// 0 lost
// 3 draw
// 6 victory

const func = async () => {
	const data = await fetchData('2');

	// PART 1
	// Method 1
	let res = 0;

	data.split('\n').map(n => {
		const user = n[0];
		const me = n[2];

		if (user === 'A') {
			if (me === 'X') return res = res + 1 + 3;
			if (me === 'Y') return res = res + 2 + 6;
			return res = res + 3;
		} else if (user === 'B') {
			if (me === 'X') return res = res + 1;
			if (me === 'Y') return res = res + 2 + 3;
			return res = res + 3 + 6;
		} else {
			if (me === 'X') return res = res + 1 + 6;
			if (me === 'Y') return res = res + 2;
			return res = res + 3 + 3;
		}
	});
	console.log('part 1 res: ', res);

	// Method 2 - TODO
	
	// PART 2
	// X = defeat
	// Y = draw
	// Z = victory
	
	res = 0;

	data.split('\n').map(n => {
		const user = n[0];
		const me = n[2];

		if (me === 'X') {
			if (user === 'A') return res = res + 3;
			if (user === 'B') return res = res + 1;
			return res = res + 2;
		} else if (me === 'Y') {
			if (user === 'A') return res = res + 1 + 3;
			if (user === 'B') return res = res + 2 + 3;
			return res = res + 3 + 3;
		} else {
			if (user === 'A') return res = res + 2 + 6;
			if (user === 'B') return res = res + 3 + 6;
			return res = res + 1 + 6;
		}
	});

	console.log('part 2 res: ', res);
}

func();
