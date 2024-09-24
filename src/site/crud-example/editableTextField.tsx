import * as React from "react"

type HasStringField<FieldName extends string> = {
  [key in FieldName]: string
}

interface Props<FieldName extends string> {
  model: HasStringField<FieldName>,
  fieldName: FieldName,
  label: string,
  update: (newValue: string) => Promise<HasStringField<FieldName>>
}

export default function EditableTextField<
  FieldName extends string
>({ model, fieldName, update, label }: Props<FieldName>): React.ReactNode {
  const [value, setValue] = React.useState<string>(model[fieldName])
  const [stagedValue, setStagedValue] = React.useState<string>(model[fieldName])
  const [isEditing, setIsEditing] = React.useState(false)
  
  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setValue(stagedValue)
    update(stagedValue)
    setIsEditing(false)
  }

  const cancel = () => {
    setStagedValue(value)
    setIsEditing(false)
  }

  const edit = () => {
    setIsEditing(true)
  }

  if (isEditing) {
    return <form onSubmit={submit}>
      <label htmlFor={`${fieldName}-edit`}>{label}: </label>
      <input
        type="text"
        name={fieldName}
        id={`${fieldName}-edit`}
        value={stagedValue}
        onChange={e => setStagedValue(e.target.value)}
      />
      <input
        type="submit"
        value="Update"
      />
      <button onClick={() => cancel()}>Cancel</button>
    </form>
  }

  return <div>
    {label}: {value} <button onClick={() => edit()}>Edit</button>
  </div>
}
