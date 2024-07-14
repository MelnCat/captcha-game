import { Dispatch, SetStateAction, useState } from "react";
import styles from "./CaptchaGrid.module.scss";
import { Check } from "@mui/icons-material";

export const CaptchaGrid = ({ selections, setSelections, image }: { selections: number; setSelections: Dispatch<SetStateAction<number>>; image: string }) => {
	return (
		<section className={styles.grid} style={{ "--bg-image": image }}>
			{[...Array(3)].map((_, i) =>
				[...Array(3)].map((_, j) => (
					<CaptchaGridItem
						row={i}
						column={j}
						key={`${i}_${j}`}
						selected={(selections & (1 << (i + j * 3))) !== 0}
						toggleSelected={() => setSelections(x => x ^ (1 << (i + j * 3)))}
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
					backgroundPosition: `${(100 / 2) * row}% ${(100 / 2) * column}%`,
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
