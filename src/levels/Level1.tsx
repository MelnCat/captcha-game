import { useContext, useState } from "react";
import { CaptchaContent } from "../components/CaptchaContent";
import { CaptchaFooter } from "../components/CaptchaFooter";
import { CaptchaGrid } from "../components/CaptchaGrid";
import { CaptchaHeader } from "../components/CaptchaHeader";
import { GameContext } from "../util/GameContext";

export const Level1 = () => {
	const game = useContext(GameContext);
	const [selections, setSelections] = useState(Array(9).fill(false) as boolean[]);
	const [variant, setVariant] = useState(() => Math.floor(Math.random() * 8) + 1);
	const answer = [false, false, false, true, false, false, false ,false ,false];
	const validate = () => {
		if (selections.every((x, i) => x === answer[i])) {
			game.nextLevel();
		} else {
			setSelections(Array(9).fill(false) as boolean[]);
			setVariant(old => {
				const value = Math.floor(Math.random() * 7) + 1;
				if (value >= old) return value + 1;
				return value;
			});
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
			<CaptchaFooter onClick={validate} />
		</>
	);
};
