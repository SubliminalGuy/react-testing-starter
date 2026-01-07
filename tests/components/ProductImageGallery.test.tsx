import { render, screen } from "@testing-library/react";
import ProductImageGallery from "../../src/components/ProductImageGallery";

describe("ProductImageGallery", () => {
  it("the DOM should be empty when an empty array is provided", () => {
    const { container } = render(<ProductImageGallery imageUrls={[]} />);

    expect(container).toBeEmptyDOMElement();
  });

  it("renders images when a list of imageUrls is provided", () => {
    const imageUrls: string[] = ["heart.png", "smiley.png"];
    render(<ProductImageGallery imageUrls={imageUrls} />);

    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(imageUrls.length);
    imageUrls.forEach((url, index) => {
      expect(images[index]).toHaveAttribute("src", url);
    });
  });
});
