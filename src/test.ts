// for (let i = '#'; i.length < 8; i += '#') {
// 	console.log(i);
// }

// for (let i = 0; i <= 100; i++) {
// 	if (i % 3 === 0 && i % 5 === 0) {
// 		console.log('FizzBuzz');

// 		continue;
// 	}

// 	if (i % 3 === 0) {
// 		console.log('Fizz');

// 		continue;
// 	}

// 	if (i % 5 === 0) {
// 		console.log('Buzz');

// 		continue;
// 	}

// 	console.log(i);
// }

// const size = 8;

// let board = '';

// for (let y = 0; y < size; y++) {
// 	// line
// 	for (let x = 0; x < size; x++) {
// 		if ((x + y) % 2 == 0) {
// 			board += ' ';
// 		} else {
// 			board += '#';
// 		}
// 	}

// 	board += '\n';
// }

// console.log(board);

// const countChar = (str: string, letter: string): number => {
// 	let count = 0;

// 	for (let i = 0; i <= str.length; i++) {
// 		if (str[i] === letter) {
// 			count++;
// 		}
// 	}

// 	return count;
// };

// console.log(countChar('some Avalue', 'A'));

// const range = (start: number, end: number, step: number = 1): number[] => {
// 	const arr = [];

// 	if (step > 0) {
// 		for (let i = start; i <= end; i += step) {
// 			arr.push(i);
// 		}
// 	} else {
// 		for (let i = end; i <= start; i -= step) {
// 			arr.unshift(i);
// 		}
// 	}

// 	return arr;
// };

// const sum = (arr: number[]): number => {
// 	let result = 0;

// 	for (const i of arr) {
// 		result += i;
// 	}

// 	return result;
// };

// console.log(range(1, 10, 2));
// console.log(sum(range(1, 5)));

// const arr = [1, 2, 3];

// // arr.reverse();

// const reverseArrayInPlace = (arr: any[]): any[] => {
// 	const newArr = [];

// 	for (const i of arr) {
// 		newArr.unshift(i);
// 	}

// 	return newArr;
// };

// // console.log(arr);
// console.log(reverseArrayInPlace(arr));

// const deepEqual = (item1: any, item2: any): boolean => {
// 	if (item1 === null || item2 === null) {
// 		return false;
// 	}

// 	const isObj = typeof item1 === 'object' && typeof item2 === 'object';

// 	if (isObj) {
// 		const item1Keys = Object.keys(item1);
// 		const item2Keys = Object.keys(item2);

// 		if (item1Keys.length !== item2Keys.length) {
// 			return false;
// 		}

// 		for (const key of item1Keys) {
// 			if (!item2Keys.includes(key) || !deepEqual(item1[key], item2[key])) {
// 				return false;
// 			}
// 		}

// 		return true;
// 	}

// 	return item1 === item2;
// };

// const obj1 = {
// 	firstName: 'Jack',
// 	lastName: 'Anderson'
// };
// const obj2 = {
// 	firstName: 'Alex',
// 	lastName: 'Horn'
// };

// console.log(deepEqual(obj1, obj2));

// const arr = [
// 	[1, 2],
// 	[3, 4]
// ];

// const newArr = arr.reduce((a, b) => a.concat(b));

// console.log(newArr);

// class Base {
// 	name: string;

// 	constructor(name: string) {
// 		this.name = name;
// 	}

// 	getName(): string {
// 		return this.name;
// 	}
// }

// class Sub extends Base {
// 	constructor(name: string) {
// 		super(name);
// 	}

// 	getName(): string {
// 		return super.getName();
// 	}
// }

// const obj = new Sub('Jack');

// console.log(obj.getName());
// console.log(Object.hasOwnProperty.call(obj, 'name'));

// class GroupIterator {
// 	group: Group;
// 	position: number;

// 	constructor(group: Group) {
// 		this.group = group;
// 		this.position = 0;
// 	}

// 	next(): any {
// 		if (this.position >= this.group.members.length) {
// 			return {done: true};
// 		} else {
// 			const result = {value: this.group.members[this.position], done: false};

// 			this.position++;

// 			return result;
// 		}
// 	}
// }

// class Group {
// 	members: any[];

// 	constructor() {
// 		this.members = [];
// 	}

// 	add(value: any): void {
// 		if (!this.has(value)) {
// 			this.members.push(value);
// 		}
// 	}

// 	delete(value: any): void {
// 		this.members = this.members.filter((item) => item !== value);
// 	}

// 	has(value: any): boolean {
// 		return this.members.includes(value);
// 	}

// 	static from(collection: any): Group {
// 		const obj = new Group();

// 		for (const item of collection) {
// 			obj.add(item);
// 		}

// 		return obj;
// 	}

// 	[Symbol.iterator](): GroupIterator {
// 		return new GroupIterator(this);
// 	}
// }

// for (const value of Group.from(['a', 'b', 'c'])) {
// 	console.log(value);
// }
