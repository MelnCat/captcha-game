import { CaptchaContent } from "../components/CaptchaContent";
import { CaptchaFooter } from "../components/CaptchaFooter";
import { CaptchaGrid } from "../components/CaptchaGrid";
import { CaptchaHeader } from "../components/CaptchaHeader";

export const Level1 = () => {
	return (
		<>
			<CaptchaHeader content={{
				title: "Select all images with",
				term: "cars"
			}} />
			<CaptchaContent>
				<CaptchaGrid />
			</CaptchaContent>
			<hr />
			<CaptchaFooter />
		</>
	);
};
