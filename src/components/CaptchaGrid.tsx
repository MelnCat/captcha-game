import { Dispatch, SetStateAction, useState } from "react";
import styles from "./CaptchaGrid.module.scss";
import { Check } from "@mui/icons-material";

export const CaptchaGrid = ({ selections, setSelections, image, size }: { selections: bigint; setSelections: Dispatch<SetStateAction<bigint>>; image: string; size: number }) => {
	return (
		<section className={styles.grid} style={{ "--bg-image": image, "--grid-size": size }}>
			{[...Array(size)].map((_, i) =>
				[...Array(size)].map((_, j) => (
					<CaptchaGridItem
						row={i}
						column={j}
						key={`${i}_${j}`}
						selected={(selections & (1n << BigInt(i + j * size))) !== 0n}
						toggleSelected={() => setSelections(x => x ^ (1n << BigInt(i + j * size)))}
					/>
				))
			)}
		</section>
	);
};

const CaptchaGridItem = ({ row, column, selected, toggleSelected }: { row: number; column: number; selected: boolean; toggleSelected(): void }) => {
	return (
		<div className={styles.gridItemWrapper}>
			<div
				className={styles.gridItem}
				style={{
					"--row": row,
					"--column": column
				}}
				{...(selected ? { "data-selected": true } : null)}
				onClick={() => toggleSelected()}
			>
				{selected && (
					<div className={styles.checkmark}>
						<Check />
					</div>
				)}
			</div>
		</div>
	);
};
