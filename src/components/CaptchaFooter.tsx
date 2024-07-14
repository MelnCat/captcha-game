import styles from "./CaptchaFooter.module.scss";

export const CaptchaFooter = ({ onClick, error, level, buttonLabel }: { onClick(): void; error: string | null, level: number, buttonLabel: string }) => {
	return (
		<footer className={styles.footer}>
			<span className={styles.label}>Level {level}</span>
			{error && <span className={styles.error}>{error}</span>}
			<button className={styles.verify} onClick={onClick}>
				{buttonLabel}
			</button>
		</footer>
	);
};
