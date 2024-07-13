import styles from "./CaptchaHeader.module.scss";

export const CaptchaHeader = () => {
	return (
		<header className={styles.header}>
			<span className={styles.title}>Select all squares with</span>
			<span className={styles.command}>fire hydrants</span>
			<span className={styles.skip}>If there are none, click skip</span>
		</header>
	);
};
