import { Ship } from "./ship.js";

class Square {
	#isHit = false;
	constructor(ship) {
		this.ship = ship;
	}
	hit() {
		this.#isHit = true;
	}
	isHit() {
		return this.#isHit;
	}
}

export class Gameboard {
	#board;
	constructor() {
		this.#board = Array.from(Array(11), () => new Array(11));
	}
	place(coordsArr, shipLength) {
		let ship = new Ship(shipLength);
		if (coordsArr[0] + shipLength > 10)
			throw new Error("Cannot place ship outside grid bounds");
		for (let i = coordsArr[0]; i < coordsArr[0] + shipLength; i++) {
			if (this.at([coordsArr[i], coordsArr[1]]))
				throw new Error("Cannot place over existing ship");
		}
		for (let i = coordsArr[0]; i < coordsArr[0] + shipLength; i++) {
			this.#board[i][coordsArr[1]] = new Square(ship);
		}
	}
	at(coordsArr) {
		return this.#board?.[coordsArr[0]]?.[coordsArr[1]];
	}
}

let gameboard = new Gameboard();

gameboard.place([5, 5], 5);
