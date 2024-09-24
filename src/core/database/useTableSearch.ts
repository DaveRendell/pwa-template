import * as React from "react"
import { DatabaseModel, DatabaseModels } from "./types";
import Async from "../helpers/async";
import useTable from "./useTable";
import Database from "./database";
import { StrictBroadcastChannel } from "../helpers/strictBroadcastChannel";
import { TableUpdateMessage } from "./messages";

interface TableData<Model extends DatabaseModel> {
  data: Async<Model[]>,
  add(newModel: Omit<Model, "id">): Promise<Model>,
  put(model: Model): Promise<Model>,
  delete(id: number): Promise<void>,
}

export function useTableSearch<
Models extends DatabaseModels,
TableName extends keyof Models
>(
  tableName: TableName,
  context: React.Context<Database<Models> | undefined>,
): TableData<Models[TableName]> {
  type Model = Models[TableName]
  const table = useTable(tableName, context)

  const [results, setResults] = React.useState<Model[] | undefined>(undefined)
  const [error, setError] = React.useState<Error | undefined>(undefined)

  const channel = React.useRef<StrictBroadcastChannel<TableUpdateMessage<Model>>>(new BroadcastChannel(table.channelName))

  const updateResults = () => {
    table.getAll().then(setResults).catch(setError)
  }

  React.useEffect(() => {
    updateResults()
  }, [table])

  channel.current.onmessage = () => {
    updateResults()
  }

  const data: Async<Model[]> =
    error ? { isPending: false, value: undefined, error }
    : results ? { isPending: false, value: results, error: undefined }
    : { isPending: true, value: undefined, error: undefined }

  return {
    data,
    async add(newModel: Omit<Model, "id">) { 
      const model = await table.add(newModel)
      updateResults()
      return model
    },
    async put(model: Model) {
      const updatedModel = await table.put(model)
      updateResults()
      return model
    },
    async delete(id: number) {
      await table.delete(id)
      updateResults()
      return
    },
  }
}