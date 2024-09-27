import * as React from "react"
import { FormState } from "./useForm"
import KeyOfType from "../helpers/keyOfType"


interface Props<Model> {
  form: FormState<Model>,
  field: KeyOfType<Model, string> & string,
  label: string,
}

export default function TextInput<Model>({label, field, form}: Props<Model>): React.ReactNode {
  const id = React.useId()
  const [showErrors, setShowErrors] = React.useState(false)

  const error = form.errors?.issues
    .find(issue => issue.path.includes(field))

  return <label htmlFor={id}>
    {label}: <input
      type="text"
      name={field}
      id={id}
      value={String(form.model[field] || "")}
      onChange={(e) => form.update(field, e.target.value)}
      onBlur={() => setShowErrors(true)}
    />
    <p>{(showErrors && error) ? error.message : ""}</p>
  </label>
}