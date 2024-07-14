import { useState } from "react";

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
