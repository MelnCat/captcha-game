import { motion } from "framer-motion";
import { useContext, useMemo, useRef, useState } from "react";
import { groupBy, sample } from "remeda";
import { useEventListener } from "usehooks-ts";
import * as uuid from "uuid";
import { CaptchaContent } from "../components/CaptchaContent";
import { CaptchaFooter } from "../components/CaptchaFooter";
import { PositionedCaptchaGrid } from "../components/CaptchaGrid";
import { CaptchaHeader } from "../components/CaptchaHeader";
import { GameContext } from "../util/GameContext";
import styles from "./level.module.scss";

const size = 4;
const getColor = (value: number) => {
	if (value > 1024 && value <= 2048) return "linear-gradient(#dacc50, #b6a63c)";
	if (value > 2048) return "linear-gradient(#97b1f8, #6087f3)";
	const color = (() => {
		if (value < 2) return "#7f5f3b";
		if (value === 2) return "#c2b389";
		if (value <= 4) return "#ac815c";
		if (value <= 8) return "#665833";
		if (value <= 16) return "#84b750";
		if (value <= 32) return "#37bda7";
		if (value <= 64) return "#3777bd";
		if (value <= 128) return "#342c91";
		if (value <= 256) return "#c34a9c";
		if (value <= 512) return "#733950";
		if (value <= 1024) return "#332424";
	})();
	return `linear-gradient(${color}, ${color})`;
};

const grid = [...Array(size)].flatMap((_, i) => [...Array(size)].map((_, j) => [i + 1, j + 1] as const));

export const LevelA = () => {
	const game = useContext(GameContext);
	const [items, setItems] = useState<{ id: string; row: number; column: number; value: number }[]>(() =>
		sample(grid, 2).map(x => ({
			id: uuid.v4(),
			row: x[0],
			column: x[1],
			value: 2,
		}))
	);
	const [selections, setSelections] = useState<string[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [interactable, setInteractable] = useState(true);
	const [fails, setFails] = useState(0);
	const gridItems = useMemo(() => {
		return items.map(x => ({
			id: x.id,
			row: x.row,
			column: x.column,
			image: getColor(x.value),
			content: (
				<p
					className={styles.item2048}
					style={{
						fontSize: selections.includes(x.id) ? (x.value < 10 ? "3em" : x.value >= 1000 ? "2.1em" : "2.8em") : 
						x.value < 10 ? "3.2em" : x.value >= 1000 ? "2.5em" : "",
						backdropFilter: x.value > 4096 ? `hue-rotate(${x.value}deg)` : "",
					}}
				>
					{x.value}
				</p>
			),
		}));
	}, [items, selections]);
	const saveAndMergeItems = (newItems: typeof items) => {
		setItems(newItems);
		setInteractable(false);
		setTimeout(() => {
			const groups = groupBy(newItems, x => `${x.row},${x.column}`);
			const toRemove: typeof items = [];
			const added: string[] = [];
			for (const overlap of Object.values(groups)) {
				if (overlap.length < 2) continue;
				toRemove.push(...overlap);
				const id = uuid.v4();
				if (overlap.some(x => selections.includes(x.id))) added.push(id);
				newItems.push({
					id,
					row: overlap[0].row,
					column: overlap[1].column,
					value: overlap.reduce((l, c) => l + c.value, 0),
				});
			}
			const extra: typeof items = [];
			const free = grid.filter(x => !newItems.some(y => y.row === x[0] && y.column === x[1]));
			if (free.length >= 1) {
				const random = free[Math.floor(Math.random() * free.length)];
				extra.push({
					id: uuid.v4(),
					row: random[0],
					column: random[1],
					value: Math.random() < 0.75 ? 2 : 4,
				});
			}
			setItems(newItems.filter(x => !toRemove.includes(x)).concat(extra));
			setSelections(x => x.filter(y => !toRemove.some(z => z.id === y)).concat(added));
			setInteractable(true);
		}, 190);
	};
	const onKeyPress = (event: KeyboardEvent) => {
		if (event.key !== "ArrowDown" && event.key !== "ArrowUp" && event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
		event.preventDefault();
		if (!interactable) return;
		const cmpProp = event.key === "ArrowDown" || event.key === "ArrowUp" ? "row" : "column";
		const oppositeProp = cmpProp === "row" ? "column" : "row";
		const cmpOrder = event.key === "ArrowDown" || event.key === "ArrowRight" ? 1 : -1;
		const cloned = items.slice().map(x => ({ ...x }));
		const sorted = cloned.slice().sort((a, b) => cmpOrder * (a[cmpProp] - b[cmpProp]));
		let moved = false;
		for (const item of sorted.slice().reverse()) {
			const collided = sorted.find(x => x[oppositeProp] === item[oppositeProp] && (cmpOrder === 1 ? x[cmpProp] > item[cmpProp] : x[cmpProp] < item[cmpProp]));
			const others = sorted.find(x => x.row === collided?.row && x.column === collided?.column && x !== collided);
			const newPos = collided ? (collided.value === item.value && !others ? collided[cmpProp] : collided[cmpProp] - 1 * cmpOrder) : cmpOrder === 1 ? size : 1;
			if (newPos === item[cmpProp]) continue;
			item[cmpProp] = newPos;
			moved = true;
		}
		if (moved) saveAndMergeItems(cloned);
	};
	const documentRef = useRef<Document>(document);
	useEventListener("keydown", onKeyPress, documentRef);
	const validate = () => {
		if (selections.length > 0 && selections.every(x => (items.find(y => y.id === x)?.value ?? 0) >= ([2048, 1024, 512][fails] ?? 256))) {
			game.nextLevel();
		} else {
			setSelections([]);
			setItems(
				sample(grid, 2).map(x => ({
					id: uuid.v4(),
					row: x[0],
					column: x[1],
					value: 2,
				}))
			);
			setError("Please try again.");
			setFails(x => x + 1);
		}
	};
	return (
		<motion.article initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
			<CaptchaHeader
				content={{
					title: "Select all squares with",
					term: `at least ${[2048, 1024, 512][fails] ?? 256}`,
					skip: "At least 1 square must be selected.",
				}}
			/>
			<CaptchaContent>
				<PositionedCaptchaGrid
					items={gridItems}
					size={size}
					selections={selections}
					setSelections={setSelections}
					background="linear-gradient(#cccccc,#cccccc)"
					gridBackground
				/>
			</CaptchaContent>
			<hr />
			<CaptchaFooter level={10} buttonLabel={"Verify"} error={error} onClick={validate} />
		</motion.article>
	);
};
