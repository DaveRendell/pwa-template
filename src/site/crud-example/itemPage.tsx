import * as React from "react"
import Item from "../../database/models/item"
import useItem from "../../database/hooks/useItem"
import EditableTextField from "./editableTextField"
import Counter from "./counter"
import { useRouter } from "../../routing"

interface Props {
  id: number,
}

const ItemPage: React.FC<Props> = ({ id }) => {
  const itemRow = useItem(id)
  const router = useRouter()

  if (itemRow.data.isPending) {
    return <div>
      <h3>Item Page</h3>
      Loading...
    </div>
  }

  if (itemRow.data.error) {
    return <div>
      <h3>Item Page</h3>
      Error displaying item: {itemRow.data.error.message}
    </div>
  }

  const item = itemRow.data.value

  return <div>
    <h3>Item Page</h3>
    <a onClick={() => router.goTo("item_list")}>Back</a>
    <EditableTextField
      model={item}
      fieldName="name"
      label="Name"
      update={(newValue) => itemRow.update({ "name": newValue })}
    />
    <Counter
      model={item}
      fieldName="counter"
      label="Counter"
      update={(newValue) => itemRow.update({ "counter": newValue })}
    />
    <button
      onClick={() => {
        itemRow.delete()
        router.goTo("item_list")
      }}>Delete</button>
  </div>
}

export default ItemPage
