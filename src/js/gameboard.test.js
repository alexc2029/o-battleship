import { Gameboard } from "./gameboard";

describe("gameboard tests", () => {
	let gameboard;
	beforeEach(() => {
		gameboard = new Gameboard();
		gameboard.place([5, 5], 5);
	});
	test("empty squares are empty", () => {
		expect(gameboard.at([4, 5])).toBeUndefined();
		expect(gameboard.at([10, 5])).toBeUndefined();
	});
	test("ship is placed correctly", () => {
		for (let i = 5; i <= 9; i++) {
			expect(gameboard.at([i, 5])).not.toBeUndefined();
		}
	});
	test("squares at ship extremities stay empty", () => {
		expect(gameboard.at([4, 5])).toBeUndefined();
		expect(gameboard.at([10, 5])).toBeUndefined();
	});
});
