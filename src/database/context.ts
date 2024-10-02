import * as React from "react"
import createDatabase, { AppDatabase } from "./createDatabase"

const DatabaseContext = React.createContext<AppDatabase | undefined>(undefined)

export default DatabaseContext
