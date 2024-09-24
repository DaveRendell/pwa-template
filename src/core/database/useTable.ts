import * as React from "react"
import { DatabaseModels } from "./types";
import { Table } from "./table";
import Database from "./database";

export default function useTable<
  Models extends DatabaseModels,
  TableName extends keyof Models
>(
  tableName: TableName,
  context: React.Context<Database<Models> | undefined>,
): Table<Models[TableName]> {
  const database = React.useContext(context)
  const table = React.useRef<Table<Models[TableName]> | undefined>(undefined)

  if (database === undefined) {
    throw new Error("Error: useTable called outside of DatabaseContext Provider")
  }

  if (!table.current) { table.current = database.table(tableName) }

  return table.current
}