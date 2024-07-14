import "react";

declare module "*.module.scss" {
	const classes: { [key: string]: string };
	export default classes;
}

declare module "react" {
	interface CSSProperties {
		[key: `--${string}`]: string | number | undefined;
	}
}