import * as React from "react"
import ItemForm from "./itemForm"
import { useRouter } from "../../routing"

const NewItemForm: React.FC<{}> = () => {
  const router = useRouter()
  return <div>
    <a onClick={() => router.goTo("item_list")}>Back</a>
    <br/>
    <ItemForm postAction={(item) => router.goTo("item", item.id)} />
  </div>
}

export default NewItemForm
