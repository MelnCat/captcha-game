import { useContext, useState } from "react";
import { CaptchaContent } from "../components/CaptchaContent";
import { CaptchaFooter } from "../components/CaptchaFooter";
import { CaptchaGrid } from "../components/CaptchaGrid";
import { CaptchaHeader } from "../components/CaptchaHeader";
import { GameContext } from "../util/GameContext";
import { useOrder, useVariant } from "../util/util";
import { motion } from "framer-motion";

const solutions: Record<number, bigint> = {
	1: 163n,
	2: 194n,
	3: 7n,
	4: 38n,
	5: 133n,
	6: 385n,
	7: 152n,
	8: 26n,
};

export const Level4 = () => {
	const game = useContext(GameContext);
	const [selections, setSelections] = useState(0n);
	const [variant, resetVariant] = useVariant(1);	
	const [error, setError] = useState<string | null>(null);
	const validate = () => {
		console.log(variant, selections)
		if (selections === solutions[variant]) {
			//game.nextLevel();
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
				<CaptchaGrid image={`url("/img/l4/1.png")`} size={4} selections={selections} setSelections={setSelections} />
			</CaptchaContent>
			<hr />
			<CaptchaFooter level={4} buttonLabel={selections === 0n ? "Skip" : "Verify"} error={error} onClick={validate} />
		</motion.article>
	);
};
