export interface DatabaseModel {
  id: number
}

export interface DatabaseModels {
  [tableName: string]: DatabaseModel
}

export interface TableDefinition<Model extends DatabaseModel> {
  name: string,
  mapper: (object: any) => Model
}

export type DatabaseDefinition<Models extends DatabaseModels> = {
  [tableName in keyof Models]: TableDefinition<Models[tableName]>
}

export type DatabaseMigration = (database: IDBDatabase) => void