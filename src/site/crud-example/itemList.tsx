import * as React from "react"
import Item from "../../database/models/item"
import { useItems } from "../../database/hooks/useItems"

interface Props {
  setFocusedId: (id: number) => void
}

const ItemList: React.FC<Props> = ({ setFocusedId }) => {
  const itemTable = useItems()

  if (itemTable.data.isPending) {
    return <div>
      <h3>Item List</h3>
      Loading...
    </div>
  }

  if (itemTable.data.error) {
    return <div>
      <h3>Item List</h3>
      Error loading items: {itemTable.data.error.message}
    </div>
  }

  const items = itemTable.data.value

  return <div>
    <h3>Item List</h3>
      <ul>
      {items.map(item =>
        <li key={item.id}><a onClick={() => setFocusedId(item.id)}>{item.name}</a>: {item.counter}</li>
      )}
    </ul>
  </div>
}

export default ItemList
