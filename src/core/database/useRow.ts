import * as React from "react"
import { DatabaseModel, DatabaseModels } from "./types";
import Async from "../helpers/async";
import useTable from "./useTable";
import Database from "./database";
import { TableUpdateMessage } from "./messages";
import { StrictBroadcastChannel } from "../helpers/strictBroadcastChannel";

interface RowData<Model extends DatabaseModel> {
  data: Async<Model>
  update(changes: Omit<Partial<Model>, "id">): Promise<Model>
  delete(): Promise<void>
}

export default function useRow<
  Models extends DatabaseModels,
  TableName extends keyof Models,
>(
  id: number,
  tableName: TableName,
  context: React.Context<Database<Models> | undefined>,
): RowData<Models[TableName]> {
  type Model = Models[TableName]
  const table = useTable(tableName, context)

  const [row, setRow] = React.useState<Model | undefined>(undefined)
  const [error, setError] = React.useState<Error | undefined>(undefined)

  const channel = React.useRef<StrictBroadcastChannel<TableUpdateMessage<Model>>>(new BroadcastChannel(table.channelName))

  const updateRow = () => {
    table.get(id).then(setRow).catch(setError)
  }

  React.useEffect(() => {
    updateRow()
  }, [table, id])

  channel.current.onmessage = (event) => {
    const message = event.data
    if (message.type === "update_row" && message.row.id === id) {
      setRow(message.row)
    }
  }

  const data: Async<Model> =
    error ? { isPending: false, value: undefined, error }
    : row ? { isPending: false, value: row, error: undefined }
    : { isPending: true, value: undefined, error: undefined }
  
  return {
    data,
    update(changes) {
      if (row === undefined) { throw new Error("Cannot update database row before it loads") }

      const newModel = { ...row, ...changes }
      return table.put(newModel)
    },
    delete() {
      return table.delete(id)
    },
  }
}