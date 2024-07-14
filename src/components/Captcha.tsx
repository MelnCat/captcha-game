import { useState } from "react";
import styles from "./Captcha.module.scss";
import { CaptchaBox } from "./CaptchaBox";
import { motion, AnimatePresence } from "framer-motion";

export const Captcha = () => {
	const [open, setOpen] = useState(false);
	return (
		<article className={styles.captcha}>
			<div className={styles.checkboxContainer}>
				<button className={styles.checkbox} onClick={() => setOpen(true)} />
				<AnimatePresence>{open && <CaptchaBox />}</AnimatePresence>
			</div>
			<p className={styles.label}>I'm not a robot</p>
		</article>
	);
};
