import styles from "./CaptchaHeader.module.scss";

export const CaptchaHeader = ({ content }: { content: {
	title: string;
	term: string;
	skip?: string;
}}) => {
	return (
		<header className={styles.header}>
			<span className={styles.title}>{content.title}</span>
			<span className={styles.term}>{content.term}</span>
			{content.skip && <span className={styles.skip}>{content.skip}</span>}
		</header>
	);
};
