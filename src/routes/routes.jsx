import { createBrowserRouter } from "react-router-dom";
import { MainCategory, Product } from "../components";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <MainCategory />
    },
    {
      path: "/product/:id",
      element: <Product />
    },
  ]);