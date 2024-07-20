import styles from "./CaptchaHeader.module.scss";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
export const CaptchaHeader = ({
	content,
	timer,
}: {
	content: {
		title: string;
		term: string;
		skip?: string;
	};
	timer?: {
		current: number;
		max: number;
	};
}) => {
	return (
		<header className={styles.header}>
			<span className={styles.title}>{content.title}</span>
			<span className={styles.term}>{content.term}</span>
			{content.skip && <span className={styles.skip}>{content.skip}</span>}
			{timer !== undefined && (
				<span className={styles.timer}>
					<TimerOutlinedIcon />
					<div
						className={styles.timerBar}
						style={{
							backgroundImage: `linear-gradient(90deg, white 0%, white ${(timer.current / timer.max) * 100}%, transparent ${
								(timer.current / timer.max) * 100
							}%, transparent 100%)`,
						}}
					/>
					<span>{(timer.current / 1000).toFixed(1)}s</span>
				</span>
			)}
		</header>
	);
};
