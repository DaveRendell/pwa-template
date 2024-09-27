import * as React from "react"
import { z } from "zod";
import KeyOfType from "../helpers/keyOfType";

export interface FormState<Model> {
  update: <T>(field: KeyOfType<Model, T>, value: T) => void,
  model: Partial<Model>,
  errors: z.ZodError<Model> | undefined
  isValid: boolean
  submitLabel: string
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

export function useForm<Model>(
  schema: z.ZodType<Model>,
  action: (result: Model) => void,
  initial: Partial<Model> = {},
  submitLabel: string = "Submit",
): FormState<Model> {
  const [model, setModel] = React.useState<Partial<Model>>(initial)
  const [errors, setErrors] = React.useState(schema.safeParse(initial).error)
  const [isValid, setIsValid] = React.useState(schema.safeParse(initial).success)

  const update = <T>(field: KeyOfType<Model, T>, value: T) => {
    const newModel = { ...model, [field]: value }
    setModel(newModel)
    const parseResult = schema.safeParse(newModel)
    setErrors(parseResult.error)
    setIsValid(parseResult.success)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const output = schema.parse(model)
    action(output)
  }

  return {
    update,
    model,
    errors,
    isValid,
    submitLabel,
    handleSubmit,
  }
}
