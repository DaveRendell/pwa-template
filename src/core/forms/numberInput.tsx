import * as React from "react"
import { FormState } from "./useForm";
import KeyOfType from "../helpers/keyOfType";

interface Props<Model> {
  form: FormState<Model>,
  field: KeyOfType<Model, number> & string,
  label: string,
}

export default function NumberInput<Model>({label, field, form}: Props<Model>): React.ReactNode {
  const id = React.useId()
  const [showErrors, setShowErrors] = React.useState(false)

  const error = form.errors?.issues
    .find(issue => issue.path.includes(field))

  return <label htmlFor={id}>
    {label}: <input
      type="number"
      name={field}
      id={id}
      value={form.model[field] === undefined ? "": String(form.model[field])}
      onChange={(e) => form.update(field, Number(e.target.value))}
      onBlur={() => setShowErrors(true)}
    />
    <p>{(showErrors && error) ? error.message : ""}</p>
  </label>
}
