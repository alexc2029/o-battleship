import { Player } from "./player";
import { coordsWithinBounds } from "./gameboard";

export class Computer extends Player {
	constructor() {
		super("Computer");
		this.attackQueue = [];
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
		if (this.attackQueue.length == 0) {
			const randomAttackCoords = randomAttack.call(this, playerGameboard);
			let adjacentCoords = [];
			if (playerGameboard.at(randomAttackCoords)?.ship) {
				adjacentCoords.push([
					randomAttackCoords[0] - 1,
					randomAttackCoords[1],
				]);

				adjacentCoords.push([
					randomAttackCoords[0] + 1,
					randomAttackCoords[1],
				]);

				adjacentCoords.push([
					randomAttackCoords[0],
					randomAttackCoords[1] - 1,
				]);

				adjacentCoords.push([
					randomAttackCoords[0],
					randomAttackCoords[1] + 1,
				]);
				for (let coords of adjacentCoords) {
					if (coordsWithinBounds(coords))
						this.attackQueue.push(coords);
				}
			}
			return randomAttackCoords;
		} else {
			const attackCoords = this.attackQueue.shift();
			return attackCoords;
		}
	}
}

export function isShipVertical(initialCoordsArr, coordsArr) {
	if (initialCoordsArr[0] != coordsArr[0]) return false;
	else return true;
}
