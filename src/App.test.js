import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import App from "./App";

test("can receive a new user and shows in a list", async () => {
  // render
  render(<App />);

  // query form elements
  const nameInput = screen.getByRole("textbox", { name: /name/i });
  const emailInput = screen.getByRole("textbox", { name: /email/i });
  const button = screen.getByRole("button");

  // fill inputs
  await user.click(nameInput);
  await user.keyboard("John Doe");
  await user.click(emailInput);
  await user.keyboard("john@john.com");
  await user.click(button);

  // query list elements
  const name = screen.getByRole("cell", { name: "John Doe" });
  const email = screen.getByRole("cell", { name: "john@john.com" });

  // assert
  expect(name).toBeInTheDocument();
  expect(email).toBeInTheDocument();
});
