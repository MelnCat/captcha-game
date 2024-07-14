export const countBits = (num: bigint) => {
	let value = num;
	let count = 0;
	while (value) {
		count += Number(value & 1n);
		value >>= 1n;
	}
	return count;
};
