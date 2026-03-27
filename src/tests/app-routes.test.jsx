import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import App from "../App";
import { AuthProvider } from "../context/AuthContext";

const renderAtRoute = (route) => {
  window.history.pushState({}, "", route);
  return render(
    <AuthProvider>
      <App />
    </AuthProvider>
  );
};

describe("App routing", () => {
  test("renders login page route", async () => {
    renderAtRoute("/login");
    expect(await screen.findByRole("heading", { name: "Login" })).toBeInTheDocument();
  });

  test("renders not found page for unknown route", async () => {
    renderAtRoute("/no-such-page");
    expect(await screen.findByRole("heading", { name: "Page not found" })).toBeInTheDocument();
  });
});
