import { Ship } from "./ship.js";

class Square {
	#isHit = false;
	#isMissed = false;
	constructor(ship) {
		this.ship = ship;
	}
	hit() {
		if (!this.#isHit) this.ship.hit();
		this.#isHit = true;
	}
	isHit() {
		return this.#isHit;
	}
	miss() {
		this.#isMissed = true;
	}
	isMissed() {
		return this.#isMissed;
	}
}

export class Gameboard {
	#board;
	#ships = [];
	constructor() {
		this.#board = Array.from({ length: 11 }, () =>
			Array.from({ length: 11 }, () => new Square(null)),
		);
	}
	place(coordsArr, shipLength) {
		let ship = new Ship(shipLength);
		this.#ships.push(ship);
		if (
			coordsArr[0] + shipLength > 11 ||
			coordsArr[0] < 0 ||
			coordsArr[1] < 0 ||
			coordsArr[1] > 11
		)
			throw new Error("Cannot place ship outside grid bounds");
		for (let i = coordsArr[0]; i < coordsArr[0] + shipLength; i++) {
			if (this.at([coordsArr[i], coordsArr[1]])?.ship)
				throw new Error("Cannot place over existing ship");
		}
		for (let i = coordsArr[0]; i < coordsArr[0] + shipLength; i++) {
			this.#board[i][coordsArr[1]] = new Square(ship);
		}
	}
	at(coordsArr) {
		return this.#board?.[coordsArr[0]]?.[coordsArr[1]];
	}
	receiveAttack(coordsArr) {
		if (this.at([coordsArr[0], coordsArr[1]]).ship)
			this.#board[coordsArr[0]][coordsArr[1]].hit();
		else this.#board[coordsArr[0]][coordsArr[1]].miss();
	}
	allSunk() {
		for (let ship of this.#ships) if (!ship.isSunk()) return false;
		return true;
	}
	getRandomCoords() {
		let x = Math.floor(Math.random() * 10 + 1);
		let y = Math.floor(Math.random() * 10 + 1);
		return [x, y];
	}
	alreadyShot(coordsArr) {
		let gameboardSquare = this.at([coordsArr[0], coordsArr[1]]);
		return gameboardSquare.isHit() || gameboardSquare.isMissed();
	}
}
