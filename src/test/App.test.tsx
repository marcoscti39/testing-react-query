import { describe, it } from "vitest";
import { setupServer } from "msw/node";
import { handlers } from "../mocking/handlers";
import { render, screen, waitFor } from "@testing-library/react";
import App from "../App";
import "whatwg-fetch";
import "@testing-library/jest-dom";
import { renderWithClient, renderWithClient2 } from "./utils";
import { rest } from "msw";

const server = setupServer(...handlers);

describe("testing app", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("fetch should work", async () => {
    renderWithClient(<App />);
    const item = screen.findByText("Bruno Queiroz");
    expect(await item).toBeInTheDocument();
  });

  it("fetch should fail", async () => {
    server.use(
      rest.get(
        "https://jsonplaceholder.typicode.com/users",
        (req, res, ctx) => {
          return res(ctx.status(500));
        }
      )
    );

    renderWithClient(<App />);
    const item = await waitFor(() => screen.getByText(/something happen/i));
    expect(item).toBeInTheDocument();
  });
});
