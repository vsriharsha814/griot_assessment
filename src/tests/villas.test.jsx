import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, test, vi } from "vitest";
import Villas from "../components/Villa/Villas";

vi.mock("../api/products", () => ({
  getAllProducts: vi.fn(),
}));

import { getAllProducts } from "../api/products";

describe("Villas page", () => {
  test("shows loading state while data is fetching", () => {
    getAllProducts.mockReturnValue(new Promise(() => {}));
    render(
      <MemoryRouter>
        <Villas />
      </MemoryRouter>
    );
    expect(screen.getByText("Loading properties...")).toBeInTheDocument();
  });

  test("renders fetched listings", async () => {
    getAllProducts.mockResolvedValue([
      { _id: "abc123", name: "Test Villa", startingBid: 1200, imageUrl: "" },
    ]);
    render(
      <MemoryRouter>
        <Villas />
      </MemoryRouter>
    );
    expect(await screen.findByText("Test Villa")).toBeInTheDocument();
    expect(screen.getByText("1 Properties")).toBeInTheDocument();
  });
});
