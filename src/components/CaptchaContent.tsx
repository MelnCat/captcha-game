import { ReactNode } from "react";
import styles from "./CaptchaContent.module.scss";

export const CaptchaContent = ({ children, pixelated }: { children?: ReactNode, pixelated?: boolean }) => {
	return <section className={styles.contentBox} style={pixelated ? { imageRendering: "pixelated" } : {}}>{children}</section>;
};
