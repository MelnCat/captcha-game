import { createContext } from "react";

export interface Game {
	level: number;
	setLevel(level: number): void;
	nextLevel(): void;
}

export const GameContext = createContext<Game>({
	level: -1,
	setLevel() { throw new Error("Not implemented") },
	nextLevel() { throw new Error("Not implemented") },
});