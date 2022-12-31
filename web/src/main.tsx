import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "@/styles/index.css";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "@/lib/queryClient";
import AuthProvider from "@/context/auth";
import { BrowserRouter } from "react-router-dom";
import "@fontsource/lato";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
