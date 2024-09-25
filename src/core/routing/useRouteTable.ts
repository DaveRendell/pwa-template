import React from "react"
import { Router } from "./router"
import { RouteTable, State } from "./types"

export function useRouteTable<Routes extends RouteTable>(definition: Routes, defaultState: State<Routes>) {
  const [state, dispatch] = React.useState<State<Routes>>(defaultState)
  const router = React.useRef(new Router<Routes>(dispatch))
  return {router: router.current, Render: () => definition[state.path](...state.params)}
}
