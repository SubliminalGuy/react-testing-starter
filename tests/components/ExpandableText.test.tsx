import { render, screen } from "@testing-library/react";
import ExpandableText from "../../src/components/ExpandableText";
import userEvent from "@testing-library/user-event";

describe("TermsAndConditions", () => {
  const longText = "e".repeat(300);
  const truncatedText = longText.substring(0, 255) + "...";

  it("should render full text if text is shorter than 255 chars", () => {
    const shortText = "e".repeat(50);
    render(<ExpandableText text={shortText} />);

    const article = screen.getByRole("article");
    expect(article).toBeInTheDocument();
    expect(article.textContent).toHaveLength(50);
  });

  it("should render truncated text if text is longer than 255 chars", () => {
    render(<ExpandableText text={longText} />);

    const article = screen.getByRole("article");
    expect(article).toBeInTheDocument();
    expect(article.textContent).toBe(truncatedText);
    const button = screen.getByRole("button");
    expect(button).toHaveTextContent(/more/i);
  });

  it("should render full text if user clicks show more", async () => {
    render(<ExpandableText text={longText} />);

    const button = screen.getByRole("button");
    const user = userEvent.setup();
    await user.click(button);

    const article = screen.getByRole("article");
    expect(article.textContent).toBe(longText);
    expect(button).toHaveTextContent(/less/i);
  });

  it("should collapse if user clicks show less", async () => {
    render(<ExpandableText text={longText} />);
    const showMoreButton = screen.getByRole("button", { name: /more/i });
    const user = userEvent.setup();
    await user.click(showMoreButton);

    const showLessButton = screen.getByRole("button", { name: /less/i });
    await user.click(showLessButton);

    const article = screen.getByRole("article");
    expect(article.textContent).toBe(truncatedText);
    expect(showMoreButton).toHaveTextContent(/more/i);
  });
});
