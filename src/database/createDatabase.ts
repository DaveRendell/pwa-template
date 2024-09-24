import Database from "../core/database/database";
import MIGRATIONS from "./migrations";
import Item from "./models/item";

const createDatabase = () => new Database("PwaTemplate", {
  "items": {
    name: "items",
    mapper: Item.parse
  },
}, MIGRATIONS)

export default createDatabase
