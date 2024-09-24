import * as React from "react"

type HasNumberField<FieldName extends string> = {
  [key in FieldName]: number
}

interface Props<FieldName extends string> {
  model: HasNumberField<FieldName>,
  fieldName: FieldName,
  label: string,
  update: (newValue: number) => Promise<HasNumberField<FieldName>>
}

export default function Counter<
  FieldName extends string
>({ model, fieldName, update, label }: Props<FieldName>): React.ReactNode {
  const [value, setValue] = React.useState<number | undefined>(model[fieldName])

  const updateValue = (newValue: number) => {
    setValue(newValue)
    update(newValue)
  }

  return <div>
    <label htmlFor={`${fieldName}-edit`}>{label}</label>
    <input
      type="number"
      name={fieldName}
      id={`${fieldName}-edit`}
      value={value}
      onChange={e => updateValue(parseInt(e.target.value))}
    />
  </div>
}

