import styles from "./Captcha.module.scss";
import { CaptchaBox } from "./CaptchaBox";

export const Captcha = () => {
	return (
		<article className={styles.captcha}>
			<div className={styles.checkboxContainer}>
				<button className={styles.checkbox} />
				<CaptchaBox />
			</div>
			<p className={styles.label}>I'm not a robot</p>
		</article>
	);
};
