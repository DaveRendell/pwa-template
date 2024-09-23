import { createRoot } from "react-dom/client"
import * as React from "react"
import "./index.css"

var mountNode = document.getElementById("app")
const root = createRoot(mountNode!)
root.render(<h1>Hello world</h1>)