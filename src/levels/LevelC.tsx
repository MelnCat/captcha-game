import { motion } from "framer-motion";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { groupBy, sample } from "remeda";
import { useEventListener } from "usehooks-ts";
import * as uuid from "uuid";
import { CaptchaContent } from "../components/CaptchaContent";
import { CaptchaFooter } from "../components/CaptchaFooter";
import { PositionedCaptchaGrid } from "../components/CaptchaGrid";
import { CaptchaHeader } from "../components/CaptchaHeader";
import { GameContext } from "../util/GameContext";
import styles from "./level.module.scss";

const size = 5;
const createGrid = () => {
	[...Array(size)].map((_, i) => (_, j) => "CAT"[Math.floor(Math.random() * 3)])
};

export const LevelC = () => {
	const game = useContext(GameContext);
	const [selections, setSelections] = useState<string[]>([]);
	const [error, setError] = useState<string | null>(null);
	const items = useMemo(() => {
		return time.split("").map((x, i) => ({
			id: i.toString(),
			row: 4,
			column: i + 1,
			content: (
				<p style={{ scale: selections.includes(i.toString()) ? "0.8" : "" }} className={styles.timeText}>
					{x}
				</p>
			),
			image: "linear-gradient(#eeeeee, #eeeeee)",
			value: x,
		}));
	}, [time, selections]);
	const validate = () => {
		if (selections.length > 0 && selections.every(x => items.find(y => y.id === x)?.value === "5") && selections.length === [...time].filter(x => x === "5").length) {
			game.nextLevel();
		} else {
			setSelections([]);
			setError("Please try again.");
		}
	};
	return (
		<motion.article initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
			<CaptchaHeader
				content={{
					title: "Select all squares with",
					term: "cat",
				}}
			/>
			<CaptchaContent>
				<PositionedCaptchaGrid
					items={items}
					size={8}
					height={7}
					selections={selections}
					setSelections={setSelections}
					background="linear-gradient(#cccccc,#cccccc)"
					gridBackground
				/>
			</CaptchaContent>
			<hr />
			<CaptchaFooter level={12} buttonLabel={"Verify"} error={error} onClick={validate} />
		</motion.article>
	);
};
