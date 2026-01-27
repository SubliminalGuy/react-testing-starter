import { render, screen } from "@testing-library/react";
import SearchBox from "../../src/components/SearchBox";
import userEvent from "@testing-library/user-event";

describe("TermsAndConditions", () => {
  const renderSearchBox = () => {
    const onChange = vi.fn();
    render(<SearchBox onChange={onChange} />);

    return {
      input: screen.getByPlaceholderText(/search/i),
      user: userEvent.setup(),
      onChange,
    };
  };

  it("should render with correct placeholder text", () => {
    const { input } = renderSearchBox();

    expect(input).toBeInTheDocument();
  });

  it("should call onChange when input is not empty and Enter is pressed ", async () => {
    const { input, user, onChange } = renderSearchBox();

    const searchTerm = "SearchTerm";
    await user.type(input, searchTerm + "{enter}");
    expect(onChange).toHaveBeenCalledWith(searchTerm);
  });

  it("should not call onChange when input is empty", async () => {
    const { input, user, onChange } = renderSearchBox();

    const searchTerm = "";
    await user.type(input, searchTerm + "{enter}");
    expect(onChange).not.toHaveBeenCalledWith(searchTerm);
  });
});
