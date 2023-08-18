import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import Home from './pages/Home'
import Category from './pages/Category'
import Cart from './pages/Cart'
import Details from './pages/Details'
import App from "./App";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      children: [
        {
          index: true,
          element: <Home />
        },
        {
          path: 'cart',
          element: <Cart />
        },
        {
          path: ':type',
          element: <Category />,
        },
        {
          path: ':type/:name',
          element: <Details />
        }
      ],
      errorElement: <ErrorPage />,
    },
  ])
  
  return <RouterProvider router={router} />;
}

export default Router;