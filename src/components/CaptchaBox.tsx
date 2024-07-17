import { useContext } from "react";
import { levels } from "../levels/levels";
import { GameContext } from "../util/GameContext";
import styles from "./CaptchaBox.module.scss";
import { AnimatePresence, motion } from "framer-motion";
export const CaptchaBox = () => {
	const game = useContext(GameContext);
	const CurrentLevel = levels[game.level].component;
	return (
		<motion.article initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={styles.captchaBox} style={{
			...(levels[game.level].width ? { width: levels[game.level].width } : null)
		}}>
			<AnimatePresence mode="wait">
				<CurrentLevel key={game.level} />
			</AnimatePresence>
		</motion.article>
	);
};
