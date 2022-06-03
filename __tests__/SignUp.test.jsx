import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import SignUp from "../components/SignUp";
import { Provider } from "react-redux";
import { store } from "../app/store";
import userEvent from "@testing-library/user-event";

describe("testing sign up component", () => {
  test("submitting with a bad username ", async () => {
    render(
      <Provider store={store}>
        <SignUp changeView={"signup"} />
      </Provider>
    );

    const password = "password";
    const blankUserName = "";
    const badUserName = "can";

    const submitBtn = screen.getByRole("button");
    const usernameInput = screen.getByTestId("userName-input");
    const passwordInput = screen.getByTestId("password-input");

    fireEvent.change(usernameInput, { target: { value: blankUserName } });
    expect(usernameInput.value).toMatch(blankUserName);

    fireEvent.change(passwordInput, { target: { value: password } });
    expect(passwordInput.value).toMatch(password);

    userEvent.click(submitBtn);

    await waitFor(() => {
      const noPassError = screen.getByText(
        "Username must be between 4 and 12 characters long"
      );
      expect(noPassError).toBeInTheDocument();
    });

    fireEvent.change(usernameInput, { target: { value: badUserName } });
    expect(usernameInput.value).toMatch(badUserName);

    userEvent.click(submitBtn);

    await waitFor(() => {
      const noPassError = screen.getByText(
        "Username must be between 4 and 12 characters long"
      );
      expect(noPassError).toBeInTheDocument();
    });
  });
});
