import { DatabaseMigration } from "../../core/database/types";
import initialSchema from "./001_initialSchema";

const MIGRATIONS: DatabaseMigration[] = [
  initialSchema,
]

export default MIGRATIONS
