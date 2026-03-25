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
	place(coordsArr, shipLength, isVertical = false) {
		let ship = new Ship(shipLength);
		if (!isVertical) {
			if (
				coordsArr[0] + shipLength > 11 ||
				coordsArr[0] < 0 ||
				coordsArr[1] < 0 ||
				coordsArr[1] >= 11
			)
				throw new Error("Cannot place ship outside grid bounds");
			for (let i = coordsArr[0]; i < coordsArr[0] + shipLength; i++) {
				if (this.at([i, coordsArr[1]])?.ship)
					throw new Error("Cannot place over existing ship");
			}
			for (let i = coordsArr[0]; i < coordsArr[0] + shipLength; i++) {
				this.#board[i][coordsArr[1]] = new Square(ship);
			}
		} else {
			if (
				coordsArr[1] + shipLength > 11 ||
				coordsArr[0] < 0 ||
				coordsArr[1] < 0 ||
				coordsArr[0] >= 11
			)
				throw new Error("Cannot place ship outside grid bounds");
			for (let i = coordsArr[1]; i < coordsArr[1] + shipLength; i++) {
				if (this.at([coordsArr[0], i])?.ship)
					throw new Error("Cannot place over existing ship");
			}
			for (let i = coordsArr[1]; i < coordsArr[1] + shipLength; i++) {
				this.#board[coordsArr[0]][i] = new Square(ship);
			}
		}
		this.#ships.push(ship);
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
	areCoordsValid(coordsArr, shipSize) {
		if (coordsArr[0] + shipSize > 11) return false;
		let coordsCopy = [...coordsArr]; //true copy of the array to modify safely
		for (let i = 0; i < shipSize; i++) {
			if (this.at(coordsCopy)?.ship) return false;
			coordsCopy[0]++;
		}
		//left neighbor
		if (this.at([coordsArr[0] - 1, coordsArr[1]])?.ship) return false;
		//right neighbor
		if (this.at(coordsCopy)?.ship) return false;
		//below neighbor
		coordsCopy = [...coordsArr];
		coordsCopy[0]--; //start from left
		coordsCopy[1]++; //set to below
		for (let i = 0; i <= shipSize + 1; i++) {
			if (this.at(coordsCopy)?.ship) return false; //below
			if (this.at([coordsCopy[0], coordsCopy[1] - 2])?.ship) return false; //above
			coordsCopy[0]++;
		}
		return true;
	}
	getRandomPlacement(
		shipSize,
		validate = this.areCoordsValid, ///dependency injection for easier testing
	) {
		let randomCoords;
		do {
			randomCoords = this.getRandomCoords();
		} while (!validate.call(this, randomCoords, shipSize)); //add missing this binding
		return randomCoords;
	}
	randomizeGameboard() {
		this.place(this.getRandomPlacement(4), 4);
		this.place(this.getRandomPlacement(3), 3);
		this.place(this.getRandomPlacement(3), 3);
		this.place(this.getRandomPlacement(2), 2);
		this.place(this.getRandomPlacement(2), 2);
		this.place(this.getRandomPlacement(2), 2);
		this.place(this.getRandomPlacement(1), 1);
		this.place(this.getRandomPlacement(1), 1);
		this.place(this.getRandomPlacement(1), 1);
		this.place(this.getRandomPlacement(1), 1);
	}
}
