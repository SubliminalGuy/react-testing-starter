import { render, screen } from "@testing-library/react";
import { User } from "../../src/entities";
import UserAccount from "../../src/components/UserAccount";

describe("UserAccount", () => {
  it("should render user name", () => {
    const user: User = { id: 1, name: "David" };
    render(<UserAccount user={user} />);
    const element = screen.getByText(user.name);
    expect(element).toBeInTheDocument();
  });

  it("should render edit button if user is admin", () => {
    const user: User = { id: 1, name: "David", isAdmin: true };
    render(<UserAccount user={user} />);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/edit/i);
  });

  it("should NOT render edit button if user is not an admin", () => {
    const user: User = { id: 1, name: "David" };
    render(<UserAccount user={user} />);
    const button = screen.queryByRole("button");
    expect(button).not.toBeInTheDocument();
  });
});
