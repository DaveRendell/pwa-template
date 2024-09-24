import useRow from "../../core/database/useRow";
import DatabaseContext from "../context";

export default function useItem(id: number) {
  return useRow(id, "items", DatabaseContext)
}
