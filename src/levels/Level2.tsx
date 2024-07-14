import { useContext, useState } from "react";
import { CaptchaContent } from "../components/CaptchaContent";
import { CaptchaFooter } from "../components/CaptchaFooter";
import { CaptchaGrid } from "../components/CaptchaGrid";
import { CaptchaHeader } from "../components/CaptchaHeader";
import { GameContext } from "../util/GameContext";
import { useVariant } from "../util/util";
import { motion } from "framer-motion";

const solutions: Record<number, { primary: bigint; secondary: bigint }> = {
	1: { primary: 4912n, secondary: 8194n },
	2: { primary: 35936n, secondary: 134n },
	3: { primary: 28672n, secondary: 1792n },
	4: { primary: 28384n, secondary: 37120n	},
	5: { primary: 52352n, secondary: 8256n },
	6: { primary: 4352n, secondary: 16n }
};

export const Level2 = () => {
	const game = useContext(GameContext);
	const [selections, setSelections] = useState(0n);
	const [variant, resetVariant] = useVariant(6);
	const [error, setError] = useState<string | null>(null);
	const validate = () => {
		console.log(variant, selections);
		if ((selections & ~solutions[variant].secondary) === solutions[variant].primary) {
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
					term: "stairs",
					skip: "If there are none, click skip."
				}}
			/>
			<CaptchaContent>
				<CaptchaGrid image={`url("/img/l2/${variant}.jfif")`} size={4} selections={selections} setSelections={setSelections} />
			</CaptchaContent>
			<hr />
			<CaptchaFooter level={2} buttonLabel={selections === 0n ? "Skip" : "Verify"} error={error} onClick={validate} />
		</motion.article>
	);
};
