import Database from "../../../src/core/database/database"
import { Table } from "../../../src/core/database/table"
import { TEST_DEFINITION } from "./testModels"

jest.mock("../../../src/core/database/table", () => {
  return {
    "Table": jest.fn()
  }
})

describe("Database", () => {
  const mockDb = {} as unknown as IDBDatabase
  const database = new Database(TEST_DEFINITION, mockDb)


  describe("table", () => {
    test("creates a Table with the correct definition", () => {
      database.table("games")

      expect(Table).toHaveBeenCalledWith(TEST_DEFINITION["games"], mockDb)
    })
  })
})
