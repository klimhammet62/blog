import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { App } from "./App";
const queryClient = new QueryClient();

const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
});
const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

root.render(
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <ThemeProvider theme={darkTheme}>
                    <App />
                </ThemeProvider>
                <ReactQueryDevtools initialIsOpen={false} />
            </BrowserRouter>
        </QueryClientProvider>
);
