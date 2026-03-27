import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, test, vi } from "vitest";
import ProtectedRoute from "../components/ProtectedRoute";

const mockUseAuth = vi.fn();

vi.mock("../context/AuthContext", () => ({
  useAuth: () => mockUseAuth(),
}));

describe("ProtectedRoute", () => {
  test("redirects unauthenticated users to login", () => {
    mockUseAuth.mockReturnValue({ isAuthenticated: false });
    render(
      <MemoryRouter initialEntries={["/seller/inventory"]}>
        <Routes>
          <Route path="/login" element={<h1>Login</h1>} />
          <Route
            path="/seller/inventory"
            element={
              <ProtectedRoute>
                <h1>Seller Inventory</h1>
              </ProtectedRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByRole("heading", { name: "Login" })).toBeInTheDocument();
  });

  test("renders protected content for authenticated users", () => {
    mockUseAuth.mockReturnValue({ isAuthenticated: true });
    render(
      <MemoryRouter initialEntries={["/seller/inventory"]}>
        <Routes>
          <Route
            path="/seller/inventory"
            element={
              <ProtectedRoute>
                <h1>Seller Inventory</h1>
              </ProtectedRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByRole("heading", { name: "Seller Inventory" })).toBeInTheDocument();
  });
});
