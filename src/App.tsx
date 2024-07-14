import { useMemo, useState } from "react";
import "./App.css";
import { Captcha } from "./components/Captcha";
import { GameContext } from "./util/GameContext";

function App() {
	const [level, setLevel] = useState(1);
	const game = useMemo(() => ({ level, setLevel, nextLevel: () => setLevel(x => x + 1) }), [level, setLevel]);
	return (
		<GameContext.Provider value={game}>
			<main>
				<h1>Title</h1>
				<Captcha />
			</main>
		</GameContext.Provider>
	);
}

export default App;
