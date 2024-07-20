import { useEffect, useState } from "react";
import { shuffle } from "remeda";

export const useVariant = (max: number) => {
	const [variant, setVariant] = useState(() => Math.floor(Math.random() * max) + 1);
	return [
		variant,
		() =>
			setVariant(old => {
				const value = Math.floor(Math.random() * (max - 1)) + 1;
				if (value >= old) return value + 1;
				return value;
			}),
	] as const;
};

export const useOrder = (size: number) => {
	const [order, setOrder] = useState(() => shuffle([...Array(size)].map((_, i) => i + 1)));
	return [order, () => setOrder(x => shuffle(x))] as const;
};
export const useTimer = (length: number, fail: () => void) => {
	const [end, setEnd] = useState(() => Date.now() + length);
	const [time, setTime] = useState(() => end - Date.now());
	useEffect(() => {
		const interval = setInterval(() => {
			if (end - Date.now() < 0) {
				setEnd(Date.now() + length);
				fail();
			}
			else setTime(end - Date.now());
		}, 10);
		return () => clearInterval(interval);
	}, [end, fail, length]);
	return [time, length, () => setEnd(Date.now() + length)] as const;
}