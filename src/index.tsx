import { createRoot } from "react-dom/client"
import * as React from "react"
import "./index.css"
import createDatabase, { AppDatabase } from "./database/createDatabase"
import DatabaseContext from "./database/context"
import { APP_ROUTES, RouterContext } from "./routing"
import { useRouteTable } from "./core/routing/useRouteTable"

var mountNode = document.getElementById("app")
const root = createRoot(mountNode!)

const App: React.FC<{}> = () => {
  const [database, setDatabase] = React.useState<AppDatabase | null>(null)
  const { router, Render } = useRouteTable(APP_ROUTES, { path: "item_list", params: [] })

  React.useEffect(() => {
    createDatabase()
      .then(setDatabase)
  }, [])

  if (!database) { return <></> }

  return (
    <DatabaseContext.Provider value={database}>
      <RouterContext.Provider value={router}>
        <h1>PWA Template</h1>
        <Render />
      </RouterContext.Provider>
    </DatabaseContext.Provider>
  )
}

root.render(<App />)