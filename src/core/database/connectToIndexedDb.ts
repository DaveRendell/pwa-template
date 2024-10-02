import { DatabaseMigration } from "./types"

export default async function connectToIndexedDb(
  name: string,
  migrations: DatabaseMigration[],
): Promise<IDBDatabase> {
  const version = migrations.length
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open(name, version)
    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve(request.result)
    request.onupgradeneeded = () => {
      const db = request.result
      migrations.slice(db.version)
        .forEach(migration => migration(db))
    }
  })
}
