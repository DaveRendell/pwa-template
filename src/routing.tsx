import * as React from "react"
import { RouteTable } from "./core/routing/types"
import { Router } from "./core/routing/router"
import ItemList from "./site/crud-example/itemList"
import ItemPage from "./site/crud-example/itemPage"
import NewItemForm from "./site/crud-example/newItemForm"

// Simple implementation of routing to different pages in the app - if 
// more complex logic is needed sub in React Router or similar.
export const APP_ROUTES = {
  "item_list": () => <ItemList />,
  "item": (itemId: number) => <ItemPage id={itemId}/>,
  "item_new": () => <NewItemForm />
} as const satisfies RouteTable

export const RouterContext = React.createContext<Router<typeof APP_ROUTES> | undefined>(undefined)

export function useRouter() {
  const router = React.useContext(RouterContext)

  if (router === undefined) {
    throw new Error("useRouter used outside RouterContext provider")
  }

  return router
}

