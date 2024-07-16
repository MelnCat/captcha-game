import { motion } from "framer-motion";
import { useContext, useEffect, useMemo, useState } from "react";
import { chunk } from "remeda";
import { CaptchaContent } from "../components/CaptchaContent";
import { CaptchaFooter } from "../components/CaptchaFooter";
import { CaptchaGrid } from "../components/CaptchaGrid";
import { CaptchaHeader } from "../components/CaptchaHeader";
import { GameContext } from "../util/GameContext";
import { SettingsInputAntenna } from "@mui/icons-material";
import limbo from "../../public/audio/limbo.mp3";
import useSound from "use-sound";

export const Level9 = () => {
	const game = useContext(GameContext);
	const [selections, setSelections] = useState(0n);
	const [error, setError] = useState<string | null>(null);
	const validate = () => {
		if (selections === 2n ** BigInt(answer)) {
			game.nextLevel();
		} else {
			setSelections(0n);
			setStage(0);
			setAnswer(() => Math.floor(Math.random() * 16));
			setSteps(0);
			setError("Please try again.");
		}
	};
	return (
		<motion.article initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
			<CaptchaHeader
				content={{
					title: "Select all squares with",
					term: "golden keys",
					skip: "FOCUS",
				}}
			/>
			<CaptchaContent>
				<CaptchaGrid
					opacity={stage === 1 ? 0.8 : 1}
					animateLayout
					hideDisallowed
					disallowed={stage === 2 ? 0n : ~0n}
					order={order}
					image={images}
					size={4}
					selections={selections}
					setSelections={setSelections}
				/>
			</CaptchaContent>
			<hr />
			<CaptchaFooter level={8} buttonLabel={"Verify"} error={error} onClick={validate} />
		</motion.article>
	);
};
