import { useContext, useMemo, useState } from "react";
import { CaptchaContent } from "../components/CaptchaContent";
import { CaptchaFooter } from "../components/CaptchaFooter";
import { CaptchaGrid } from "../components/CaptchaGrid";
import { CaptchaHeader } from "../components/CaptchaHeader";
import { GameContext } from "../util/GameContext";
import { useOrder, useVariant } from "../util/util";
import { motion } from "framer-motion";
import { countBits } from "../util/bits";

export const Level7 = () => {
	const game = useContext(GameContext);
	const [selections, setSelections] = useState(0n);
	const [error, setError] = useState<string | null>(null);
	const validate = () => {
		if (selections === 2n ** 15n) {
			game.nextLevel();
		} else {
			setSelections(0n);
			resetOrder();
			setError("Please try again.");
		}
	};
	return (
		<motion.article initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
			<CaptchaHeader
				content={{
					title: "Select all squares with",
					term: "convergent improper integrals",
					skip: "If there are none, click skip.",
				}}
			/>
			<CaptchaContent>
				<CaptchaGrid
					hideDisallowed
					order={order}
					disallowed={selections === 0n ? 0n : ~selections}
					image={images}
					size={4}
					selections={selections}
					setSelections={setSelections}
				/>
			</CaptchaContent>
			<hr />
			<CaptchaFooter level={7} buttonLabel={selections === 0n ? "Skip" : "Verify"} error={error} onClick={validate} />
		</motion.article>
	);
};
