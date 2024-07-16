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

export const Level8 = () => {
	const game = useContext(GameContext);
	const [selections, setSelections] = useState(0n);
	const [answer, setAnswer] = useState(() => Math.floor(Math.random() * 16));
	const [error, setError] = useState<string | null>(null);
	const [stage, setStage] = useState(0);
	const [order, setOrder] = useState([...Array(16)].map((_, i) => i));
	const [steps, setSteps] = useState(0);
	const [play] = useSound("/audio/limbo.mp3");
	const images = useMemo(() => {
		if (stage === 0) {
			const imgs = Array(16).fill(`url("/img/l8/keygray.png")`);
			imgs[answer] = `url(/img/l8/keyyellow.gif)`;
			return imgs;
		} else if (stage === 1) {
			return Array(16).fill(`url("/img/l8/keygray.png")`);
		} else if (stage === 2) {
			return Array(16).fill(`url("/img/l8/keygray.png")`);
		}
		return [];
	}, [answer, stage]);
	useEffect(() => {
		if (stage === 0) {
			const timeout = setTimeout(() => {
				setStage(1);
				setTimeout(() => {
					play();
				}, 300);
			}, 1200);
			return () => {
				clearTimeout(timeout);
			};
		}
		if (stage === 1) {
			const interval = setInterval(() => {
				setSteps(x => x + 1);
				const type = Math.floor(Math.random() * 10 + 1);
				if (type === 1) {
					setOrder(o => {
						const columns = chunk(o, 4);
						return columns.flatMap(([a, b, c, d]) => [b, a, d, c]);
					});
				} else if (type === 2) {
					setOrder(o => {
						const [a, b, c, d] = chunk(o, 4);
						return [b, a, d, c].flat();
					});
				} else if (type === 3) {
					setOrder(x => {
						const [a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p] = x;
						return [e, a, g, c, f, b, h, d, m, i, o, k, n, j, p, l];
					});
				} else if (type === 4) {
					setOrder(x => {
						const [e, a, g, c, f, b, h, d, m, i, o, k, n, j, p, l] = x;
						return [a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p];
					});
				} else if (type === 5) {
					setOrder(o => {
						const columns = chunk(o, 4);
						return columns.flatMap(([a, b, c, d]) => [c, d, a, b]);
					});
				} else if (type === 6) {
					setOrder(o => {
						const [a, b, c, d] = chunk(o, 4);
						return [c, d, a, b].flat();
					});
				} else if (type === 7) {
					setOrder(x => {
						const [a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p] = x;
						return [e, a, b, c, i, j, f, d, m, k, g, h, n, o, p, l];
					});
				} else if (type === 8) {
					setOrder(x => {
						const [e, a, b, c, i, j, f, d, m, k, g, h, n, o, p, l] = x;
						return [a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p];
					});
				} else if (type === 9) {
					setOrder(x => {
						const [a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p] = x;
						return [i, j, a, b, m, n, e, f, k, l, c, d, o, p, g, h];
					});
				} else if (type === 10) {
					setOrder(x => {
						const [i, j, a, b, m, n, e, f, k, l, c, d, o, p, g, h] = x;
						return [a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p];
					});
				}
				if (steps > 28) setStage(2);
			}, 310);
			return () => clearInterval(interval);
		}
	}, [stage, setStage, setOrder, steps, setSteps, play]);
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
