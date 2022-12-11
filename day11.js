import fetchData from './fetchData.js';

const func = async () => {
	let data = await fetchData('11');

	// Website example.
// 	let dataTest = `Monkey 0:
//   Starting items: 79, 98
//   Operation: new = old * 19
//   Test: divisible by 23
//     If true: throw to monkey 2
//     If false: throw to monkey 3
//
// Monkey 1:
//   Starting items: 54, 65, 75, 74
//   Operation: new = old + 6
//   Test: divisible by 19
//     If true: throw to monkey 2
//     If false: throw to monkey 0
//
// Monkey 2:
//   Starting items: 79, 60, 97
//   Operation: new = old * old
//   Test: divisible by 13
//     If true: throw to monkey 1
//     If false: throw to monkey 3
//
// Monkey 3:
//   Starting items: 74
//   Operation: new = old + 3
//   Test: divisible by 17
//     If true: throw to monkey 0
//     If false: throw to monkey 1`;

	// Parsing
	let monkeys = data.split('\n\n').map(n => {
	// let monkeys = dataTest.split('\n\n').map(n => {
		n = n.split('\n');

		const startingItems = n[1].trim().split(' ').slice(2);
		const items = [];

		startingItems.forEach(el => {
			if (el.slice(-1) === ',') items.push(Number(el.slice(0, -1)));
			else items.push(Number(el));
		});

		const operationNumber = Number(n[2].trim().split(' ').slice(-1));

		return {
			monkey: Number(n[0].split(' ')[1].split('')[0]),
			items,
			operation: n[2].trim().split(' ')[4],
			operationNumber: isNaN(operationNumber) ? 'old' : operationNumber,
			testNumber: Number(n[3].trim().split(' ').slice(-1)),
			success: Number(n[4].trim().split(' ').slice(-1)),
			failure: Number(n[5].trim().split(' ').slice(-1)),
			inspections: 0
		}
	});

	// Copy for part Two;
	let monkeysPartTwo = structuredClone(monkeys);

	const partOne = () => {
		let round = 0;

		while(round < 20) {
			for (const monkey of monkeys) {
				let worryLevel;

				while(worryLevel = monkey.items.shift()) {
					worryLevel = monkey.operation === '*' && Number.isInteger(monkey.operationNumber)
						? worryLevel * monkey.operationNumber
						: monkey.operation === '+' && Number.isInteger(monkey.operationNumber)
							? worryLevel + monkey.operationNumber
							: monkey.operation === '*' && monkey.operationNumber === 'old'
								? worryLevel * worryLevel
								: worryLevel + worryLevel;

					worryLevel = Math.floor(worryLevel / 3);

					monkey.inspections++;

					if (worryLevel % monkey.testNumber === 0)
						monkeys[monkey.success].items.push(worryLevel);
					else
						monkeys[monkey.failure].items.push(worryLevel);
				}
			}

			round++;
		}

		console.log({monkeys});

		monkeys.sort((a, b) => b.inspections - a.inspections);

		return monkeys[0].inspections * monkeys[1].inspections;
	};

	console.log('Part 1: ', partOne());

	// Part 2
	// Thanks to Synnv for explanations on stream !
	const lcm = monkeysPartTwo.reduce((acc, monkey) => acc * monkey.testNumber, 1);

	const partTwo = () => {
		let round = 0;

		while(round < 10000) {
			for (const monkey of monkeysPartTwo) {
				let worryLevel;

				while(worryLevel = monkey.items.shift()) {
					worryLevel = monkey.operation === '*' && Number.isInteger(monkey.operationNumber)
						? worryLevel * monkey.operationNumber
						: monkey.operation === '+' && Number.isInteger(monkey.operationNumber)
							? worryLevel + monkey.operationNumber
							: monkey.operation === '*' && monkey.operationNumber === 'old'
								? worryLevel * worryLevel
								: worryLevel + worryLevel;

					worryLevel = worryLevel % lcm;

					monkey.inspections++;

					if (worryLevel % monkey.testNumber === 0)
						monkeysPartTwo[monkey.success].items.push(worryLevel);
					else
						monkeysPartTwo[monkey.failure].items.push(worryLevel);
				}
			}

			round++;
		}

		console.log({monkeysPartTwo});
		monkeysPartTwo.sort((a, b) => b.inspections - a.inspections);

		return monkeysPartTwo[0].inspections * monkeysPartTwo[1].inspections;
	};

	console.log('Part 2: ', partTwo());
}

func();
