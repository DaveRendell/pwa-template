// Helper type for using asynchronously loaded data in
// React components. Inspired by react-query.

interface Pending {
  isPending: true
  error: undefined
  value: undefined
}

interface Failed {
  isPending: false
  error: Error
  value: undefined
}

interface Loaded<Result> {
  isPending: false
  error: undefined
  value: Result
}

type Async<Result> =
  Pending | Failed | Loaded<Result>

export default Async
