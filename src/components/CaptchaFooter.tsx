import styles from "./CaptchaFooter.module.scss";

export const CaptchaFooter = () => {
	return <footer className={styles.footer}>
		<span className={styles.label}>Level 1</span>
		<button className={styles.verify}>Verify</button>
	</footer>;
};
