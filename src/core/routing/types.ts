export type RouteTable = Record<string, (...props: any[]) => React.ReactNode>

export type State<Routes extends RouteTable> = {
  [Path in keyof Routes]: { path: Path, params: Parameters<Routes[Path]> }
}[keyof Routes]