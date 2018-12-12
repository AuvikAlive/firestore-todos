import { connect } from "react-redux"
import { addTodo, fetchTodos } from "./actions"
import { Todos } from "./Todos"

const mapStateToProps = ({ todos }) => ({ ...todos })

const mapDispatchToProps = { addTodo, fetchTodos }

export const TodosContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Todos)
