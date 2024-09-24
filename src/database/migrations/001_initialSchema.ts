import { DatabaseMigration } from "../../core/database/types";

const initialSchema: DatabaseMigration = (db: IDBDatabase) => {
  console.log("[Database] Running migration 001 - Set up initial schema")

  db.createObjectStore("items", { keyPath: "id", autoIncrement: true })
}

export default initialSchema
