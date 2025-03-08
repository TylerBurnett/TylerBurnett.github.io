import Typist from "react-typist-component";
import "./CodeAutoTyping.css";
import { useInView } from "react-intersection-observer";
import { Prism, type SyntaxHighlighterProps } from "react-syntax-highlighter";
import type React from "react";

// Type assertion to fix compatibility issue
const SyntaxHighlighter = Prism as React.ComponentType<SyntaxHighlighterProps>;

export interface CodeAutoTypingProps {
	text: string | string[];
	language?: SyntaxHighlighterProps["language"];
	syntaxHighlighterProps?: Partial<SyntaxHighlighterProps>;
}

function CodeAutoTyping(props: CodeAutoTypingProps) {
	const { text, language, syntaxHighlighterProps } = props;

	const { ref, inView } = useInView();

	return (
		<div className="code-snippet" style={{ minWidth: "100%", minHeight: "300px" }} ref={ref}>
			<Typist typingDelay={40} cursor="|" pause={!inView}>
				<SyntaxHighlighter language={language} {...syntaxHighlighterProps}>
					{text}
				</SyntaxHighlighter>
			</Typist>
		</div>
	);
}

export default CodeAutoTyping;
