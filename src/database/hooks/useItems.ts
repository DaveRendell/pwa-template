import { useTableSearch } from "../../core/database/useTableSearch";
import DatabaseContext from "../context";

export function useItems() {
  return useTableSearch("items", DatabaseContext)
}
