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
}: {
	selections: bigint;
	setSelections: Dispatch<SetStateAction<bigint>>;
	image: string;
	size: number;
	order?: number[];
}) => {
	return (
		<section className={styles.grid} style={{ "--bg-image": image, "--grid-size": size, "--highlight-border-size": size === 3 ? "1.6cqmin" : "1cqmin" }}>
			{[...Array(size)].map((_, i) =>
				[...Array(size)].map((_, j) => (
					<CaptchaGridItem
						row={i}
						column={j}
						key={`${i}_${j}`}
						selected={(selections & (1n << BigInt(i + j * size))) !== 0n}
						toggleSelected={() => setSelections(x => x ^ (1n << BigInt(i + j * size)))}
						order={order?.[i + j * size]}
					/>
				))
			)}
		</section>
	);
};

const CaptchaGridItem = ({ row, column, selected, toggleSelected, order }: { row: number; column: number; selected: boolean; toggleSelected(): void; order?: number }) => {
	return (
		<div
			className={styles.gridItemWrapper}
			style={{
				...(order ? { "--order": order } : null),
			}}
		>
			<div
				className={styles.gridItem}
				style={{
					"--row": row,
					"--column": column,
				}}
				{...(selected ? { "data-selected": true } : null)}
				onClick={() => toggleSelected()}
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
