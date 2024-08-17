import { createContext } from "react";

export interface Game {
	level: number;
	complete: boolean;
	setLevel(level: number): void;
	nextLevel(): void;
	setComplete(complete: boolean ): void;
}

export const GameContext = createContext<Game>({
	level: -1,
	complete: false,
	setLevel() { throw new Error("Not implemented") },
	nextLevel() { throw new Error("Not implemented") },
	setComplete() { throw new Error("Not implemented") },
});