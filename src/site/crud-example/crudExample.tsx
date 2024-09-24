import * as React from "react"
import ItemList from "./itemList"
import ItemPage from "./itemPage"
import NewItemForm from "./newItemForm"

/**
 * Example component showing how to easily set up Create, Update, Delete 
 * operations on a Database.
 */
const CrudExample: React.FC<{}> = () => {
  const [focusedId, setFocusedId] = React.useState<number | undefined>(undefined)
  return <main>
    <h2>CRUD Example</h2>
    <ItemList {...{ setFocusedId }}/>
    { focusedId && <ItemPage id={focusedId} unsetFocusedId={() => setFocusedId(undefined)} /> }
    <NewItemForm />
  </main>
}

export default CrudExample
