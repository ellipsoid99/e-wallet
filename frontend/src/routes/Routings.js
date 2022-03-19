import React from "react";
import { Routes, Route } from "react-router-dom";
import { routes } from "./routes";

function Routings() {
  return (
    <Routes>
      {routes.map((route, idx) => {
        return <Route key={idx} path={route.path} element={route.component} />;
      })}
    </Routes>
  );
}
export default Routings;
