import { ReactNode } from "react";
import { Level1 } from "./Level1";
import { Level2 } from "./Level2";
import { Level3 } from "./Level3";
import { Level4 } from "./Level4";

export const levels: Record<number, { component: () => ReactNode } > = {
	1: {
		component: Level1
	},
	2: {
		component: Level2
	},
	3: {
		component: Level3
	},
	4: {
		component: Level4
	}
}