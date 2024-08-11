import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { FavouriteImagesContextProvider } from "@contexts/favouriteImagesContextProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <FavouriteImagesContextProvider>
      <App />
    </FavouriteImagesContextProvider>
  </StrictMode>
);
