import { ReactNode } from "react";
import { Level1 } from "./Level1";
import { Level2 } from "./Level2";
import { Level3 } from "./Level3";
import { Level4 } from "./Level4";
import { Level5 } from "./Level5";
import { Level6 } from "./Level6";
import { Level7 } from "./Level7";
import { Level8 } from "./Level8";
import { Level9 } from "./Level9";
import { LevelA } from "./LevelA";
import { LevelB } from "./LevelB";

export const levels: Record<number, { component: () => ReactNode, width?: string; } > = {
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
	},
	5: {
		component: Level5
	},
	6: {
		component: Level6
	},
	7: {
		component: Level7
	},
	8: {
		component: Level8
	},
	9: {
		component: Level9
	},
	10: {
		component: LevelA
	},
	11: {
		component: LevelB,
		width: "600px"
	}
}