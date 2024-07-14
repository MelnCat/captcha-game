import { useContext, useState } from "react";
import { CaptchaContent } from "../components/CaptchaContent";
import { CaptchaFooter } from "../components/CaptchaFooter";
import { CaptchaGrid } from "../components/CaptchaGrid";
import { CaptchaHeader } from "../components/CaptchaHeader";
import { GameContext } from "../util/GameContext";

export const Level2 = () => {
	const game = useContext(GameContext);
	const [selections, setSelections] = useState(0);
	const [variant, setVariant] = useState(() => Math.floor(Math.random() * 8) + 1);
	const [error, setError] = useState<string | null>(null);
	const validate = () => {
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
