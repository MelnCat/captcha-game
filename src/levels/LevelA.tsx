import { useContext, useMemo, useRef, useState } from "react";
import { CaptchaContent } from "../components/CaptchaContent";
import { CaptchaFooter } from "../components/CaptchaFooter";
import { CaptchaGrid, PositionedCaptchaGrid } from "../components/CaptchaGrid";
import { CaptchaHeader } from "../components/CaptchaHeader";
import { GameContext } from "../util/GameContext";
import { useOrder, useVariant } from "../util/util";
import { motion } from "framer-motion";
import * as uuid from "uuid";
import styles from "./level.module.scss";
import { useEventListener } from "usehooks-ts";
import { add, groupBy } from "remeda";

const getColor = (value: number) => {
	if (value > 1024 && value <= 2048) return "linear-gradient(#f5ea8d, #c9b534)";
	if (value > 2048) return "linear-gradient(red,orange,yellow,green,blue,purple)";
	const color = (() => {
		if (value < 2) return "#7f5f3b";
		if (value === 2) return "#d3c090";
		if (value <= 4) return "#bf9066";
		if (value <= 8) return "#99792a";
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

export const LevelA = () => {
	const game = useContext(GameContext);
	const [items, setItems] = useState<{ id: string; row: number; column: number; value: number }[]>([
		{
			id: uuid.v4(),
			row: 1,
			column: 1,
			value: 2,
		},
		{
			id: uuid.v4(),
			row: 2,
			column: 1,
			value: 2,
		},
		{
			id: uuid.v4(),
			row: 3,
			column: 1,
			value: 4,
		},
		{
			id: uuid.v4(),
			row: 4,
			column: 1,
			value: 4,
		},
	]);
	const [selections, setSelections] = useState<string[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [interactable, setInteractable] = useState(true);
	const gridItems = useMemo(() => {
		return items.map(x => ({ id: x.id, row: x.row, column: x.column, image: getColor(x.value), content: <p className={styles.item2048}>{x.value}</p> }));
	}, [items]);
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
			setItems(newItems.filter(x => !toRemove.includes(x)));
			setSelections(x => x.filter(y => !toRemove.some(z => z.id === y)).concat(added));
			setInteractable(true);
		}, 250);
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
		for (const item of sorted.slice().reverse()) {
			const collided = sorted.find(x => x[oppositeProp] === item[oppositeProp] && (cmpOrder === 1 ? x[cmpProp] > item[cmpProp] : x[cmpProp] < item[cmpProp]));
			const newPos = collided ? (collided.value === item.value ? collided[cmpProp] : collided[cmpProp] - 1 * cmpOrder) : cmpOrder === 1 ? 4 : 1;
			if (newPos === item[cmpProp]) continue;
			item[cmpProp] = newPos;
		}
		saveAndMergeItems(cloned);
	};
	const documentRef = useRef<Document>(document);
	useEventListener("keydown", onKeyPress, documentRef);
	const validate = () => {};
	return (
		<motion.article initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
			<CaptchaHeader
				content={{
					title: "Select all squares with",
					term: "2048",
					skip: "At least 1 square must be selected.",
				}}
			/>
			<CaptchaContent>
				<PositionedCaptchaGrid
					items={gridItems}
					size={4}
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
