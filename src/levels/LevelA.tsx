import { useContext, useMemo, useState } from "react";
import { CaptchaContent } from "../components/CaptchaContent";
import { CaptchaFooter } from "../components/CaptchaFooter";
import { CaptchaGrid, PositionedCaptchaGrid } from "../components/CaptchaGrid";
import { CaptchaHeader } from "../components/CaptchaHeader";
import { GameContext } from "../util/GameContext";
import { useOrder, useVariant } from "../util/util";
import { motion } from "framer-motion";
import uuid from "uuid";
import styles from "./level.module.scss";

export const LevelA = () => {
	const game = useContext(GameContext);
	const [items, setItems] = useState<{ id: string; row: number; column: number; value: number }[]>([
		{
			id: uuid.v4(),
			row: 1,
			column: 1,
			value: 2,
		},
	]);
	const [selections, setSelections] = useState<string[]>([]);
	const [error, setError] = useState<string | null>(null);
	const gridItems = useMemo(() => {
		return items.map(x => ({ id: x.id, row: x.row, column: x.column, image: `linear-gradient(gray,gray)`, content: <span className={styles.item2048}>{x.value}</span> }));
	}, [items]);
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
				<PositionedCaptchaGrid items={gridItems} size={4} selections={selections} setSelections={setSelections} background="" />
			</CaptchaContent>
			<hr />
			<CaptchaFooter level={9} buttonLabel={"Verify"} error={error} onClick={validate} />
		</motion.article>
	);
};
