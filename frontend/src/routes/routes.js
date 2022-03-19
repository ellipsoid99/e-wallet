import React from "react";
//  Page Routes
import Home from "../pages/home";
import Login from "../pages/auth/login";
import Signup from "../pages/auth/signup";

export const routes = [
  {
    id: 1,
    path: "/",
    component: <Home />,
  },
  {
    id: 2,
    path: "/login",
    component: <Login />,
  },
  {
    id: 3,
    path: "/signup",
    component: <Signup />,
  },
];
