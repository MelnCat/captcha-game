import { useState } from "react";
import styles from "./CaptchaGrid.module.scss";
import { Check } from "@mui/icons-material"

export const CaptchaGrid = () => {
	const [selections, setSelections] = useState(Array(9).fill(false));
	return (
		<section className={styles.grid} style={{ "--bg-image": "url('/img/l1/1.jfif')" }}>
			{[...Array(3)].map((_, i) =>
				[...Array(3)].map((_, j) => (
					<CaptchaGridItem
						row={i}
						column={j}
						key={`${i}_${j}`}
						selected={selections[i + j * 3]}
						setSelected={s => setSelections(Object.assign([], selections, { [i + j * 3]: s }))}
					/>
				))
			)}
		</section>
	);
};

const CaptchaGridItem = ({ row, column, selected, setSelected }: { row: number; column: number; selected: boolean; setSelected(selected: boolean): void }) => {
	return (
		<div
			className={styles.gridItem}
			style={{
				backgroundPosition: `${(100 / 2) * row}% ${(100 / 2) * column}%`,
			}}
			{...(selected ? { "data-selected": true } : null)}
			onClick={() => setSelected(!selected)}
		>
			<div className={styles.checkmark}>

			</div>
		</div>
	);
};
