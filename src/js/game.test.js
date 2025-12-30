import { Gameboard } from "./gameboard";
import { DisplayController } from "./dom";
import { processAttack } from "./game";

jest.mock("./gameboard");
jest.mock("./dom");

describe("game tests", () => {
	describe("processAttack tests", () => {
		beforeEach(() => {
			const gameboard = new Gameboard();
			const testCoords = [5, 5];
			const square = null;
			processAttack(gameboard, testCoords, square);
		});
		test("processAttack calls Gameboard.receiveAttack", () => {
			expect(receiveAttack).toHaveBeenCalled();
		});
	});
});
