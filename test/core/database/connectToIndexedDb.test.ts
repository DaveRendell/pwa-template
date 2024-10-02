import connectToIndexedDb from "../../../src/core/database/connectToIndexedDb"
import "fake-indexeddb/auto"

const mockIndexedDb = {
  version: 1
}

const mockOpenRequest: Mutable<IDBOpenDBRequest> = {
  onerror() {},
  onsuccess() {},
  onupgradeneeded() {},
  result: mockIndexedDb as IDBDatabase,
  error: null,
  onblocked: null,
  addEventListener() {},
  removeEventListener() {},
  readyState: "done",
  source: null as unknown as IDBCursor,
  transaction: null,
  dispatchEvent: function (): boolean { return false }
} 

const simulateError = (error: DOMException) => {
  mockOpenRequest.error = error
  mockOpenRequest.onerror && mockOpenRequest.onerror({} as unknown as Event)
}

const simulateUpgrade = (oldVersion: number) => {
  mockIndexedDb.version = oldVersion
  mockOpenRequest.onupgradeneeded && mockOpenRequest.onupgradeneeded({} as unknown as IDBVersionChangeEvent)
  mockOpenRequest.onsuccess && mockOpenRequest.onsuccess({} as unknown as Event)
}

describe("connectToIndexedDb", () => {
  const migration1 = jest.fn(() => {})
  const migration2 = jest.fn(() => {})

  beforeEach(() => {
    jest.resetAllMocks()
    const openSpy = jest.spyOn(window.indexedDB, "open")
    openSpy.mockImplementation(() => mockOpenRequest)
  })

  describe("when error thrown connecting to IndexedDB", () => {
    test("resolves to error", () => {
      const promise = connectToIndexedDb("App", [])
      simulateError(new DOMException("Test error"))

      expect(promise).rejects.toThrow()
    })
  })

  const runWithOldVersion = async (oldVersion: number): Promise<void> => {
    const promise = connectToIndexedDb("App", [migration1, migration2])
    simulateUpgrade(oldVersion)
    await promise
  }

  describe("when version upgrade required", () => {
    test("runs all migrations", async () => {
      await runWithOldVersion(0)

      expect(migration1).toHaveBeenCalledWith(mockIndexedDb)
      expect(migration2).toHaveBeenCalledWith(mockIndexedDb)
    })
  })

  describe("when partial version upgrade required", () => {
    test("runs only required migrations", async () => {
      await runWithOldVersion(1)

      expect(migration1).not.toHaveBeenCalled()
      expect(migration2).toHaveBeenCalledWith(mockIndexedDb)
    })
  })

  describe("when no version upgrade required", () => {
    test("runs no migrations", async () => {
      await runWithOldVersion(2)

      expect(migration1).not.toHaveBeenCalled()
      expect(migration2).not.toHaveBeenCalled()
    })
  })

  describe("when error thrown running migrations", () => {
    test("resolves to error", () => {
      migration2.mockImplementation(() => { throw new Error("Test error") })
      const promise = runWithOldVersion(0)

      expect(promise).rejects.toThrow()
    })
  })
})
