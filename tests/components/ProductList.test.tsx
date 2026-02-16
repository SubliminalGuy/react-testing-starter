import { render, screen } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import ProductList from "../../src/components/ProductList";
import { server } from "../mocks/server";

describe("ProductList", () => {
  it("renders a list of products", async () => {
    render(<ProductList />);

    const listOfItems = await screen.findAllByRole("listitem");
    expect(listOfItems).toHaveLength(3);
  });

  it("should render message if no product is found", async () => {
    server.use(
      http.get("/products", () => {
        return HttpResponse.json([]);
      }),
    );
    render(<ProductList />);

    const message = await screen.findByText(/no products/i);
    expect(message).toBeInTheDocument();
  });
});
