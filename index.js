require('dotenv').config();

const cookie = process.env.COOKIE;

const func = async () => {
	const res = await fetch('https://adventofcode.com/2022/day/1/input', {
		method: 'GET',
		headers: {
			'Content-Type': 'text/plain',
			'Cookie': `session=${cookie}`
		},
		credentials: 'include'
		});


	const data = await res.text();

	const val = data.trim().split('\n\n').map(n => n.split('\n'));

	const initial = 0;
	const result = val.map(n => {
		return n.reduce((acc, curr) => {
			return acc + parseInt(curr);
		}, initial);
	});

	console.log(Math.max(...result));
}

func();
