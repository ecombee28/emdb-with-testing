import { render, screen, waitFor } from "@testing-library/react";
import Watchlist from "../pages/watchlist";

describe("testing watch list", () => {
  it("has the correct text if the user is not signed on", async () => {
    render(<Watchlist />);

    await waitFor(() => {
      const text = screen.getByText(
        "You have to be signed in to see your WatchList."
      );
      expect(text).toBeInTheDocument();
    });
  });
});
