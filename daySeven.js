import fetchData from './fetchData.js';

const func = async () => {
	let data = await fetchData('7');
	data = data.split('\n');

	// Website example
	// const data = [
	// 	'$ cd /',
	// 	'$ ls',
	// 	'dir a',
	// 	'14848514 b.txt',
	// 	'8504156 c.dat',
	// 	'dir d',
	// 	'$ cd a',
	// 	'$ ls',
	// 	'dir e',
	// 	'29116 f',
	// 	'2557 g',
	// 	'62596 h.lst',
	// 	'$ cd e',
	// 	'$ ls',
	// 	'584 i',
	// 	'$ cd ..',
	// 	'$ cd ..',
	// 	'$ cd d',
	// 	'$ ls',
	// 	'4060174 j',
	// 	'8033020 d.log',
	// 	'5626152 d.ext',
	// 	'7214296 k'
	// ];

	// Parsing
	const createSystem = data => {
		// System: name, isDirectory, size, children, parent.
		const system = {
			name: '/',
			isDirectory: Boolean(true),
			children: []
		};

		let currentNode = system;
		let command = null;

		for (const line of data) {
			// Command
			if (line[0] === '$') {
				command = line.split(' ')[1];

				if (command === 'cd') {
					const arg = line.split(' ')[2];

					if (arg === '/') {
						currentNode = system;
					} else if (currentNode && arg === '..') {
						currentNode = currentNode.parent;
					} else if (currentNode) {
						currentNode = currentNode.children.find(n => n.isDirectory && n.name === arg);
					}
				}
			} else {
				if (command === 'ls') {
					const arg = line.split(' ')[0];
					const name = line.split(' ')[1];

					// Directory
					if (arg === 'dir') {
						currentNode.children.push({
							name,
							isDirectory: Boolean(true),
							children: [],
							parent: currentNode
						});
					}

					// Files
					if (arg !== 'dir') {
						currentNode.children.push({
							name,
							isDirectory: Boolean(false),
							parent: currentNode,
						size: parseInt(arg)
						});
					}
				}
			}
		}

		return system;
	};

	const getSize = (system, callback) => {
		if (!system.isDirectory) return system.size;

		const totalSize = system.children
			.map(n => getSize(n, callback))
			.reduce((acc, curr) => acc + curr, 0);

		callback(totalSize);

		return totalSize;
	};

	const res = createSystem(data);

	// Part 1
	const partOne = () => {
		let total = 0;

		getSize(res, (totalSize) => {
			if (totalSize < 100000) {
				total += totalSize;
			}
		});

		return total;
	};

	console.log(partOne());

	// Part 2
	const partTwo = () => {
		const totalDiskSpace = 70000000;
		const updateSpace = 30000000;

		const usedSpace = getSize(res, () => {});

		const remainingSpace = totalDiskSpace - usedSpace;
		const neededSpace = updateSpace - remainingSpace; 

		let result = [];

		getSize(res, (totalSize) => {
			if (totalSize >= neededSpace) {
				result.push(totalSize);
			}
		});

		return Math.min(...result);
	};

	console.log(partTwo());
};



func();
