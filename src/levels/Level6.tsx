import { useContext, useMemo, useState } from "react";
import { CaptchaContent } from "../components/CaptchaContent";
import { CaptchaFooter } from "../components/CaptchaFooter";
import { CaptchaGrid } from "../components/CaptchaGrid";
import { CaptchaHeader } from "../components/CaptchaHeader";
import { GameContext } from "../util/GameContext";
import { useOrder, useVariant } from "../util/util";
import { motion } from "framer-motion";
import { countBits } from "../util/bits";

const solutions: Record<
	number,
	bigint
> = {
};

export const Level6 = () => {
	const game = useContext(GameContext);
	const [selections, setSelections] = useState(0n);
	const [variant, resetVariant] = useVariant(4);
	const [error, setError] = useState<string | null>(null);
	const count = useMemo(() => countBits(selections), [selections]);
	const validate = () => {
		console.log(variant, selections);
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
					term: "e",
					skip: "If there are none, click skip.",
				}}
			/>
			<CaptchaContent>
				<CaptchaGrid
					image={`url("/img/l6/${variant}.gif")`}
					size={4}
					selections={selections}
					setSelections={setSelections}
				/>
			</CaptchaContent>
			<hr />
			<CaptchaFooter level={6} buttonLabel={selections === 0n ? "Skip" : "Verify"} error={error} onClick={validate} />
		</motion.article>
	);
};
