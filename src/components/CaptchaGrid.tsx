import { Dispatch, SetStateAction, useState } from "react";
import styles from "./CaptchaGrid.module.scss";
import { Check } from "@mui/icons-material";
import { AnimatePresence, motion } from "framer-motion";

export const CaptchaGrid = ({
	selections,
	setSelections,
	image,
	size,
	order,
	disallowed,
	hideDisallowed,
	animateLayout,
	opacity,
	height
}: {
	selections: bigint;
	setSelections: Dispatch<SetStateAction<bigint>>;
	image: string | string[];
	size: number;
	order?: number[];
	disallowed?: bigint;
	hideDisallowed?: boolean;
	animateLayout?: boolean;
	opacity?: number;
	height?: number;
}) => {
	return (
		<section
			className={styles.grid}
			style={{
				"--grid-size": size,
				"--grid-height": height ?? size,
				"--highlight-border-size": size < 7 ? "11cqmin" : "13cqmin",
				"--checkmark-size": size < 7 ? "22.2cqmin" : "32.2cqmin",
				...(typeof image === "string" ? { "--bg-image": image } : null),
			}}
			{...(hideDisallowed ? { "data-hide-disallowed": true } : null)}
		>
			{[...Array(size)].map((_, i) =>
				[...Array(size)].map((_, j) => (
					<CaptchaGridItem
						animateLayout={animateLayout}
						row={i}
						column={j}
						key={`${i}_${j}`}
						selected={(selections & (1n << BigInt(i + j * size))) !== 0n}
						toggleSelected={() => setSelections(x => x ^ (1n << BigInt(i + j * size)))}
						order={order?.indexOf(i + j * size)}
						disallowed={disallowed !== undefined && (disallowed & (1n << BigInt(i + j * size))) !== 0n}
						opacity={opacity}
						{...(image instanceof Array ? { image: image[i + j * size] } : null)}
					/>
				))
			)}
		</section>
	);
};

const CaptchaGridItem = ({
	row,
	column,
	selected,
	toggleSelected,
	order,
	disallowed,
	image,
	animateLayout,
	opacity,
}: {
	row: number;
	column: number;
	selected: boolean;
	toggleSelected(): void;
	order?: number;
	disallowed: boolean;
	image?: string;
	animateLayout?: boolean;
	opacity?: number;
}) => {
	return (
		<motion.div
			layout={animateLayout}
			transition={{ duration: 0.3 }}
			className={styles.gridItemWrapper}
			style={{
				...(order ? { "--order": order } : null),
				...(opacity !== undefined ? { opacity } : null),
			}}
			{...(disallowed ? { "data-disallowed": true } : null)}
			{...(selected ? { "data-selected": true } : null)}
		>
			<div
				className={styles.gridItem}
				style={{
					"--row": image ? 0 : row,
					"--column": image ? 0 : column,
					...(image ? { backgroundImage: image, backgroundSize: "contain" } : null),
				}}
				onClick={() => {
					if (!disallowed) toggleSelected();
				}}
			>
				<AnimatePresence>
					{selected && (
						<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.1 }} className={styles.checkmark}>
							<Check />
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</motion.div>
	);
};

export const PositionedCaptchaGrid = ({
	items,
	selections,
	setSelections,
	size,
	background,
	gridBackground,
	height
}: {
	items: { id: string; image: string; row: number; column: number; disallowed?: boolean; content?: JSX.Element;  }[];
	selections: string[];
	setSelections: Dispatch<SetStateAction<string[]>>;
	size: number;
	background: string;
	gridBackground?: boolean;
	height?: number
}) => {
	return (
		<section
			className={styles.grid}
			style={{
				"--grid-size": size,
				"--grid-height": height ?? size,
				"--highlight-border-size": size < 7 ? "11cqmin" : "13cqmin",
				"--checkmark-size": size < 7 ? "22.2cqmin" : "32.2cqmin",
				...(gridBackground ? null : { backgroundImage: background }),
			}}
		>
			{gridBackground
				? [...Array(height ?? size)].map((_, i) =>
						[...Array(size)].map((_, j) => (
							<motion.div
								key={`bg_${i},${j}`}
								layout
								transition={{ duration: 0.3 }}
								className={`${styles.gridItemWrapper} ${styles.positionedGridItemWrapper} ${styles.gridItemBackground}`}
								style={{
									"--row": i + 1,
									"--column": j + 1,
									backgroundImage: background,
								}}
							/>
						))
				)
				: null}
			<AnimatePresence>
				{items.map(item => (
					<PositionedCaptchaGridItem
						key={item.id}
						row={item.row}
						column={item.column}
						selected={selections.includes(item.id)}
						toggleSelected={() => setSelections(x => (x.includes(item.id) ? x.filter(y => y !== item.id) : x.concat(item.id)))}
						disallowed={item.disallowed === true}
						image={item.image}
						content={item.content}
					/>
				))}
			</AnimatePresence>
		</section>
	);
};
const PositionedCaptchaGridItem = ({
	row,
	column,
	selected,
	toggleSelected,
	disallowed,
	image,
	content,
}: {
	row: number;
	column: number;
	selected: boolean;
	toggleSelected(): void;
	disallowed: boolean;
	image: string;
	content?: JSX.Element;
}) => {
	return (
		<motion.div
			layout
			animate={{ opacity: 1 }}
			initial={{ opacity: 0 }}	
			exit={{ opacity: 0 }}	
			transition={{ duration: 0.2 }}
			className={`${styles.gridItemWrapper} ${styles.positionedGridItemWrapper}`}
			{...(disallowed ? { "data-disallowed": true } : null)}
			style={{
				"--row": row,
				"--column": column,
			}}
			{...(selected ? { "data-selected": true } : null)}
		>
			<div
				className={styles.gridItem}
				style={{
					...(image ? { backgroundImage: image, backgroundSize: "contain" } : null),
				}}
				onClick={() => {
					if (!disallowed) toggleSelected();
				}}
			>
				{content}
				<AnimatePresence>
					{selected && (
						<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.1 }} className={styles.checkmark}>
							<Check />
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</motion.div>
	);
};
