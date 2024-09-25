import * as React from "react"
import Item from "../../database/models/item"
import useTable from "../../core/database/useTable"
import DatabaseContext from "../../database/context"
import { useRouter } from "../../routing"

const NewItemForm: React.FC<{}> = () => {
  const [name, setName] = React.useState("")
  const [counter, setCounter] = React.useState(0)
  const table = useTable("items", DatabaseContext)
  const router = useRouter()

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const newItem: Omit<Item, "id"> = { name, counter }

    table.add(newItem)
    router.goTo("item_list")

    setName("")
    setCounter(0)
  }

  return <div>
    <h3>New Item Form</h3>
    <form onSubmit={submit}>
      <fieldset>
        <label htmlFor="set-name">Name</label>
        <input
          type="text"
          name="name"
          id="set-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </fieldset>
      <fieldset>
        <label htmlFor="set-counter">Counter</label>
        <input
          type="number"
          name="counter"
          id="set-counter"
          value={counter}
          onChange={(e) => setCounter(parseInt(e.target.value))}
        />
      </fieldset>
      <input
        type="submit"
        id="submit-item"
        value="Add"
      />
      <button onClick={() => router.goTo("item_list")}>Cancel</button>
    </form>
  </div>
}

export default NewItemForm
