import { it, expect, describe } from "vitest";

describe("group", () => {
  it("should pass", async () => {
    const response = await fetch("categories");
    const result = await response.json();
    expect(result).toHaveLength(3);
  });
});
