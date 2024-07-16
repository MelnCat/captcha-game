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
	opacity
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
}) => {
	return (
		<section
			className={styles.grid}
			style={{
				"--grid-size": size,
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
	opacity
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
				...(opacity !== undefined ? { opacity } : null)
			}}
			{...(disallowed ? { "data-disallowed": true } : null)}
		>
			<div
				className={styles.gridItem}
				style={{
					"--row": image ? 0 : row,
					"--column": image ? 0 : column,
					...(image ? { backgroundImage: image, backgroundSize: "contain" } : null),
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
		</motion.div>
	);
};
