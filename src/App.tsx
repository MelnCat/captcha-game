import { useEffect, useMemo, useState } from "react";
import styles from "./App.module.scss";
import { Captcha } from "./components/Captcha";
import { GameContext } from "./util/GameContext";
import { useLocalStorage } from "usehooks-ts";
import { AnimatePresence } from "framer-motion";
import { Button, TextField } from "@mui/material";
import confetti from "canvas-confetti";

const targetEmail = "example@gmail.com";
const targetPassword = "aijefaifeafaewfawe";
function App() {
	const [level, setLevel] = useLocalStorage("level", 1);
	const [complete, setComplete] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [typing, setTyping] = useState(0);
	const [win, setWin] = useState(false);
	useEffect(() => {
		const interval = setInterval(() => {
			if (typing > Math.max(targetEmail.length, targetPassword.length)) return;
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
				setLevel(level + 1);
				setTimeout(() => {
					scrollTo({
						top: document.body.scrollHeight,
						behavior: "smooth",
					});
				}, 500);
			},
			complete,
			setComplete: (x: boolean) => {
				if (x) setLevel(1);
				setComplete(x);
			},
		}),
		[level, setLevel, complete, setComplete]
	);
	return (
		<GameContext.Provider value={game}>
			{win ? (
				<main className={styles.main}>
					<h1 className={styles.title}>You Win!</h1>
					<p>Play again?</p>
					<Button
						variant="contained"
						disabled={!game.complete}
						onClick={() => {
							setWin(false);
							setLevel(1);
							setComplete(false);
						}}
					>
						RESTART
					</Button>
				</main>
			) : (
				<main className={styles.main}>
					<form>
						<h1 className={styles.title}>Login</h1>
						<TextField focused={typing < targetEmail.length} value={email} onChange={x => setEmail(x.target.value)} label="Email" type="email" fullWidth />
						<TextField
							focused={typing < targetPassword.length}
							value={password}
							onChange={x => setPassword(x.target.value)}
							type="password"
							label="Password"
							fullWidth
						/>
					</form>
					<Captcha />
					<Button
						variant="contained"
						disabled={!game.complete}
						onClick={() => {
							if (!game.complete) return;
							setWin(true);
							confetti();
						}}
					>
						Log In
					</Button>
				</main>
			)}
		</GameContext.Provider>
	);
}

export default App;
