import styles from "./CaptchaGrid.module.scss";

export const CaptchaGrid = () => {
	return (
		<section className={styles.grid} style={{ "--bg-image": "url('/img/t1/1.jfif')" }}>
			{[...Array(3)].map((_, i) => [...Array(3)].map((_, j) => <div className={styles.gridItem} key={`${i}_${j}`}></div>))}
		</section>
	);
};
