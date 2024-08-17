import { AnimatePresence, motion, useAnimate } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import styles from "./Captcha.module.scss";
import { CaptchaBox } from "./CaptchaBox";
import { Check } from "@mui/icons-material";
import { GameContext } from "../util/GameContext";

export const Captcha = () => {
	const [open, setOpen] = useState(false);
	const [scope, animate] = useAnimate<HTMLButtonElement>();
	const game = useContext(GameContext);
	return (
		<article className={styles.captcha}>
			<div className={styles.checkboxContainer}>
				{game.complete ? <Check /> : <button
					ref={scope}
					className={styles.checkbox}
					onClick={() => {
						if (open) return;
						animate(scope.current, { borderRadius: "50%", backgroundColor: "#d9e1ee", borderColor: "#6696d4" }, { duration: 0.2 });
						setTimeout(() => {
							setOpen(true);
							animate(scope.current, { borderRadius: 0, backgroundColor: "#ffffff", borderColor: "#c1c1c1" }, { duration: 0.2 });
							setTimeout(() => {
								scrollTo({
									top: document.body.scrollHeight,
									behavior: "smooth"
								});
							}, 200);
						}, 500);
					}}
				/>}
				<AnimatePresence>{open && !game.complete && <CaptchaBox />}</AnimatePresence>
			</div>
			<p className={styles.label}>I'm not a robot</p>
		</article>
	);
};
