import { ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "./components/Login";
import Photos from "./components/Photos";
import Profile from "./components/Profile";
import Albums from "./components/Albums";
import Favourites from "./components/Favourites";
import AlbumDetails from "./components/AlbumDetails";
import PhotoDetails from "./components/PhotoDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/photos",
    element: <Photos />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/albums",
    element: <Albums />,
  },
  {
    path: "/favourites",
    element: <Favourites />,
  },
  {
    path: "/albums/:albumId",
    element: <AlbumDetails />,
  },
  {
    path: "/photo/:photoId",
    element: <PhotoDetails />,
  },
  {
    path: "/favourites/:photoId",
    element: <PhotoDetails />,
  },
  {
    path: "/albums/:albumId/photo/:photoId",
    element: <PhotoDetails />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-center"
        autoClose={1000}
        newestOnTop
        closeOnClick
      />
    </>
  );
}

export default App;
