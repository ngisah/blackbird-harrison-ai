import { render, screen } from '@testing-library/react';
import LoginForm from '.';

test('renders sign in page', () => {
  render(<LoginForm />);
  const signInText = screen.getByText("Sign in");
  expect(signInText).toBeInTheDocument();
});

// Add more unit test here
test('email validation', () => {
  render(<LoginForm />);
  const emailInput = screen.getByLabelText("Email Address");
  const passwordInput = screen.getByLabelText("Password");
  const submitButton = screen.getByRole("button", { name: "Sign In" });

  // Submit the form with an invalid email
  userEvent.type(emailInput, "invalid-email");
  userEvent.type(passwordInput, "validPassword!123");
  userEvent.click(submitButton);

  // Check if the error message is displayed
  const errorMessage = screen.getByText("Please enter a valid email address");
  expect(errorMessage).toBeInTheDocument();

  // Submit the form with a valid email
  userEvent.clear(emailInput);
  userEvent.type(emailInput, "valid-email@example.com");
  userEvent.click(submitButton);

  // Check if the success message is displayed
  const successMessage = screen.getByText("Login Successful");
  expect(successMessage).toBeInTheDocument();
});