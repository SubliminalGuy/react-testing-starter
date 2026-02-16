import { render, screen } from "@testing-library/react";
import ProductDetail from "../../src/components/ProductDetail";
import { products } from "../mocks/data";
import { http, HttpResponse } from "msw";
import { server } from "../mocks/server";

describe("ProductDetail", () => {
  it("render an invalid id message if productId is zero ", async () => {
    render(<ProductDetail productId={0} />);

    const message = await screen.findByText(/invalid productid/i);
    expect(message).toBeInTheDocument();
  });

  it("render a product detail for product id 1 ", async () => {
    render(<ProductDetail productId={1} />);

    const heading = await screen.findByText(/product detail/i);
    expect(heading).toBeInTheDocument();
    const product = await screen.findByText(new RegExp(products[0].name));
    expect(product).toBeInTheDocument();
    const price = await screen.findByText(new RegExp(products[0].price));
    expect(price).toBeInTheDocument();
  });

  it("render an not found message if product id is not found ", async () => {
    server.use(http.get("/products/1", () => HttpResponse.json(null)));
    render(<ProductDetail productId={1} />);

    const message = await screen.findByText(/not found/i);
    expect(message).toBeInTheDocument();
  });
});
