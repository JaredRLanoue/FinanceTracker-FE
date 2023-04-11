import * as React from "react";
import * as ReactDOM from "react-dom/client";
import Router from "./Router";
import { ChakraProvider } from "@chakra-ui/react";
import chakraTheme from "./styling/ChakraTheme";
import "../src/styling/Styling.css";

const container = document.getElementById("root");
if (!container) throw new Error("Failed to find the root element");
const root = ReactDOM.createRoot(container);

root.render(
  <ChakraProvider theme={chakraTheme}>
    <Router />
  </ChakraProvider>
);
