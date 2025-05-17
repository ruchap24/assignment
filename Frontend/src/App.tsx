import React from "react";
import Home from "./components/pages/Home/Home";
import { createBrowserRouter, RouterProvider,Navigate } from "react-router-dom";
import Register from "./components/Auth/Register/Register";
import Login from "./components/Auth/Login/Login";
import Notes from "./components/pages/Notes";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/notes",
    element: <Notes/>
  }
]);
function App() {
  return (
    <div className="h-screen bg-white">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
