import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRouteLayout from "./pages/ProtectedRouteLayout";
import AuthLayout from "./pages/AuthLayout";
import Root from "./pages/Root";
import { useCheckAuth } from "./hooks/checkAuth";

const App = () => {
  const authData = useCheckAuth();

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route to="/" element={<Root />}>
        <Route path="/" element={<ProtectedRouteLayout authData={authData} />}>
          <Route index element={<Dashboard user={authData?.user} />} />
        </Route>
        <Route to="/" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default App;
