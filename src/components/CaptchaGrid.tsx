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
}: {
	selections: bigint;
	setSelections: Dispatch<SetStateAction<bigint>>;
	image: string;
	size: number;
	order?: number[];
	disallowed?: bigint;
}) => {
	return (
		<section
			className={styles.grid}
			style={{
				"--bg-image": image,
				"--grid-size": size,
				"--highlight-border-size": size < 7 ? "11cqmin" : "13cqmin",
				"--checkmark-size": size < 7 ? "22.2cqmin" : "32.2cqmin",
			}}
		>
			{[...Array(size)].map((_, i) =>
				[...Array(size)].map((_, j) => (
					<CaptchaGridItem
						row={i}
						column={j}
						key={`${i}_${j}`}
						selected={(selections & (1n << BigInt(i + j * size))) !== 0n}
						toggleSelected={() => setSelections(x => x ^ (1n << BigInt(i + j * size)))}
						order={order?.[i + j * size]}
						disallowed={disallowed !== undefined && (disallowed & (1n << BigInt(i + j * size))) !== 0n}
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
}: {
	row: number;
	column: number;
	selected: boolean;
	toggleSelected(): void;
	order?: number;
	disallowed: boolean;
}) => {
	return (
		<div
			className={styles.gridItemWrapper}
			style={{
				...(order ? { "--order": order } : null),
			}}
			{...(disallowed ? { "data-disallowed": true } : null)}
		>
			<div
				className={styles.gridItem}
				style={{
					"--row": row,
					"--column": column,
				}}
				{...(selected ? { "data-selected": true } : null)}
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
		</div>
	);
};
