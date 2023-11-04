import { render, screen } from "@testing-library/react";
import UserForm from "./UserForm";
import user from "@testing-library/user-event";

test("it shows two input and button", async () => {
  render(<UserForm />);

  const inputs = await screen.findAllByRole("textbox");
  const button = screen.getByRole("button");

  expect(inputs).toHaveLength(2);
  expect(button).toBeInTheDocument();
});

test("it calls onUserAdd with name and email on submit", async () => {
  const mock = jest.fn();

  // render
  render(<UserForm onUserAdd={mock} />);

  // fill inputs
  const nameInput = screen.getByRole("textbox", { name: /name/i });
  const emailInput = screen.getByRole("textbox", { name: /email/i });

  await user.click(nameInput);
  await user.keyboard("John Doe");

  await user.click(emailInput);
  await user.keyboard("johndoe@mail.com");

  // click button
  const button = screen.getByRole("button");
  await user.click(button);

  // assert
  expect(mock).toHaveBeenCalled();
  expect(mock).toHaveBeenCalledWith({
    name: "John Doe",
    email: "johndoe@mail.com",
  });
});
