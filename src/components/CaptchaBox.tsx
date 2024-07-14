import { useContext } from "react";
import { levels } from "../levels/levels";
import { GameContext } from "../util/GameContext";
import styles from "./CaptchaBox.module.scss";

export const CaptchaBox = () => {
	const game = useContext(GameContext);
	const CurrentLevel = levels[game.level].component;
	return (
		<article className={styles.captchaBox}>
			<CurrentLevel />
		</article>
	);
};