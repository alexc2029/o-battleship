import { Gameboard } from "./gameboard";

describe("gameboard tests", () => {
	let gameboard;
	beforeAll(() => {
		gameboard = new Gameboard();
		gameboard.place([5, 5], 5);
	});
	test("empty squares are empty", () => {
		expect(gameboard.at([4, 5]).ship).toBeNull();
		expect(gameboard.at([10, 5]).ship).toBeNull();
	});
	test("ship is placed correctly", () => {
		for (let i = 5; i <= 9; i++) {
			expect(gameboard.at([i, 5]).ship).not.toBeNull();
		}
	});
	test("squares at ship extremities stay empty", () => {
		expect(gameboard.at([4, 5]).ship).toBeNull();
		expect(gameboard.at([10, 5]).ship).toBeNull();
	});
	test("square receives attack", () => {
		gameboard.receiveAttack([5, 5]);
		expect(gameboard.at([5, 5]).isHit()).toBeTruthy;
	});
	test("empty square records miss", () => {
		gameboard.receiveAttack([4, 5]);
		expect(gameboard.at([4, 5]).isMissed()).toBeTruthy;
	});
	test("reports all sunk after sole ship is attacked on every square", () => {
		for (let i = 5; i <= 9; i++) {
			gameboard.receiveAttack([i, 5]);
		}
		expect(gameboard.allSunk()).toBeTruthy;
	});
	test("does not report all sunk when sole ship is undamaged", () => {
		expect(gameboard.allSunk()).toBeFalsy;
	});
	test("does not report all sunk when sole ship is partially damaged", () => {
		for (let i = 5; i <= 8; i++) {
			gameboard.receiveAttack([i, 5]);
		}
		expect(gameboard.allSunk()).toBeFalsy;
	});
});
