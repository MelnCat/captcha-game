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

const size = 12;
const findCats = (grid: string[][]) => {
	const all: number[][][] = [];
	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid[i].length; j++) {
			const pos = [
				[
					[i - 1, j],
					[i, j],
					[i + 1, j],
				],
				[
					[i, j - 1],
					[i, j],
					[i, j + 1],
				],
				[
					[i - 1, j - 1],
					[i, j],
					[i + 1, j + 1],
				],
				[
					[i - 1, j + 1],
					[i, j],
					[i + 1, j - 1],
				],
			];
			const found = pos.filter(pts => {
				const word = pts.map(x => grid[x[0]]?.[x[1]]).join("");
				return word === "CAT" || word === "TAC";
			});
			all.push(...found);
		}
	}
	return all;
};
const createGrid = () => {
	let grid = [...Array(size)].map((_, i) => [...Array(size)].map((_, j) => "CAT"[Math.floor(Math.random() * 3)]));
	let att = 0;
	for (let cats = findCats(grid); cats.length > 1; cats = findCats(grid)) {
		for (const cat of cats) for (const pts of cat) grid[pts[0]][pts[1]] = "CAT"[Math.floor(Math.random() * 3)];
		const random = [Math.floor(Math.random() * (size - 2)) + 1, Math.floor(Math.random() * (size - 2)) + 1];
		const direction = Math.random() > 0.5 ? -1 : 1;
		const direction2 = Math.random() > 0.5 ? -1 : 1;
		grid[random[0] - 1][random[1] - direction] = direction2 === 1 ? "C" : "T";
		grid[random[0]][random[1]] = "A";
		grid[random[0] + 1][random[1] + direction] = direction2 === 1 ? "T" : "C";
		if (att++ % 20 === 19) grid = [...Array(size)].map((_, i) => [...Array(size)].map((_, j) => "CAT"[Math.floor(Math.random() * 3)]));
	}
	return grid;
};

export const LevelC = () => {
	const game = useContext(GameContext);
	const [selections, setSelections] = useState<string[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [grid, setGrid] = useState(createGrid);
	const [time, maxTime, resetTimer] = useTimer(60000, () => {
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
				content: (
					<p style={{ scale: selections.includes(`${i},${j}`) ? "0.8" : "" }} className={styles.wordSearchText}>
						{y}
					</p>
				),
				image: "linear-gradient(#cccccc,#cccccc)",
			}))
		);
	}, [grid, selections]);
	const validate = () => {
		const cats = findCats(grid);
		if (
			selections.length > 0 &&
			[...new Set(cats.flat().map(x => x.join(",")))].length === selections.length &&
			cats.every(x => x.every(y => selections.includes(y.join(","))))
		) {
			game.nextLevel();
		} else {
			resetTimer();
			setSelections([]);
			setGrid(createGrid);
			setError("Please try again.");
		}
	};
	return (
		<motion.article initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
			<CaptchaHeader
				content={{
					title: "Select all squares with",
					term: `cat`,
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
			<CaptchaFooter level={12} buttonLabel={"Verify"} error={error} onClick={validate} />
		</motion.article>
	);
};
