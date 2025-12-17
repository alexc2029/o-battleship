export class Ship {
	#hits = 0;
	constructor(length) {
		this.length = length;
	}
	hit() {
		this.#hits++;
	}
	isSunk() {
		if (this.#hits >= this.length) return true;
		return false;
	}
}
