import { Gameboard } from "./gameboard";

describe("gameboard tests", () => {
	let gameboard;
	beforeEach(() => {
		gameboard = new Gameboard();
		gameboard.place([5, 5], 5);
	});
	test("empty squares are empty", () => {
		expect(gameboard.at([6, 6]).ship).toBeNull();
		expect(gameboard.at([1, 1]).ship).toBeNull();
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
		expect(gameboard.at([5, 5]).isHit()).toBeTruthy();
	});
	test("empty square records miss", () => {
		gameboard.receiveAttack([4, 5]);
		expect(gameboard.at([4, 5]).isMissed()).toBeTruthy();
	});
	test("reports all sunk after sole ship is attacked on every square", () => {
		for (let i = 5; i <= 9; i++) {
			gameboard.receiveAttack([i, 5]);
		}
		expect(gameboard.allSunk()).toBeTruthy();
	});
	test("does not report all sunk when sole ship is undamaged", () => {
		expect(gameboard.allSunk()).toBeFalsy();
	});
	test("does not report all sunk when sole ship is partially damaged", () => {
		for (let i = 5; i <= 8; i++) {
			gameboard.receiveAttack([i, 5]);
		}
		expect(gameboard.allSunk()).toBeFalsy();
	});
	test("random coords are between 1 and 10", () => {
		expect(gameboard.getRandomCoords()[0]).toBeGreaterThanOrEqual(1);
		expect(gameboard.getRandomCoords()[0]).toBeLessThanOrEqual(10);
		expect(gameboard.getRandomCoords()[1]).toBeGreaterThanOrEqual(1);
		expect(gameboard.getRandomCoords()[1]).toBeLessThanOrEqual(10);
	});
	test("already shot is true for a hit square", () => {
		gameboard.receiveAttack([5, 5]);
		expect(gameboard.alreadyShot([5, 5])).toBeTruthy();
		expect(gameboard.alreadyShot([4, 5])).toBeFalsy();
	});
	test("throws errors for horizontal out of bounds conditions", () => {
		expect(() => {
			gameboard.place([10, 7], 2);
		}).toThrow();
		expect(() => {
			gameboard.place([-1, 7], 3);
		}).toThrow();
		expect(() => {
			gameboard.place([7, -1], 3);
		}).toThrow();
		expect(() => {
			gameboard.place([7, 11], 3);
		}).toThrow();
	});
});
describe("areCoordsValid tests", () => {
	let gameboard;
	let stubGameboardAt, mockEmptySquare, mockOccupiedSquare;
	beforeEach(() => {
		gameboard = new Gameboard();
		stubGameboardAt = jest.spyOn(gameboard, "at");
		mockEmptySquare = { ship: null };
		mockOccupiedSquare = { ship: true };
	});
	afterEach(() => {
		jest.restoreAllMocks();
	});
	test("true for empty coords", () => {
		stubGameboardAt.mockReturnValue(mockEmptySquare);
		expect(gameboard.areCoordsValid([3, 3], 3)).toBe(true);
	});
	test("false for collision", () => {
		stubGameboardAt.mockImplementation((coordsArr) => {
			if (coordsArr[0] == 4 && coordsArr[1] == 3)
				return mockOccupiedSquare;
		});
		expect(gameboard.areCoordsValid([3, 3], 3)).toBe(false);
	});
	test("false for neighbor to the immediate left", () => {
		stubGameboardAt.mockImplementation((coordsArr) => {
			if (coordsArr[0] == 2 && coordsArr[1] == 3)
				return mockOccupiedSquare;
		});
		expect(gameboard.areCoordsValid([3, 3], 1)).toBe(false);
	});
	test("false for neighbor to the immediate right", () => {
		stubGameboardAt.mockImplementation((coordsArr) => {
			if (coordsArr[0] == 4 && coordsArr[1] == 3)
				return mockOccupiedSquare;
		});
		expect(gameboard.areCoordsValid([3, 3], 1)).toBe(false);
	});
	test("false for neighbor immediately below", () => {
		stubGameboardAt.mockImplementation((coordsArr) => {
			if (coordsArr[0] == 4 && coordsArr[1] == 4)
				return mockOccupiedSquare;
		});
		expect(gameboard.areCoordsValid([3, 3], 3)).toBe(false);
	});
	test("false for neighbor immediately above", () => {
		stubGameboardAt.mockImplementation((coordsArr) => {
			if (coordsArr[0] == 4 && coordsArr[1] == 2)
				return mockOccupiedSquare;
		});
		expect(gameboard.areCoordsValid([3, 3], 3)).toBe(false);
	});
	test("false for left-top diagonal neighbor", () => {
		stubGameboardAt.mockImplementation((coordsArr) => {
			if (coordsArr[0] == 2 && coordsArr[1] == 2)
				return mockOccupiedSquare;
		});
		expect(gameboard.areCoordsValid([3, 3], 3)).toBe(false);
	});
	test("false for left-bottom diagonal neighbor", () => {
		stubGameboardAt.mockImplementation((coordsArr) => {
			if (coordsArr[0] == 2 && coordsArr[1] == 4)
				return mockOccupiedSquare;
		});
		expect(gameboard.areCoordsValid([3, 3], 3)).toBe(false);
	});
	test("false for right-top diagonal neighbor", () => {
		stubGameboardAt.mockImplementation((coordsArr) => {
			if (coordsArr[0] == 4 && coordsArr[1] == 2)
				return mockOccupiedSquare;
		});
		expect(gameboard.areCoordsValid([3, 3], 1)).toBe(false);
	});
	test("false for right-bottom diagonal neighbor", () => {
		stubGameboardAt.mockImplementation((coordsArr) => {
			if (coordsArr[0] == 4 && coordsArr[1] == 4)
				return mockOccupiedSquare;
		});
		expect(gameboard.areCoordsValid([3, 3], 1)).toBe(false);
	});
});
describe("getRandomPlacement tests", () => {
	let gameboard;
	let stubRandomCoords, mockValidate;
	beforeEach(() => {
		gameboard = new Gameboard();
		stubRandomCoords = jest.spyOn(gameboard, "getRandomCoords");
		mockValidate = jest.fn();
	});
	afterEach(() => {
		jest.restoreAllMocks();
	});
	test("retries until ship can be placed without collisions", () => {
		stubRandomCoords.mockReturnValueOnce([3, 3]).mockReturnValue([6, 7]);
		mockValidate.mockReturnValueOnce(false).mockReturnValueOnce(true);
		expect(gameboard.getRandomPlacement(3, mockValidate)).toEqual([6, 7]);
	});
	test("doesn't retry for valid first coordinates", () => {
		stubRandomCoords.mockReturnValueOnce([3, 3]).mockReturnValue([6, 7]);
		mockValidate.mockReturnValueOnce(true).mockReturnValueOnce(true);
		expect(gameboard.getRandomPlacement(3, mockValidate)).toEqual([3, 3]);
	});
});

describe("gameboard vertical tests", () => {
	let gameboard;
	beforeEach(() => {
		gameboard = new Gameboard();
		gameboard.place([5, 5], 5, true);
	});
	test("ship is placed correctly", () => {
		for (let i = 5; i <= 9; i++) {
			expect(gameboard.at([5, i]).ship).not.toBeNull();
		}
	});
	test("squares at ship extremities stay empty", () => {
		expect(gameboard.at([5, 4]).ship).toBeNull();
		expect(gameboard.at([5, 10]).ship).toBeNull();
	});
});
