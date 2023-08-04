import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import Home from './pages/Home'
import Category from './pages/Category'
import Cart from './pages/Cart'
import App from "./App";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <Home /> },
        { path: 'category/:categoryName', element: <Category /> },
        { path: 'cart', element: <Cart /> }
      ]
    },
  ])
}

export default Router;