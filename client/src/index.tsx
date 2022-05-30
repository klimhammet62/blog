import React from "react";
import ReactDOM from "react-dom/client";
import {Provider} from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {App} from './App'
import { setupStore } from "./redux/store";

const store = setupStore();

const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
});
const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

root.render(
    <BrowserRouter>
        <ThemeProvider theme={darkTheme}>
            <Provider store={store}>
                <App />
            </Provider>
        </ThemeProvider>
    </BrowserRouter>
);
