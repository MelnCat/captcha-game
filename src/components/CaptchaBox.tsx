import styles from "./CaptchaBox.module.scss";

export const CaptchaBox = () => {
	return (
		<article className={styles.captchaBox}>
			<header>
				<span className={styles.title}>Select all squares with</span>
				<p>fire hydrants</p>
				<span className={styles.skip}>If there are none, click skip</span>
			</header>
			<section className={styles.contentBox}>
				
			</section>
		</article>
	);
};
