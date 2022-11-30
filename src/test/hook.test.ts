import { renderHook, waitFor } from "@testing-library/react";
import { describe } from "vitest";
import { useFetch } from "../hooks/useFetch";
import "whatwg-fetch";
import { setupServer } from "msw/node";
import { handlers } from "../mocking/handlers";
import { createWrapper } from "./utils";
import { rest } from "msw";

const server = setupServer(...handlers);

describe("testing hooks", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("hook should render", async () => {
    const { result } = renderHook(() => useFetch(), {
      wrapper: createWrapper(),
    });
    await waitFor(() => expect(result?.current?.isSuccess).toBe(true));

    expect(result?.current?.data?.[0].name).toBe("Bruno Queiroz");
  });

  it("hook should get error", async () => {
    server.use(
      rest.get(
        "https://jsonplaceholder.typicode.com/users",
        (req, res, ctx) => {
          return res(ctx.status(404));
        }
      )
    );
    const { result } = renderHook(() => useFetch(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result?.current?.isLoading).toBe(false));

    expect(result.current.isError).toBe(true);
  });
});
