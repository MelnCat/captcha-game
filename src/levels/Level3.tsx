import { useContext, useState } from "react";
import { CaptchaContent } from "../components/CaptchaContent";
import { CaptchaFooter } from "../components/CaptchaFooter";
import { CaptchaGrid } from "../components/CaptchaGrid";
import { CaptchaHeader } from "../components/CaptchaHeader";
import { GameContext } from "../util/GameContext";
import { useVariant } from "../util/util";
import { motion } from "framer-motion";

const solutions: Record<number, bigint> = {
};

export const Level3 = () => {
	const game = useContext(GameContext);
	const [selections, setSelections] = useState(0n);
	const [variant, resetVariant] = useVariant(1);
	const [error, setError] = useState<string | null>(null);
	const validate = () => {
		console.log(variant, selections);
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
				<CaptchaGrid image={`url("/img/l3/${variant}.jfif")`} size={4} selections={selections} setSelections={setSelections} />
			</CaptchaContent>
			<hr />
			<CaptchaFooter level={2} buttonLabel="Verify" error={error} onClick={validate} />
		</motion.article>
	);
};
