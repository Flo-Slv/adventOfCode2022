import fetchData from './fetchData.js';

const func = async () => {
	let data = await fetchData('4');
	data = data.split('\n');

	const sections = data.map(n => n.split(','));

	// const sections = [['5-7', '7-9'], ['2-8', '3-7'], ['6-6', '4-6'], ['2-6', '4-8']];
	// const sections = [['7-9', '5-7'], ['5-7', '7-9'], ['2-8', '3-7'], ['6-6', '4-6'], ['2-6', '4-8']];

	// Part 1
	let count = 0;

	sections.map(n => {
		const firstPart = n[0].split('-');
		const secondPart = n[1].split('-');

		if (
			(parseInt(firstPart[0]) <= parseInt(secondPart[0]) &&
			parseInt(firstPart[1]) >= parseInt(secondPart[1])) ||
			(parseInt(secondPart[0]) <= parseInt(firstPart[0]) &&
			parseInt(secondPart[1]) >= parseInt(firstPart[1]))
		)
			count = count + 1;
	});

	console.log({count});

	// Part 2
	count = 0;

	sections.map(n => {
		const firstPart = n[0].split('-');
		const secondPart = n[1].split('-');

		if (
			(parseInt(firstPart[1]) >= parseInt(secondPart[0]) && parseInt(firstPart[1]) <= parseInt(secondPart[1])) ||
			(parseInt(secondPart[1]) >= parseInt(firstPart[0]) && parseInt(secondPart[1]) <= parseInt(firstPart[1]))
		)
			count = count + 1;
	});

	console.log({count});
}

func();
