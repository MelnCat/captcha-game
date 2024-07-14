import styles from "./CaptchaFooter.module.scss";

export const CaptchaFooter = ({ onClick }: { onClick(): void }) => {
	return <footer className={styles.footer}>
		<span className={styles.label}>Level 1</span>
		<button className={styles.verify} onClick={onClick}>Verify</button>
	</footer>;
};
