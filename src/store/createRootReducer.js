import { combineReducers } from "redux"
import { connectRouter } from "connected-react-router"
import { todosReducer } from "../pages/Todos/"

export const createRootReducer = history =>
  combineReducers({
    todos: todosReducer,
    router: connectRouter(history),
  })
