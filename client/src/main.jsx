import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { Toaster } from "react-hot-toast";

export const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <MantineProvider>
    <QueryClientProvider client={queryClient}>
      <React.StrictMode>
        <App />
        <Toaster />
      </React.StrictMode>
    </QueryClientProvider>
  </MantineProvider>
);
