import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";

import { IndexPage } from "./IndexPage";
import { Catalog } from "./Catalog";
import { Edit } from "./Edit";

import "./index.css";
import "./reset.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IndexPage />}>
          <Route index path="/catalog" element={<Catalog />} />
          <Route path="/edit" element={<Edit />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
