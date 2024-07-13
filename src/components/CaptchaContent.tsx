import { ReactNode } from "react";
import styles from "./CaptchaContent.module.scss";

export const CaptchaContent = ({ children }: { children?: ReactNode }) => {
	return <section className={styles.contentBox}>{children}</section>;
};
