import { useContext } from "react";
import RowsContext from "../context/RowsContext";

const useRows = () => useContext(RowsContext);

export default useRows;
