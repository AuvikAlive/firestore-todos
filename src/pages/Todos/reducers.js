import {
  ADD_TODO,
  ADD_TODO_FAILED,
  FETCH_TODOS,
  FETCH_TODOS_COMPLETED,
  FETCH_TODOS_FAILED,
} from "./actionTypes"

const initialState = {
  todos: [],
  loading: false,
  error: "",
}

export const todosReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [payload, ...state.todos],
      }

    case ADD_TODO_FAILED:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== payload.id),
        error: payload.message,
      }

    case FETCH_TODOS:
      return {
        ...state,
        loading: true,
      }

    case FETCH_TODOS_COMPLETED:
      return {
        ...state,
        todos: payload,
        loading: false,
      }

    case FETCH_TODOS_FAILED:
      return {
        ...state,
        loading: false,
        error: payload,
      }

    default:
      return state
  }
}
