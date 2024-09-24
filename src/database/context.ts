import * as React from "react"
import createDatabase from "./createDatabase"

type DatabaseType = ReturnType<typeof createDatabase>

const DatabaseContext = React.createContext<DatabaseType | undefined>(undefined)

export default DatabaseContext
