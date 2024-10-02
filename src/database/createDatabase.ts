import connectToIndexedDb from "../core/database/connectToIndexedDb";
import Database from "../core/database/database";
import { UnwrapPromise } from "../core/helpers/unwrapTypes";
import MIGRATIONS from "./migrations";
import Item from "./models/item";

const createDatabase = async () =>  {
  const indexedDb = await connectToIndexedDb(
    "PwaTemplate", MIGRATIONS)

  return new Database({
    "items": {
      name: "items",
      mapper: Item.parse
    },
  }, indexedDb)
}

export type AppDatabase = UnwrapPromise<ReturnType<typeof createDatabase>>

export default createDatabase
