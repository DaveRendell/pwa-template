// Test Model used for running DB tests

import { DatabaseDefinition, DatabaseModels } from "../../../src/core/database/types";

export interface Game { id: number, name: string, score: number }
export interface Image { id: number, url: string }

export interface TestModels extends DatabaseModels {
  "games": Game,
  "images": Image,
}

export const TEST_DEFINITION: DatabaseDefinition<TestModels> = {
  "games": {
    name: "games",
    mapper: (obj) => obj as Game,
  },
  "images": {
    name: "images",
    mapper: (obj) => obj as Image,
  }
}
