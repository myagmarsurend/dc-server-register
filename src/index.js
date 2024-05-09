import React from "react";
import ReactDOM from "react-dom/client";
import { PrimeReactProvider } from "primereact/api";
import packageJson from "../package.json";

import "./styles/index.css";
import { App } from "./containers";
import reportWebVitals from "./reportWebVitals";
import { GlobalProvider } from "./context";
import { Toaster } from "react-hot-toast";
import { ProgressSpinner } from "primereact/progressspinner";
import CacheBuster from "react-cache-buster";
import { BrowserRouter } from "react-router-dom";

import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";

const isProduction = process.env.NODE_ENV === "production";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <CacheBuster
    currentVersion={packageJson.version}
    isEnabled={isProduction} //If false, the library is disabled.
    isVerboseMode={false} //If true, the library writes verbose logs to console.
    loadingComponent={<ProgressSpinner />}
  >
    <BrowserRouter>
      <PrimeReactProvider>
        <GlobalProvider>
          <App />
          <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
        </GlobalProvider>
      </PrimeReactProvider>
    </BrowserRouter>
  </CacheBuster>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
