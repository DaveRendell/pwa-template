import * as React from "react"
import ItemForm from "./itemForm"
import useItem from "../../database/hooks/useItem"
import { useRouter } from "../../routing"

interface Props {
  id: number
}

const EditItemForm: React.FC<Props> = ({ id }) => {
  const itemRow = useItem(id)
  const router = useRouter()

  if (itemRow.data.isPending) {
    return <p>Loading...</p>
  }

  if (itemRow.data.error) {
    return <div>
      <a onClick={() => router.goTo("item_list")}>Back</a>
      <br/>
      Error displaying item: {itemRow.data.error.message}
    </div>
  }

  const item = itemRow.data.value

  return <div>
    <a onClick={() => router.goTo("item", item.id)}>Back</a>
    <br/>
    <ItemForm
      item={itemRow.data.value}
      postAction={(item) => router.goTo("item", item.id)}
    />
  </div>
}

export default EditItemForm
