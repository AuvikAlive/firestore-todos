import React, { Component } from "react"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import CircularProgress from "@material-ui/core/CircularProgress"
import { Formik } from "formik"
import { Content } from "components/Content/"
import { withFeedback } from "../../hocs/withFeedback/"
import { showContentWhenLoaded } from "functions/"

class TodosBase extends Component {
  componentDidMount() {
    this.props.fetchTodos()
  }

  render() {
    const { error, loading, todos, addTodo } = this.props

    return showContentWhenLoaded(
      !loading,
      <Content>
        <Card>
          <CardContent>
            <Typography variant="h4" align="center">
              My Todos
            </Typography>

            <List disablePadding>
              {todos.map(({ id, todo }) => (
                <ListItem button key={id}>
                  <ListItemText primary={todo} />
                </ListItem>
              ))}
            </List>

            <Formik
              validateOnBlur={false}
              initialValues={{ todo: "" }}
              onSubmit={(values, { resetForm }) => {
                addTodo(values)
                resetForm({ todo: "" })
              }}
              validate={values => {
                let errors = {}

                if (!values.todo) {
                  errors.todo = "Add a todo"
                }

                return errors
              }}
              render={({
                handleSubmit,
                handleChange,
                handleBlur,
                values,
                errors,
                touched,
                isSubmitting,
                isValid,
              }) => (
                <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                  <TextField
                    id="todo"
                    label="Todo"
                    margin="normal"
                    fullWidth
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.todo}
                    helperText={errors.todo && errors.todo}
                  />

                  {error && <p className="error">{error}</p>}

                  {!error &&
                    loading && (
                      <div className="loading">
                        <CircularProgress />
                      </div>
                    )}

                  {!loading && (
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      type="submit"
                      className="submit-button"
                      disabled={!!errors.todo}
                    >
                      Add Todo
                    </Button>
                  )}
                </form>
              )}
            />
          </CardContent>
        </Card>
      </Content>
    )
  }
}

export const Todos = withFeedback(TodosBase)
