import styles from "./CaptchaFooter.module.scss";

export const CaptchaFooter = ({
	onClick,
	error,
	level,
	buttonLabel,
	buttonDisabled,
}: {
	onClick(): void;
	error: string | null;
	level: number;
	buttonLabel: string;
	buttonDisabled?: boolean;
}) => {
	return (
		<footer className={styles.footer}>
			<span className={styles.label}>Level {level}</span>
			{error && <span className={styles.error}>{error}</span>}
			<button className={styles.verify} onClick={onClick} {...(buttonDisabled ? { disabled: true } : null)}>
				{buttonLabel}
			</button>
		</footer>
	);
};
