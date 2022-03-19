import React from "react";
import { BrowserRouter } from "react-router-dom";
import Routings from "./routes/Routings";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <BrowserRouter>
      <Routings />
    </BrowserRouter>
  );
}

export default App;
