import { RouteTable, State } from "./types"

export class Router<Routes extends RouteTable> {
  private readonly dispatch: (state: State<Routes>) => void

  constructor(dispatch: (state: State<Routes>) => void) {
    this.dispatch = dispatch
  }

  goTo<Path extends keyof Routes>(path: Path, ...params: Parameters<Routes[Path]>): void {
    this.dispatch({ path, params })
  }
}
