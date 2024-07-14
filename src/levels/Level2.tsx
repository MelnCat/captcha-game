import { useContext, useState } from "react";
import { CaptchaContent } from "../components/CaptchaContent";
import { CaptchaFooter } from "../components/CaptchaFooter";
import { CaptchaGrid } from "../components/CaptchaGrid";
import { CaptchaHeader } from "../components/CaptchaHeader";
import { GameContext } from "../util/GameContext";

export const Level2 = () => {
	const game = useContext(GameContext);
	const [selections, setSelections] = useState(0n);
	const [variant, setVariant] = useState(() => Math.floor(Math.random() * 8) + 1);
	const [error, setError] = useState<string | null>(null);
	const validate = () => {
	}
	return (
		<>
			<CaptchaHeader
				content={{
					title: "Select all squares with",
					term: "motorcycles",
				}}
			/>
			<CaptchaContent>
				<CaptchaGrid image={`url("t")`} size={10} selections={selections} setSelections={setSelections} />
			</CaptchaContent>
			<hr />
			<CaptchaFooter level={2} buttonLabel="Verify" error={error} onClick={validate} />
		</>
	);
};
