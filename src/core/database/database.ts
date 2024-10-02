import { Table } from "./table"
import { DatabaseDefinition, DatabaseModels } from "./types"


export default class Database<Models extends DatabaseModels> {
  private readonly definition: DatabaseDefinition<Models>
  private readonly indexedDb: IDBDatabase

  constructor(
    definition: DatabaseDefinition<Models>,
    indexedDb: IDBDatabase,
  ) {
    this.definition = definition
    this.indexedDb = indexedDb
  }

  table<TableName extends keyof Models>(tableName: TableName): Table<Models[TableName]> {
    return new Table(this.definition[tableName], this.indexedDb)
  }
}
