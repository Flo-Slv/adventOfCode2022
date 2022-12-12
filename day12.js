import fetchData from './fetchData.js';

const func = async () => {
	let data = await fetchData('12');
	data = data.split('\n');

	// Website example.
// 	let dataTest = `Sabqponm
// abcryxxl
// accszExk
// acctuvwj
// abdefghi`.split('\n');

	// Parsing - prefer numbers to letters.
	const getInput = () => {
		const res = { startPos: {}, endPos: {}, map: [] };

		res.map = data.map((str, i) => {
		// res.map = dataTest.map((str, i) => {
			return str.split('').map((char, j) => {
				if (char === 'S') {
					res.startPos = { i, j };
					return 0;
				} else if (char === 'E') {
					res.endPos = { i, j };
					return 25;
				} else {
					const currChar = char.charCodeAt(0) - 'a'.charCodeAt(0);
					return currChar;
				}
			});
		});

		return res;
	}

	// Part 1
	// Need to convert coordinate into number.
	const nodeToInt = (i, j) => {
		return i * Math.pow(10, 6) + j;
	};

	// Need to convert number into coordinate.
	const intToNode = int => {
		return {
			i: Math.floor(int / Math.pow(10, 6)),
			j: int % Math.pow(10, 6)
		};
	};

	const getNeighbors = (i, j, map) => {
		const res = [];

		if (i + 1 < map.length && map[i + 1][j] <= map[i][j] + 1)
			res.push(nodeToInt(i + 1, j));

		if (i - 1 >= 0 && map[i - 1][j] <= map[i][j] + 1)
			res.push(nodeToInt(i - 1, j));

		if (j + 1 < map[i].length && map[i][j + 1] <= map[i][j] + 1)
			res.push(nodeToInt(i, j + 1));

		if (j - 1 >= 0 && map[i][j - 1] <= map[i][j] + 1)
			res.push(nodeToInt(i, j - 1));

		return res;
	};

	// See Dijkstra-algorithm.txt for full pseudo code.
	const dijkstra = (map, start, end) => {
		const dist = {};
		const prev = {};
		let q = [];

		// for each vertex v in Graph.Vertices:
		for (let i = 0; i < map.length; i++) {
			for (let j = 0; j < map[i].length; j++) {
				const int = nodeToInt(i, j);

				// dist[v] ← INFINITY
				dist[int] = Infinity;

				// prev[v] ← UNDEFINED
				// No need because already initialize with undefined.

				// add v to Q
				q.push(int);
			}
		}

		// dist[source] ← 0
		dist[nodeToInt(start.i, start.j)] = 0;

		// while Q is not empty:
		while (q.length) {
			let u = null;

			// u ← vertex in Q with min dist[u]
			for (const el of q) {
				if (u === null || dist[el] < dist[u]) {
					u = el;
				}
			}

			// Break if end
			if (u === nodeToInt(end.i, end.j)) break;

			// remove u from q
			q = q.filter(n => n !== u);

			const node = intToNode(u);
			const neighbors = getNeighbors(node.i, node.j, map);

			// for each neighbor v of u still in Q:
			for (const neighbor of neighbors) {
				if (q.includes(neighbor)) {
					// alt ← dist[u] + Graph.Edges(u, v)
					const alt = dist[u] + 1;

					//if alt < dist[v]:
					if (alt < dist[neighbor]) {
						//dist[v] ← alt
						dist[neighbor] = alt;

						// prev[v] ← u
						prev[neighbor] = u;
					}
				}
			}
		}

		// return dist[], prev[]
		return { dist, prev };
	};

	const partOne = () => {
		const input = getInput();

		const res = dijkstra(input.map, input.startPos, input.endPos);
		const dist = res.dist[nodeToInt(input.endPos.i, input.endPos.j)];

		return dist;
	};

	console.log('Part 1: ', partOne());

	// Part 2
	// TO DO !
}

func();
