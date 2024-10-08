import { useContext, useState } from "react";
import { CaptchaContent } from "../components/CaptchaContent";
import { CaptchaFooter } from "../components/CaptchaFooter";
import { CaptchaGrid } from "../components/CaptchaGrid";
import { CaptchaHeader } from "../components/CaptchaHeader";
import { GameContext } from "../util/GameContext";
import { useOrder, useVariant } from "../util/util";
import { motion } from "framer-motion";

const solution = 113n;

export const Level3 = () => {
	const game = useContext(GameContext);
	const [selections, setSelections] = useState(0n);
	const [order, resetOrder] = useOrder(9);
	const [error, setError] = useState<string | null>(null);
	const validate = () => {
		if (selections === solution) {
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
					term: "pillows",
				}}
			/>
			<CaptchaContent>
				<CaptchaGrid order={order} image={`url("/img/l3/1.jfif")`} size={3} selections={selections} setSelections={setSelections} />
			</CaptchaContent>
			<hr />
			<CaptchaFooter level={3} buttonLabel="Verify" error={error} onClick={validate} />
		</motion.article>
	);
};
