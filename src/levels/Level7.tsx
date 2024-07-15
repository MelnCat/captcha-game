import { useContext, useMemo, useState } from "react";
import { CaptchaContent } from "../components/CaptchaContent";
import { CaptchaFooter } from "../components/CaptchaFooter";
import { CaptchaGrid } from "../components/CaptchaGrid";
import { CaptchaHeader } from "../components/CaptchaHeader";
import { GameContext } from "../util/GameContext";
import { useOrder, useVariant } from "../util/util";
import { motion } from "framer-motion";
import { countBits } from "../util/bits";

const solutions: Record<number, bigint> = {
	1: 469n
};

export const Level7 = () => {
	const game = useContext(GameContext);
	const [selections, setSelections] = useState(0n);
	const [error, setError] = useState<string | null>(null);
	const [order, resetOrder] = useOrder(9);
	const [variant, setVariant] = useState(1);
	const validate = () => {
		console.log(variant, selections)
		if (selections === solutions[variant]) {
			game.nextLevel();
		} else {
			setSelections(0n);
			resetOrder();
			setVariant(2);
			setError("Please try again.");
		}
	};
	return (
		<motion.article initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
			<CaptchaHeader
				content={{
					title: "Select all squares with",
					term: ["", "convergent improper integrals"][variant]
				}}
			/>
			<CaptchaContent>
				<CaptchaGrid
					hideDisallowed
					//order={order}
					image={`url("/img/l7/${variant}.jfif")`}
					size={3}
					selections={selections}
					setSelections={setSelections}
				/>
			</CaptchaContent>
			<hr />
			<CaptchaFooter level={7} buttonLabel={"Verify"} error={error} onClick={validate} />
		</motion.article>
	);
};