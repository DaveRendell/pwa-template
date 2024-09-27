type KeyOfType<Model, Value> = {
  [Key in keyof Model]: Model[Key] extends Value ? Key : never
}[keyof Model]

export default KeyOfType
