import { motion } from "framer-motion";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { find, groupBy, sample } from "remeda";
import { useEventListener } from "usehooks-ts";
import * as uuid from "uuid";
import { CaptchaContent } from "../components/CaptchaContent";
import { CaptchaFooter } from "../components/CaptchaFooter";
import { PositionedCaptchaGrid } from "../components/CaptchaGrid";
import { CaptchaHeader } from "../components/CaptchaHeader";
import { GameContext } from "../util/GameContext";
import styles from "./level.module.scss";
import { useTimer } from "../util/util";
import * as R from "remeda";

const size = 8;
const colors = ["red", "blue", "yellow"]
const createGrid = () => {
	return [...Array(size)].map((_, i) => [...Array(size)].map((_, j) => colors[Math.floor(Math.random() * colors.length)]));
};

export const LevelD = () => {
	const game = useContext(GameContext);
	const [selections, setSelections] = useState<string[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [grid, setGrid] = useState(createGrid);
	const [target, setTarget] = useState(() => colors[Math.floor(Math.random() * colors.length)]);
	const [time, maxTime, resetTimer] = useTimer(15000, () => {
		setSelections([]);
		setGrid(createGrid);
		setError("Please try again.");
	});
	const items = useMemo(() => {
		return grid.flatMap((x, i) =>
			x.map((y, j) => ({
				id: `${i},${j}`,
				row: i + 1,
				column: j + 1,
				content: <></>,
				type: y,
				image: `linear-gradient(${y}, ${y})`,
			}))
		);
	}, [grid]);
	const validate = () => {
		if (
			grid.flat().filter(x => x === target).length === items.filter(x => x.type === target && selections.includes(x.id)).length
		) {
			//game.nextLevel();
			game.setComplete(true);
		} else {
			resetTimer();
			setSelections([]);
			setGrid(createGrid);
			setError("Please try again.");
			setTarget(() => colors[Math.floor(Math.random() * colors.length)]);
		}
	};
	return (
		<motion.article initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
			<CaptchaHeader
				content={{
					title: "Select all squares with",
					term: target,
				}}
				timer={{
					current: time,
					max: maxTime
				}}
			/>
			<CaptchaContent>
				<PositionedCaptchaGrid
					items={items}
					size={size}
					selections={selections}
					setSelections={setSelections}
					background="linear-gradient(#cccccc,#cccccc)"
					gridBackground
				/>
			</CaptchaContent>
			<hr />
			<CaptchaFooter level={13} buttonLabel={"Verify"} error={error} onClick={validate} />
		</motion.article>
	);
};
