// Messages to be sent on a Broadcast channel when data changes in a table

import { DatabaseModel } from "./types"

export interface AddRowMessage<Model extends DatabaseModel> {
  type: "add_row"
  row: Model
}

export interface UpdateRowMessage<Model extends DatabaseModel> {
  type: "update_row"
  row: Model
}

export interface DeleteRowMessage {
  type: "delete_row"
  id: number
}

export type TableUpdateMessage<Model extends DatabaseModel> =
  AddRowMessage<Model>
  | UpdateRowMessage<Model>
  | DeleteRowMessage