import fetchData from './fetchData.js';

const func = async () => {
	const data = await fetchData('1');

	const val = data.split('\n\n').map(n => n.split('\n'));

	const initial = 0;
	const result = val.map(n => {
		return n.reduce((acc, curr) => {
			return acc + parseInt(curr);
		}, initial);
	});

	// First part.
	const firstResult = Math.max(...result);
	console.log({firstResult});

	// Second part.
	const sortArr = result.sort((a, b) => {
		return b - a;
	});

	const finalResult = sortArr[0] + sortArr[1] + sortArr[2];

	console.log({finalResult});
}

func();
