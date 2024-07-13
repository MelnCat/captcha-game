import { useContext } from "react";
import styles from "./CaptchaBox.module.scss";
import { CaptchaHeader } from "./CaptchaHeader";
import { GameContext } from "../util/GameContext";
import { levels } from "../levels/levels";

export const CaptchaBox = () => {
	const game = useContext(GameContext);
	const CurrentLevel = levels[game.level].component;
	return (
		<article className={styles.captchaBox}>
			<CurrentLevel />
		</article>
	);
};
