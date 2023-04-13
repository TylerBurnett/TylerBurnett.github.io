import React from "react";
import Typist from "react-typist-component";
import { PrismAsyncLight as SyntaxHighlighter, SyntaxHighlighterProps } from "react-syntax-highlighter";
import "./CodeAutoTyping.css";

export interface CodeAutoTypingProps {
  text: string | string[];
  language?: SyntaxHighlighterProps["language"];
  syntaxHighlighterProps?: SyntaxHighlighterProps;
}

function CodeAutoTyping(props: CodeAutoTypingProps) {
  const { text, language, syntaxHighlighterProps } = props;

  return (
    <div className="code-snippet" style={{ minWidth: "100%", minHeight: "300px" }}>
      <Typist typingDelay={100} cursor={<span className="cursor">|</span>}>
        <SyntaxHighlighter showLineNumbers wrapLines language={language} {...syntaxHighlighterProps}>
          {text}
        </SyntaxHighlighter>
      </Typist>
    </div>
  );
}

export default CodeAutoTyping;
