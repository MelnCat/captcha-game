import { useContext, useState } from "react";
import { CaptchaContent } from "../components/CaptchaContent";
import { CaptchaFooter } from "../components/CaptchaFooter";
import { CaptchaGrid } from "../components/CaptchaGrid";
import { CaptchaHeader } from "../components/CaptchaHeader";
import { GameContext } from "../util/GameContext";

export const solutions: Record<number, bigint> = {
	1: 163n,
	2: 194n,
	3: 7n,
	4: 38n,
	5: 133n,
	6: 385n,
	7: 152n,
	8: 26n,
}

export const Level1 = () => {
	const game = useContext(GameContext);
	const [selections, setSelections] = useState(0n);
	const [variant, setVariant] = useState(() => Math.floor(Math.random() * 8) + 1);
	const [error, setError] = useState<string | null>(null);
	const validate = () => {
		if (selections === solutions[variant]) {
			game.nextLevel();
		} else {
			setSelections(0n);
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
				<CaptchaGrid image={`url("/img/l1/${variant}.jfif")`} selections={selections} setSelections={setSelections} size={3} />
			</CaptchaContent>
			<hr />
			<CaptchaFooter level={1} buttonLabel="Verify" error={error} onClick={validate} />
		</>
	);
};
