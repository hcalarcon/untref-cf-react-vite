import { Link } from "react-router-dom";
import HeaderCss from "../styles/Header.module.css";
const Header = ({titulo}) => {
  return (
    <>
      <nav className={HeaderCss.nav}>
        <h1 className={HeaderCss.titulo}>{titulo}</h1>
        <Link to="/presupuestos">
          {" "}
          <span className={HeaderCss.span} title="ver historial">
            📋
          </span>
        </Link>
      </nav>
    </>
  );
};

export default Header;
