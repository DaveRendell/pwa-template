import { Table } from "./table";
import { DatabaseDefinition, DatabaseMigration, DatabaseModels } from "./types";


export default class Database<Models extends DatabaseModels> {
  private readonly definition: DatabaseDefinition<Models>
  private readonly indexedDbPromise: Promise<IDBDatabase>

  constructor(
    name: string,
    definition: DatabaseDefinition<Models>,
    migrations: DatabaseMigration[],
  ) {
    this.definition = definition
    this.indexedDbPromise = this.openIndexedDb(name, migrations)
  }

  table<TableName extends keyof Models>(tableName: TableName): Table<Models[TableName]> {
    return new Table(this.definition[tableName], this.indexedDbPromise)
  }

  private openIndexedDb(
    name: string,
    migrations: DatabaseMigration[]
  ): Promise<IDBDatabase> {
    const version = migrations.length
    return new Promise((resolve, reject) => {
      const request = window.indexedDB.open(name, version)
      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve(request.result)
      request.onupgradeneeded = () => {
        const db = request.result
        migrations.slice(0)
          .forEach(migration => migration(db))
      }
    })
  }
}
