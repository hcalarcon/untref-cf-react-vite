import React, { useState, useEffect } from "react";
import Select from "./select";
import Header from "./header";
import FormCss from "../styles/Form.module.css";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useForm from "../hooks/useForm";
import useRows from "../hooks/useRows";

const Formulario = () => {
  const [travesias, setTravesias] = useState([]);
  const [lugares, setLugares] = useState([]);
  const [costo, setCosto] = useState(0.0);
  const [guardar, setGuardar] = useState(false);
  const [loader, setLoader] = useState(false);

  const { elementos, setElementos } = useForm();
  const { presupuestos, setPresupuestos } = useRows();

  useEffect(() => {
    fetch("/datos/datos.json")
      .then((response) => response.json())
      .then((data) => {
        const travesia = data.filter(
          (opcion) => opcion.categoria === "travesia"
        );
        const lugar = data.filter((opcion) => opcion.categoria === "lugar");
        setTravesias(travesia);
        setLugares(lugar);
      });
  }, []);

  const realizarCotizacion = () => {
    const { lugar, travesia, personas } = elementos;

    if (lugar != 0 && travesia != 0 && personas > 0) {
      setLoader(true);
      setTimeout(() => {
        const costo = personas * travesia * lugar * 850;
        setCosto(costo.toFixed(2));
        setGuardar(true);
        alerta("", "Cotización realizada con éxito.", "success");
        setLoader(false);
      }, 2500);
    } else
      alerta("", "Debes completar todos los datos en pantalla..", "warning");
  };

  const GuardarCoti = () => {
    setPresupuestos([
      ...presupuestos,
      {
        fecha: new Date().toLocaleDateString(),
        ...elementos,
        costo: costo,
      },
    ]);
    setCosto(0);
    setGuardar(false);

    toast.success("Operación exitosa", {
      position: "top-left",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  return (
    <>
      <Header titulo="Cotizar tu travesia" />
      <ToastContainer />
      <form className={FormCss.formulario} onSubmit={(e) => e.preventDefault()}>
        <h2 className={FormCss.titulo}>Completa los datos solicitados</h2>
        <Select
          style={FormCss}
          label={"Tipo de travesia"}
          id={"travesia"}
          lid={"ttravesia"}
          options={travesias}
        />

        <Select
          style={FormCss}
          label={"Lugar de la travesia"}
          id={"lugar"}
          lid={"ltravesia"}
          options={lugares}
        />

        <label className={FormCss.label} htmlFor="cantPersonas">
          Cantidad de persoas:
        </label>
        <input
          className={FormCss.input}
          type="number"
          id="cantPersonas"
          defaultValue={1}
          min={1}
          onInput={(e) =>
            setElementos({ ...elementos, personas: e.target.value })
          }
        />

        <button
          className={FormCss.button}
          type="button"
          onClick={realizarCotizacion}
        >
          {loader ? <img src="/loader.gif" width="40px"></img> : "Cotizar"}
        </button>
      </form>

      {guardar ? (
        <h3 className={FormCss.costo}>
          Precio estimado: $ {costo}
          <span
            className={FormCss.span}
            title="Guardar en historial"
            onClick={() => GuardarCoti()}
          >
            💾
          </span>
        </h3>
      ) : null}
    </>
  );
};

const alerta = (titulo, mensaje, icono) => {
  Swal.fire({
    icon: icono || "",
    title: titulo || "",
    text: mensaje,
    showConfirmButton: false,
    timer: 3500,
    width: "240px",
  });
};

export default Formulario;
