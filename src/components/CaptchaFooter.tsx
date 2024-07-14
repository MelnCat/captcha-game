import styles from "./CaptchaFooter.module.scss";

export const CaptchaFooter = ({ onClick, error }: { onClick(): void; error: string | null }) => {
	return (
		<footer className={styles.footer}>
			<span className={styles.label}>Level 1</span>
			{error && <span className={styles.error}>{error}</span>}
			<button className={styles.verify} onClick={onClick}>
				Verify
			</button>
		</footer>
	);
};
