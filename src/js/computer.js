import { Player } from "./player";
import { coordsWithinBounds } from "./gameboard";

export class Computer extends Player {
	#attackQueue;
	#randomAttackCoords = null;
	#prevAdjAttackCoords = null;
	#isEnemyShipVertical = null;
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
		if (this.#attackQueue.length == 0) {
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
				if (this.#isEnemyShipVertical) {
					if (
						this.#prevAdjAttackCoords[1] <
						this.#randomAttackCoords[1]
					)
						this.#attackQueue = [
							[
								this.#randomAttackCoords[0],
								this.#prevAdjAttackCoords[1] - 1,
							],

							[
								this.#randomAttackCoords[0],
								this.#prevAdjAttackCoords[1] + 2,
							],
						];
					else
						this.#attackQueue = [
							[
								this.#randomAttackCoords[0],
								this.#prevAdjAttackCoords[1] + 1,
							],

							[
								this.#randomAttackCoords[0],
								this.#prevAdjAttackCoords[1] - 2,
							],
						];
				} else {
					if (
						this.#prevAdjAttackCoords[0] <
						this.#randomAttackCoords[0]
					)
						this.#attackQueue = [
							[
								this.#prevAdjAttackCoords[0] - 1,
								this.#randomAttackCoords[1],
							],

							[
								this.#prevAdjAttackCoords[0] + 2,
								this.#randomAttackCoords[1],
							],
						];
					else
						this.#attackQueue = [
							[
								this.#prevAdjAttackCoords[0] + 1,
								this.#randomAttackCoords[1],
							],
							[
								this.#prevAdjAttackCoords[0] - 1,
								this.#randomAttackCoords[1],
							],
							[
								this.#prevAdjAttackCoords[0] - 2,
								this.#randomAttackCoords[1],
							],
						];
				}
			}
			const attackCoords = this.#attackQueue.shift();
			this.#prevAdjAttackCoords = attackCoords;
			return attackCoords;
			
		}
	}

	#handleRandomAttack(randomAttack, playerGameboard) {
		this.#prevAdjAttackCoords = null;
		this.#isEnemyShipVertical = null;
		this.#randomAttackCoords = randomAttack.call(this, playerGameboard);
		let adjacentCoords = [];
		if (hasShip(playerGameboard, this.#randomAttackCoords)) {
			adjacentCoords.push([
				this.#randomAttackCoords[0] - 1,
				this.#randomAttackCoords[1],
			]);

			adjacentCoords.push([
				this.#randomAttackCoords[0] + 1,
				this.#randomAttackCoords[1],
			]);

			adjacentCoords.push([
				this.#randomAttackCoords[0],
				this.#randomAttackCoords[1] - 1,
			]);

			adjacentCoords.push([
				this.#randomAttackCoords[0],
				this.#randomAttackCoords[1] + 1,
			]);
			for (let coords of adjacentCoords) {
				if (
					coordsWithinBounds(coords) &&
					!playerGameboard.alreadyShot(coords)
				)
					this.#attackQueue.push(coords);
			}
		}
		return this.#randomAttackCoords;
	}
}

export function isShipVertical(initialCoordsArr, coordsArr) {
	if (initialCoordsArr[0] != coordsArr[0]) return false;
	else return true;
}

function hasShip(gameboard, coordsArr) {
	return gameboard.at(coordsArr)?.ship;
}
