import { ReactNode } from "react";
import { Level1 } from "./Level1";

export const levels: Record<number, { component: () => ReactNode } > = {
	"1": {
		component: Level1
	}
}