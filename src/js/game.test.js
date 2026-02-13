import { DisplayController } from "./dom";
import { processAttack } from "./game";

jest.mock("./dom", () => {
	return {
		DisplayController: {
			renderSquareHit: jest.fn(),
			renderSquareMiss: jest.fn(),
		},
	};
});

describe("game tests", () => {
	describe("processAttack tests", () => {
		let mockGameboard,
			mockSquare,
			mockDomSquare = null,
			mockCoords = [0, 0];
		beforeEach(() => {
			mockSquare = { isHit: jest.fn() };
			mockGameboard = {
				receiveAttack: jest.fn(),
				at: jest.fn().mockReturnValue(mockSquare),
			};
		});
		test("processAttack calls Gameboard.receiveAttack", () => {
			processAttack(mockGameboard, mockCoords, mockDomSquare);
			expect(mockGameboard.receiveAttack).toHaveBeenCalled();
		});
		test("processAttack calls renderSquareHit on hit", () => {
			mockSquare.isHit.mockReturnValue(true);
			processAttack(mockGameboard, mockCoords, mockDomSquare);
			expect(DisplayController.renderSquareHit).toHaveBeenCalled();
		});
		test("processAttack calls renderSquareMiss on miss", () => {
			mockSquare.isHit.mockReturnValue(false);
			processAttack(mockGameboard, mockCoords, mockDomSquare);
			expect(DisplayController.renderSquareMiss).toHaveBeenCalled();
		});
	});
	});
});
