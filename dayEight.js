import fetchData from './fetchData.js';

const func = async () => {
	// Fetch and parse data.
	let data = await fetchData('8');
	data = data.split('\n').map(line => line.split('').map(tree => Number(tree)));
	
	// Website example.
// 	let data = `30373
// 25512
// 65332
// 33549
// 35390`.split('\n').map(line => line.split('').map(tree => Number(tree)));

	// console.log({data});

	// Part 1
	// Use set to avoid duplicate tree.
	let visibleTrees = new Set();

	const setVisible = (x, y, currTree) => {
		// Right side.
		const rightSide = data[x].slice(y + 1, data[x].length);
		const rightLastIndex = rightSide.length - 1;

		for (let i = 0; i < rightSide.length; i++) {
			if (currTree <= rightSide[i]) break;

			if (currTree > rightSide[i] && i === rightLastIndex)
				visibleTrees.add(`x:${x} y:${y}`);
		}

		// Left side.
		const leftSide = data[x].slice(0, y).reverse();
		const leftLastIndex = leftSide.length - 1;

		for (let i = 0; i < leftSide.length; i++) {
			if (currTree <= leftSide[i]) break;

			if (currTree > leftSide[i] && i === leftLastIndex)
				visibleTrees.add(`x:${x} y:${y}`);
		}

		// Bottom side.
		const bottomSide = data.slice(x + 1).map(n => n[y]);
		const bottomLastIndex = bottomSide.length - 1;

		for (let i = 0; i < bottomSide.length; i++) {
			if (currTree <= bottomSide[i]) break;

			if (currTree > bottomSide[i] && i === bottomLastIndex)
				visibleTrees.add(`x:${x} y:${y}`);
		}

		// Top side.
		const topSide = data.slice(0, x).map(n => n[y]).reverse();
		const topLastIndex = topSide.length - 1;

		for (let i = 0; i < topSide.length; i++) {
			if (currTree <= topSide[i]) break;

			if (currTree > topSide[i] && i === topLastIndex)
				visibleTrees.add(`x:${x} y:${y}`);
		}
	};

	const getVisibleTrees = () => {
		for (let x = 0; x < data.length; x++) {
			for (let y = 0; y < data[x].length; y++) {
				// Edge: add trees of first and last row.
				if (x === 0 || x === data.length - 1)
					visibleTrees.add(`x:${x} y:${y}`);

				// Edge: add first and last tree of each row, except for first and
				// last row.
				if (
					(x !== 0 && x !== data.length - 1) &&
					(y === 0 || y === data[x].length - 1)
				)
					visibleTrees.add(`x:${x} y:${y}`);

				// Add rest of visible trees.
				if (
					(x !== 0 && x !== data.length - 1) &&
					(y !== 0 && y !== data[x].length - 1)
				)
					setVisible(x, y, data[x][y]);
			}
		}

		return visibleTrees.size;
	};

	console.log('Part 1: ', getVisibleTrees());

	// Part 2
	const getScenicSpot = (x, y, currTree) => {
		// Right side.
		let totalRight = 0;
		const rightSide = data[x].slice(y + 1, data[x].length);

		for (let i = 0; i < rightSide.length; i++) {
			if (currTree > rightSide[i]) totalRight += 1;

			if (currTree <= rightSide[i]) {
				totalRight += 1;
				break;
			}
		}

		// Left side.
		let totalLeft = 0;
		const leftSide = data[x].slice(0, y).reverse();

		for (let i = 0; i < leftSide.length; i++) {
			if (currTree > leftSide[i]) totalLeft += 1;

			if (currTree <= leftSide[i]) {
				totalLeft += 1;
				break;
			}
		}

		// Bottom side.
		let totalBottom = 0;
		const bottomSide = data.slice(x + 1).map(n => n[y]);

		for (let i = 0; i < bottomSide.length; i++) {
			if (currTree > bottomSide[i]) totalBottom += 1;

			if (currTree <= bottomSide[i]) {
				totalBottom += 1;
				break;
			}
		}

		// Top side.
		let totalTop = 0;
		const topSide = data.slice(0, x).map(n => n[y]).reverse();

		for (let i = 0; i < topSide.length; i++) {
			if (currTree > topSide[i]) totalTop += 1;

			if (currTree <= topSide[i]) {
				totalTop += 1;
				break;
			}
		}

		return totalRight * totalLeft * totalBottom * totalTop;
	};

	const getScenicScore = () => {
		let max = 0;

		for (let x = 0; x < data.length; x++) {
			for (let y = 0; y < data[x].length; y++) {
				const res = getScenicSpot(x, y, data[x][y]);

				res > max ? max = res : max;
			}
		}

		return max;
	};

	console.log('Part 2: ', getScenicScore());
};

func();
