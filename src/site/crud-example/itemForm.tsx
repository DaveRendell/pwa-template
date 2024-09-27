import * as React from "react"
import Item from "../../database/models/item"
import Form from "../../core/forms/form"
import TextInput from "../../core/forms/textInput"
import NumberInput from "../../core/forms/numberInput"
import DatabaseContext from "../../database/context"
import { useModelForm } from "../../core/forms/useModelForm"

interface Props {
  item?: Item
  postAction?: (item: Item) => void
}

const ItemForm: React.FC<Props> = ({ item, postAction }) => {
  const form = useModelForm(
    "items",
    Item,
    DatabaseContext,
    postAction,
    item
  )

  return <Form form={form}>
    <TextInput form={form} field="name" label="Name" />
    <NumberInput form={form} field="counter" label="Counter" />
  </Form>
}

export default ItemForm
