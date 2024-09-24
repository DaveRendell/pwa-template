import { createRoot } from "react-dom/client"
import * as React from "react"
import "./index.css"
import CrudExample from "./site/crud-example/crudExample"
import createDatabase from "./database/createDatabase"
import DatabaseContext from "./database/context"

var mountNode = document.getElementById("app")
const root = createRoot(mountNode!)

const App: React.FC<{}> = () => {
  const database = React.useRef(createDatabase())

  return <DatabaseContext.Provider value={database.current}>
    <h1>PWA Template</h1>
    <CrudExample />
  </DatabaseContext.Provider>
}

root.render(<App />)