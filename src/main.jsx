import React from "react";
import { createRoot } from 'react-dom/client'
import { StrictMode } from "react";
import Footer from "./components/Footer";

import App from "./components/App";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  <Footer></Footer>
  </StrictMode>
)
