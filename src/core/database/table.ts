import { StrictBroadcastChannel } from "../helpers/strictBroadcastChannel";
import { promisify } from "./helper";
import { TableUpdateMessage } from "./messages";
import { DatabaseModel, TableDefinition } from "./types";

export class Table<Model extends DatabaseModel> {
  private readonly definition: TableDefinition<Model>
  private readonly indexedDb: IDBDatabase

  readonly channelName: string
  private readonly broadcastChannel: StrictBroadcastChannel<TableUpdateMessage<Model>>

  constructor(
    definition: TableDefinition<Model>,
    indexedDb: IDBDatabase,
  ) {
    this.definition = definition
    this.indexedDb = indexedDb
    this.channelName = this.definition.name + "_update"
    this.broadcastChannel = new BroadcastChannel(this.channelName)
  }

  async get(id: number): Promise<Model> {
    const objectStore = await this.objectStore("readonly")
    return promisify(objectStore.get(id))
  }

  async getAll(): Promise<Model[]> {
    const objectStore = await this.objectStore("readonly")
    return promisify(objectStore.getAll())
  }

  async add(model: Omit<Model, "id">): Promise<Model> {
    const objectStore = await this.objectStore("readwrite")
    const id = await promisify(objectStore.add(model))
    const addedModel = await promisify(objectStore.get(id))
    this.broadcastChannel.postMessage({
      type: "add_row", row: addedModel
    })
    return addedModel
  }

  async delete(id: number): Promise<void> {
    const objectStore = await this.objectStore("readwrite")
    await promisify(objectStore.delete(id))
    this.broadcastChannel.postMessage({
      type: "delete_row", id
    })
  }

  async put(model: Model): Promise<Model> {
    const objectStore = await this.objectStore("readwrite")
    const id = await promisify(objectStore.put(model))
    const updatedRow = await promisify(objectStore.get(id))
    this.broadcastChannel.postMessage({
      type: "update_row", row: updatedRow
    })
    return updatedRow
  }

  async objectStore(mode: IDBTransactionMode): Promise<IDBObjectStore> {
    return this.indexedDb.transaction(this.definition.name, mode).objectStore(this.definition.name)
  }
}
