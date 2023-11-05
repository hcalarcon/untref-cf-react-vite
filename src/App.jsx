import React, { useState } from "react";
import Formulario from "./components/form";
import Rows from "./components/rows";
import RowsContext from "./context/RowsContext";
import FormContext from "./context/FormContext";
import useLocalStorage from "./hooks/useLocalStorage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  const [elementos, setElementos] = useState({
    personas: 1,
    travesia: 0,
    lugar: 0,
  });
  const [presupuestos, setPresupuestos] = useLocalStorage("presupuestos", []);
  return (
    <>
      <RowsContext.Provider value={{ presupuestos, setPresupuestos }}>
        <FormContext.Provider value={{ elementos, setElementos }}>
          <BrowserRouter>
            <Routes>
              <Route path="/" index element={<Formulario />}></Route>
              <Route path="/presupuestos" element={<Rows />}></Route>
            </Routes>
          </BrowserRouter>
        </FormContext.Provider>
      </RowsContext.Provider>
    </>
  );
};

export default App;
