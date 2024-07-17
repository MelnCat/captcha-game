import { useEffect, useMemo, useState } from "react";
import styles from "./App.module.scss";
import { Captcha } from "./components/Captcha";
import { GameContext } from "./util/GameContext";
import { useLocalStorage } from "usehooks-ts";
import { AnimatePresence } from "framer-motion";
import { TextField } from "@mui/material";

const targetEmail = "example@gmail.com";
const targetPassword = "aijefaifeafaewfawe";
function App() {
	const [level, setLevel] = useLocalStorage("level", 1);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [typing, setTyping] = useState(0);
	useEffect(() => {
		const interval = setInterval(() => {
			if (typing > Math.max(targetEmail.length, targetPassword.length)) return;
			console.log(1)
			setEmail(targetEmail.slice(0, typing));
			setPassword(targetPassword.slice(0, typing));
			setTyping(x => x + 1);
		}, 50);
		return () => clearInterval(interval);
	}, [setEmail, setPassword, email, password, typing, setTyping]);
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
					<TextField focused={typing < targetEmail.length} value={email} onChange={x => setEmail(x.target.value)} label="Email" type="email" fullWidth />
					<TextField focused={typing < targetPassword.length} value={password} onChange={x => setPassword(x.target.value)} type="password" label="Password" fullWidth />
				</form>
				<div className={styles.spacer} />
				<Captcha />
			</main>
		</GameContext.Provider>
	);
}

export default App;
