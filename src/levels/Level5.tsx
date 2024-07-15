import { useContext, useMemo, useState } from "react";
import { CaptchaContent } from "../components/CaptchaContent";
import { CaptchaFooter } from "../components/CaptchaFooter";
import { CaptchaGrid } from "../components/CaptchaGrid";
import { CaptchaHeader } from "../components/CaptchaHeader";
import { GameContext } from "../util/GameContext";
import { useOrder, useVariant } from "../util/util";
import { motion } from "framer-motion";
import { countBits } from "../util/bits";

const variants: Record<
	number,
	{
		pieces: bigint;
		solution: bigint;
	}
> = {
	1: {
		pieces: 4680091034837843972n,
		solution: 1048580n,
	},
};

export const Level5 = () => {
	const game = useContext(GameContext);
	const [selections, setSelections] = useState(0n);
	const [variant, resetVariant] = useState(1); //useVariant(5);
	const [error, setError] = useState<string | null>(null);
	const count = useMemo(() => countBits(selections), [selections]);
	const validate = () => {
		console.log(variant, selections);
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
					term: "the best move as white",
					skip: "If there are none, click skip.",
				}}
			/>
			<CaptchaContent>
				<CaptchaGrid
					disallowed={count === 0 ? ~variants[variant].pieces : count === 1 ? variants[variant].pieces ^ selections : ~(selections & ~variants[variant].pieces)}
					image={`url("/img/l5/${variant}.gif")`}
					size={8}
					selections={selections}
					setSelections={setSelections}
				/>
			</CaptchaContent>
			<hr />
			<CaptchaFooter level={4} buttonLabel={selections === 0n ? "Skip" : "Verify"} error={error} onClick={validate} />
		</motion.article>
	);
};
