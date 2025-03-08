import { afterEach, describe, it, expect, vi } from "vitest";
import type * as React from "react"; // Change from type import to full import
import { render, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";

// Code Auto typing adds and removes to the dom as part of its animation
vi.mock("../common/CodeAutoTyping", () => ({
	default: ({ text }: { text: string }) => <div data-testid="code-auto-typing">{text}</div>,
}));

// Import components after mocks are defined
import HomePage from "./HomePage";
import AppTheme from "../../theme/theme";

describe("HomePage", () => {
	afterEach(() => {
		cleanup();
	});

	it("renders without crashing", () => {
		const { container } = render(
			<MemoryRouter>
				<ThemeProvider theme={AppTheme}>
					<HomePage />
				</ThemeProvider>
			</MemoryRouter>,
		);
		expect(container).toBeDefined();
	});

	it("matches snapshot", () => {
		const { asFragment } = render(
			<MemoryRouter>
				<ThemeProvider theme={AppTheme}>
					<HomePage />
				</ThemeProvider>
			</MemoryRouter>,
		);
		expect(asFragment()).toMatchSnapshot();
	});
});
