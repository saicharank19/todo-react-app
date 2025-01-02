import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.js";
import { CookiesProvider } from "react-cookie";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </StrictMode>
);