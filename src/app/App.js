import React from "react"
import { Provider } from "react-redux"
import { ConnectedRouter } from "connected-react-router"
import { store, history } from "../store/"
import { Routes } from "./Routes"

export const App = () => {
  return (
    <Provider {...{ store }}>
      <ConnectedRouter history={history}>
        <Routes />
      </ConnectedRouter>
    </Provider>
  )
}
