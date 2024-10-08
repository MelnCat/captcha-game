import { useContext, useState } from "react";
import { CaptchaContent } from "../components/CaptchaContent";
import { CaptchaFooter } from "../components/CaptchaFooter";
import { CaptchaGrid } from "../components/CaptchaGrid";
import { CaptchaHeader } from "../components/CaptchaHeader";
import { GameContext } from "../util/GameContext";
import { useOrder, useVariant } from "../util/util";
import { motion } from "framer-motion";

const solutions: Record<number, bigint> = {
	1: 29976n,
	2: 16544n,
	3: 43552n,
	4: 1879n,
	5: 30280n
};

export const Level4 = () => {
	const game = useContext(GameContext);
	const [selections, setSelections] = useState(0n);
	const [variant, resetVariant] = useVariant(5);	
	const [error, setError] = useState<string | null>(null);
	const validate = () => {
		if (selections === solutions[variant]) {
			game.nextLevel();
		} else {
			setSelections(0n);
			resetVariant();
			setError("Please try again.");
		}
	};
	return (
		<motion.article initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
			<CaptchaHeader
				content={{
					title: "Select all squares with",
					term: "mines",
					skip: "If there are none, click skip."
				}}
			/>
			<CaptchaContent pixelated>
				<CaptchaGrid image={`url("/img/l4/${variant}.png")`} size={4} selections={selections} setSelections={setSelections} />
			</CaptchaContent>
			<hr />
			<CaptchaFooter level={4} buttonLabel={selections === 0n ? "Skip" : "Verify"} error={error} onClick={validate} />
		</motion.article>
	);
};
