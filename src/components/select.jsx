import React from "react";
import useForm from "../hooks/useForm";

const Select = ({ id, label, options, style, lid }) => {
  const { elementos, setElementos } = useForm();
  return (
    <>
      <label className={style.label} htmlFor={id}>
        {label}:
      </label>
      <select
        className={style.select}
        name={id}
        id={id}
        defaultValue={0}
        onChange={(e) =>
          setElementos({
            ...elementos,
            [id]: e.target.value,
            [lid]: e.target.options[e.target.selectedIndex].text,
          })
        }
      >
        <option disabled value={0}>
          ...
        </option>
        {options.map((option) => (
          <option key={option.label} value={option.factor}>
            {option.tipo}
          </option>
        ))}
      </select>
    </>
  );
};

export default Select;
