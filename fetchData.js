import * as dotenv from 'dotenv';
dotenv.config();

const cookie = process.env.COOKIE;

const fetchData = async day => {
	const res = await fetch(`https://adventofcode.com/2022/day/${day}/input`, {
		method: 'GET',
		headers: {
			'Content-Type': 'text/plain',
			'Cookie': `session=${cookie}`
		},
		credentials: 'include'
	});
	
	const data = await res.text();

	return data.trim();
};

export default fetchData;
