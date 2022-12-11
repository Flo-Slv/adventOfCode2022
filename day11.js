import fetchData from './fetchData.js';

const func = async () => {
	// let data = await fetchData('11');
	// data = data.split('\n');

	// Website example.
	let dataTest = `Monkey 0:
  Starting items: 79, 98
  Operation: new = old * 19
  Test: divisible by 23
    If true: throw to monkey 2
    If false: throw to monkey 3

Monkey 1:
  Starting items: 54, 65, 75, 74
  Operation: new = old + 6
  Test: divisible by 19
    If true: throw to monkey 2
    If false: throw to monkey 0

Monkey 2:
  Starting items: 79, 60, 97
  Operation: new = old * old
  Test: divisible by 13
    If true: throw to monkey 1
    If false: throw to monkey 3

Monkey 3:
  Starting items: 74
  Operation: new = old + 3
  Test: divisible by 17
    If true: throw to monkey 0
    If false: throw to monkey 1`;

	console.log({dataTest});

	// Parsing
	dataTest = dataTest.split('\n\n').map(n => {
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
			test: Number(n[3].trim().split(' ').slice(-1)),
			monkeyIfTrue: Number(n[4].trim().split(' ').slice(-1)),
			monkeyIfFalse: Number(n[5].trim().split(' ').slice(-1))
		}
	});

	console.log(dataTest);

	const partOne = () => {

	};

	console.log('Part 1: ', partOne());
}

func();
