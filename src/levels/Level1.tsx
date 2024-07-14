import { useContext, useState } from "react";
import { CaptchaContent } from "../components/CaptchaContent";
import { CaptchaFooter } from "../components/CaptchaFooter";
import { CaptchaGrid } from "../components/CaptchaGrid";
import { CaptchaHeader } from "../components/CaptchaHeader";
import { GameContext } from "../util/GameContext";

export const solutions: Record<number, number> = {
	1: 163,
	2: 194,
	3: 7,
	4: 38,
	5: 133,
	6: 385,
	7: 152,
	8: 26,
}

export const Level1 = () => {
	const game = useContext(GameContext);
	const [selections, setSelections] = useState(0);
	const [variant, setVariant] = useState(() => Math.floor(Math.random() * 8) + 1);
	const [error, setError] = useState<string | null>(null);
	const validate = () => {
		if (selections === solutions[variant]) {
			game.nextLevel();
		} else {
			setSelections(0);
			setVariant(old => {
				const value = Math.floor(Math.random() * 7) + 1;
				if (value >= old) return value + 1;
				return value;
			});
			setError("Please try again.");
		}
	}
	return (
		<>
			<CaptchaHeader
				content={{
					title: "Select all images with",
					term: "cars",
				}}
			/>
			<CaptchaContent>
				<CaptchaGrid image={`url("/img/l1/${variant}.jfif")`} selections={selections} setSelections={setSelections} />
			</CaptchaContent>
			<hr />
			<CaptchaFooter error={error} onClick={validate} />
		</>
	);
};
