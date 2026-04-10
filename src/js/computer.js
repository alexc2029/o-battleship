import { Player } from "./player";
import { coordsWithinBounds } from "./gameboard";

export class Computer extends Player {
	#attackQueue;
	#randomAttackCoords = null;
	#prevAdjAttackCoords = null;
	#isEnemyShipVertical = null;
	#attackDirection = null;
	#attemptsOver = false;
	constructor() {
		super("Computer");
		this.#attackQueue = [];
	}
	decideRandomAttack(playerGameboard) {
		let isShot, randomCoords;
		do {
			randomCoords = playerGameboard.getRandomCoords();
			isShot = playerGameboard.alreadyShot(randomCoords);
		} while (isShot);
		return randomCoords;
	}
	decideAttack(playerGameboard, randomAttack = this.decideRandomAttack) {
		if (this.#attackQueue.length == 0 && this.#attemptsOver == true) {
			return this.#handleRandomAttack(randomAttack, playerGameboard);
		} else {
			if (
				this.#isEnemyShipVertical == null &&
				this.#prevAdjAttackCoords != null &&
				hasShip(playerGameboard, this.#prevAdjAttackCoords)
			) {
				this.#isEnemyShipVertical = isShipVertical(
					this.#randomAttackCoords,
					this.#prevAdjAttackCoords,
				);
				this.#determineAttackDirection();
			}
			if (this.#isEnemyShipVertical != null) {
				if (this.#isEnemyShipVertical) {
					let nextAttackCoords = [
						this.#randomAttackCoords[0],
						this.#prevAdjAttackCoords[1] + this.#attackDirection,
					];
					if (
						hasShip(playerGameboard, this.#prevAdjAttackCoords) &&
						validAttack(nextAttackCoords, playerGameboard)
					) {
						this.#attackQueue = [nextAttackCoords];
					} else {
						this.#attackDirection *= -1;
						nextAttackCoords = [
							this.#randomAttackCoords[0],
							this.#randomAttackCoords[1] + this.#attackDirection,
						];
						if (validAttack(nextAttackCoords, playerGameboard))
							this.#attackQueue = [nextAttackCoords];
					}
				} else {
					let nextAttackCoords = [
						this.#prevAdjAttackCoords[0] + this.#attackDirection,
						this.#randomAttackCoords[1],
					];
					if (
						hasShip(playerGameboard, this.#prevAdjAttackCoords) &&
						validAttack(nextAttackCoords, playerGameboard)
					) {
						this.#attackQueue = [nextAttackCoords];
					} else {
						this.#attackDirection *= -1;
						nextAttackCoords = [
							this.#randomAttackCoords[0] + this.#attackDirection,
							this.#randomAttackCoords[1],
						];
						if (validAttack(nextAttackCoords, playerGameboard))
							this.#attackQueue = [nextAttackCoords];
					}
				}
			}
			this.#filterAttackQueue(playerGameboard);

			if (this.#attackQueue.length > 0) {
				this.#attemptsOver = false;
				const attackCoords = this.#attackQueue.shift();
				this.#prevAdjAttackCoords = attackCoords;
				return attackCoords;
			} else
				return this.#handleRandomAttack(randomAttack, playerGameboard);
		}
	}

	#handleRandomAttack(randomAttack, playerGameboard) {
		this.#prevAdjAttackCoords = null;
		this.#isEnemyShipVertical = null;
		this.#attackDirection = null;
		this.#attemptsOver = true;
		this.#randomAttackCoords = randomAttack.call(this, playerGameboard);
		if (hasShip(playerGameboard, this.#randomAttackCoords)) {
			this.#attackQueue.push([
				this.#randomAttackCoords[0] - 1,
				this.#randomAttackCoords[1],
			]);

			this.#attackQueue.push([
				this.#randomAttackCoords[0] + 1,
				this.#randomAttackCoords[1],
			]);

			this.#attackQueue.push([
				this.#randomAttackCoords[0],
				this.#randomAttackCoords[1] - 1,
			]);

			this.#attackQueue.push([
				this.#randomAttackCoords[0],
				this.#randomAttackCoords[1] + 1,
			]);
			this.#filterAttackQueue(playerGameboard);
		}
		return this.#randomAttackCoords;
	}

	#filterAttackQueue(playerGameboard) {
		this.#attackQueue = this.#attackQueue.filter((coords) =>
			validAttack(coords, playerGameboard),
		);
	}

	#determineAttackDirection() {
		if (this.#randomAttackCoords[0] != this.#prevAdjAttackCoords[0]) {
			this.#attackDirection =
				this.#prevAdjAttackCoords[0] - this.#randomAttackCoords[0];
		} else {
			this.#attackDirection =
				this.#prevAdjAttackCoords[1] - this.#randomAttackCoords[1];
		}
	}
}

function validAttack(coords, playerGameboard) {
	return coordsWithinBounds(coords) && !playerGameboard.alreadyShot(coords);
}

export function isShipVertical(initialCoordsArr, coordsArr) {
	if (initialCoordsArr[0] != coordsArr[0]) return false;
	else return true;
}

function hasShip(gameboard, coordsArr) {
	return gameboard.at(coordsArr)?.ship;
}
