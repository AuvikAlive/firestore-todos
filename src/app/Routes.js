import React from "react"
import { Route, Switch, Redirect } from "react-router-dom"
import { TodosContainer } from "../pages/Todos/"

export const Routes = () => (
  <Switch>
    <Route exact path="/todos" component={TodosContainer} />
    <Redirect to="/todos" />
  </Switch>
)
