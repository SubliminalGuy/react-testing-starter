import { render, screen } from "@testing-library/react";
import { User } from "../../src/entities";
import UserList from "../../src/components/UserList";

describe("UserList", () => {
  it("should render no users when user array is empty", () => {
    const users: User[] = [];
    render(<UserList users={users} />);
    const result = screen.getByText(/no users/i);
    expect(result).toBeInTheDocument();
  });

  it("should render a list of users", () => {
    const users: User[] = [
      { id: 1, name: "David" },
      { id: 2, name: "Teresa" },
    ];

    render(<UserList users={users} />);

    users.forEach((user) => {
      const element = screen.getByRole("link", { name: user.name });
      expect(element).toBeInTheDocument();
      expect(element).toHaveAttribute("href", `/users/${user.id}`);
    });
  });
});
