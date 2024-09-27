import React from "react"
import { DatabaseModels } from "../database/types"
import { FormState, useForm } from "./useForm"
import Database from "../database/database"
import useTable from "../database/useTable"
import { z } from "zod"

export function useModelForm<
  Models extends DatabaseModels,
  TableName extends keyof Models,
>(
  tableName: TableName,
  schema: z.ZodType<Models[TableName]>,
  databaseContext: React.Context<Database<Models> | undefined>,
  postSubmit: (model: Models[TableName]) => void = () => {},
  model?: Models[TableName],
): FormState<Omit<Models[TableName], "id">> {
  type Model = Models[TableName]
  const table = useTable(tableName, databaseContext)

  const baseAction: (result: Model) => Promise<Model> =
    model
      ? (result) => table.put({ ...result, id: model.id })
      : (result) => {
        const { id, ...contents } = result
        return table.add(contents)
      }
  
  const action = (result: Model) =>
    baseAction(result).then(postSubmit)
  
  const submitLabel = model
    ? "Update"
    : "Create"

  const initial = model || { id: 0 } as Model

  return useForm(schema, action, initial, submitLabel)
}
