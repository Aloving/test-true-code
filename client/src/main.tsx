import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { Provider } from "react-redux";

import {
  Catalog,
  Edit,
  IndexPage,
  EditModalProvider,
  Product,
} from "./components";

import { store } from "./store/store";

import "./index.css";
import "./reset.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <EditModalProvider>
          <Routes>
            <Route path="/" element={<IndexPage />}>
              <Route index path="/catalog" element={<Catalog />} />
              <Route path="/edit" element={<Edit />} />
              <Route path="/product/:id" element={<Product />} />
            </Route>
          </Routes>
        </EditModalProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
