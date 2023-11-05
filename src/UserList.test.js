import { render, screen, within } from "@testing-library/react";
import UserList from "./UserList";

function renderComponent() {
  const users = [
    { name: "John", email: "john@gmail.com" },
    { name: "Dav", email: "dav@gmail.com" },
  ];

  render(<UserList users={users} />);

  return {
    users,
  };
}

test("render one row for each user", async () => {
  renderComponent();

  const rows = within(screen.getByTestId("users-list")).getAllByRole("row");

  expect(rows).toHaveLength(2);
});

test("render email and name of each user", async () => {
  const { users } = renderComponent();

  for (const user of users) {
    const name = screen.getByRole("cell", { name: user.name });
    const email = screen.getByRole("cell", { name: user.email });

    expect(name).toBeInTheDocument();
    expect(email).toBeInTheDocument();
  }
});
