import { QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { BrowserRouter } from "react-router-dom";

import { ThemeProvider } from "./components/theme-provider";
import { SidebarProvider } from "./components/ui/sidebar";
import { Toaster } from "./components/ui/toaster";
import { TAN_STACK_QUERY_CLIENT } from "./lib/tan-stack-query-client";
import { Router } from "./routes";

export function App(): React.ReactElement {
  return (
    <ThemeProvider defaultTheme="system" storageKey="@escolarize-theme">
      <SidebarProvider>
        <QueryClientProvider client={TAN_STACK_QUERY_CLIENT}>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
          <Toaster />
        </QueryClientProvider>
      </SidebarProvider>
    </ThemeProvider>
  );
}
