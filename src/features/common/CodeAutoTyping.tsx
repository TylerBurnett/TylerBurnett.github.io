import { PrismAsyncLight as SyntaxHighlighter, type SyntaxHighlighterProps } from "react-syntax-highlighter";
import Typist from "react-typist-component";
import "./CodeAutoTyping.css";
import { useInView } from "react-intersection-observer";

export interface CodeAutoTypingProps {
	text: string | string[];
	language?: SyntaxHighlighterProps["language"];
	syntaxHighlighterProps?: SyntaxHighlighterProps;
}

function CodeAutoTyping(props: CodeAutoTypingProps) {
	const { text, language, syntaxHighlighterProps } = props;

	const { ref, inView } = useInView();

	return (
		<div className="code-snippet" style={{ minWidth: "100%", minHeight: "300px" }} ref={ref}>
			<Typist typingDelay={100} cursor={<span className="cursor">|</span>} pause={!inView}>
				<SyntaxHighlighter showLineNumbers wrapLines language={language} {...syntaxHighlighterProps}>
					{text}
				</SyntaxHighlighter>
			</Typist>
		</div>
	);
}

export default CodeAutoTyping;
