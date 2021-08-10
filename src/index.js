import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"
import { Gamerrater } from "./components/Gamerrater.js"
import "./index.css"

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Gamerrater />
        </Router>
    </React.StrictMode>,
    document.getElementById("root")
)
