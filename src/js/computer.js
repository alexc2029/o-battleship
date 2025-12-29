import { Player } from "./player";

export class Computer extends Player {
	constructor() {
		super("Computer");
	}
	decideRandomAttack(playerGameboard) {
		let isShot, randomCoords;
		do {
			randomCoords = playerGameboard.getRandomCoords();
			isShot = playerGameboard.alreadyShot(randomCoords);
		} while (isShot);
		return randomCoords;
	}
}
