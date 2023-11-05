import React from "react";
import RowCss from "../styles/Row.module.css";

const Row = (propiedades) => {
  const { fecha, ltravesia, ttravesia, costo, personas } = propiedades;

  return (
    <article className={RowCss.article}>
      <h4 className={RowCss.h5}>Travesia Cotizada</h4>
      <h5 className={RowCss.h5}>Fecha: {fecha} </h5>
      <h5 className={RowCss.h5}>Lugar: </h5>
      <h5 className={RowCss.h5}>{ltravesia}</h5>
      <h5 className={RowCss.h5}>Actividad: </h5>
      <h5 className={RowCss.h5}>{ttravesia}</h5>
      <h5 className={RowCss.h5}>Costo: ${costo}</h5>
      <h5 className={RowCss.h5}>Personas:{personas}</h5>
    </article>
  );
};

export default Row;
