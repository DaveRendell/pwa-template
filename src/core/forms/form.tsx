import * as React from "react"
import { FormState } from "./useForm"

type OneOrMany<T> = T | T[]

interface Props<Model> {
  form: FormState<Model>
  children?: OneOrMany<React.ReactElement>
}

function Form<Model>({ children, form }: Props<Model>) {
  return <form onSubmit={form.handleSubmit}>
    {...[children].flat()}
    <input
      type="submit"
      value={form.submitLabel}
      disabled={!form.isValid}
    />
  </form>
}

export default Form
