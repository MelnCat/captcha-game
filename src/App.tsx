import { useMemo, useState } from "react";
import styles from "./App.module.css";
import { Captcha } from "./components/Captcha";
import { GameContext } from "./util/GameContext";
import { useLocalStorage } from "usehooks-ts";
import { AnimatePresence } from "framer-motion";

function App() {
	const [level, setLevel] = useLocalStorage("level", 1);
	const game = useMemo(
		() => ({
			level,
			setLevel,
			nextLevel: () => {
				setLevel(x => x + 1);
				setTimeout(() => {
					scrollTo({
						top: document.body.scrollHeight,
						behavior: "smooth",
					});
				}, 500);
			},
		}),
		[level, setLevel]
	);
	return (
		<GameContext.Provider value={game}>
			<main className={styles.main}>
				<form>
					<h1 className={styles.title}>Login</h1>
					<h2 className={styles.label}>Email</h2>
					<input className={styles.input} disabled value="feafewafawefaw"></input>
					<h2 className={styles.label}>Password</h2>
					<input className={styles.input} disabled type="password" value="feafewafawefaw"></input>
				</form>
				<div className={styles.spacer} />
				<Captcha />
			</main>
		</GameContext.Provider>
	);
}

export default App;
