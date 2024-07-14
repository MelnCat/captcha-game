import { ReactNode } from "react";
import { Level1 } from "./Level1";
import { Level2 } from "./Level2";

export const levels: Record<number, { component: () => ReactNode } > = {
	1: {
		component: Level1
	},
	2: {
		component: Level2
	}
}