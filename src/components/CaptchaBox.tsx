import styles from "./CaptchaBox.module.scss";

export const CaptchaBox = () => {
	return (
		<article className={styles.captchaBox}>
			<header>
				<span>Select all squares with</span>
				<p>fire hydrants</p>
			</header>
		</article>
	);
}