import { Link } from "react-router-dom";
import RowsCss from "../styles/Rows.module.css";
import Header from "./header";
import useRows from "../hooks/useRows";
import Row from "./row";

const Rows = () => {
  const { presupuestos } = useRows();

  return (
    <>
      <Header titulo="Historial de cotizaciones" />
      <section className={RowsCss.container}>
        {presupuestos.map((elementos, indice) => (
          <Row key={indice} {...elementos} />
        ))}
      </section>
      <Link className={RowsCss.button} to="/">
        Volver
      </Link>
    </>
  );
};

export default Rows;
