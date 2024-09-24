import * as React from "react"
import Item from "../../database/models/item"
import useItem from "../../database/hooks/useItem"
import EditableTextField from "./editableTextField"
import Counter from "./counter"

interface Props {
  id: number,
  unsetFocusedId: () => void
}

const ItemPage: React.FC<Props> = ({ id, unsetFocusedId }) => {
  const itemRow = useItem(id)

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
        unsetFocusedId()
      }}>Delete</button>
  </div>
}

export default ItemPage
