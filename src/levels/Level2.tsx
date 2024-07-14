import { useContext, useState } from "react";
import { CaptchaContent } from "../components/CaptchaContent";
import { CaptchaFooter } from "../components/CaptchaFooter";
import { CaptchaGrid } from "../components/CaptchaGrid";
import { CaptchaHeader } from "../components/CaptchaHeader";
import { GameContext } from "../util/GameContext";
import { countBits } from "../util/bits";

const solutions: Record<number, { primary: bigint; secondary: bigint }> = {
	1: { primary: 4912n, secondary: 8194n },
	2: { primary: 35936n, secondary: 134n },
	3: { primary: 28672n, secondary: 1792n },
};

export const Level2 = () => {
	const game = useContext(GameContext);
	const [selections, setSelections] = useState(0n);
	const [variant, setVariant] = useState(() => 3); // Math.floor(Math.random() * 1) + 1);
	const [error, setError] = useState<string | null>(null);
	const validate = () => {
		console.log(variant, selections);
		if ((selections & ~solutions[variant].secondary) === solutions[variant].primary) {
			// success
		} else {
			setSelections(0n);
			setVariant(old => {
				const value = Math.floor(Math.random() * 3) + 1;
				if (value >= old) return value + 1;
				return value;
			});
			setError("Please try again.");
		}
	};
	return (
		<>
			<CaptchaHeader
				content={{
					title: "Select all squares with",
					term: "stairs",
				}}
			/>
			<CaptchaContent>
				<CaptchaGrid image={`url("/img/l2/${variant}.jfif")`} size={4} selections={selections} setSelections={setSelections} />
			</CaptchaContent>
			<hr />
			<CaptchaFooter level={2} buttonLabel="Verify" error={error} onClick={validate} />
		</>
	);
};
