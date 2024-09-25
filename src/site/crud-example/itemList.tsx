import * as React from "react"
import { useItems } from "../../database/hooks/useItems"
import { useRouter } from "../../routing"

const ItemList: React.FC<{}> = () => {
  const itemTable = useItems()
  const router = useRouter()

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

  const clickItem = (itemId: number) => {
    router.goTo("item", itemId)
  }

  return <div>
    <h3>Item List</h3>
      <ul>
      {items.map(item =>
        <li key={item.id}><a onClick={() => clickItem(item.id)}>{item.name}</a>: {item.counter}</li>
      )}
    </ul>
    <a onClick={() => router.goTo("item_new")}>Add new</a>
  </div>
}

export default ItemList
