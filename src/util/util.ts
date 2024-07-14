import { useState } from "react";
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
