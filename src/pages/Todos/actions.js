import {
  ADD_TODO,
  ADD_TODO_FAILED,
  FETCH_TODOS,
  FETCH_TODOS_COMPLETED,
} from "./actionTypes"

export const addTodo = todo => async (dispatch, getState, getFirebase) => {
  const firebase = getFirebase()
  const db = firebase.firestore()
  const ref = db.collection("todos").doc()

  try {
    dispatch({
      type: ADD_TODO,
      payload: {
        ...todo,
        id: ref.id,
      },
    })

    ref.set({
      ...todo,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })
  } catch (error) {
    dispatch({
      type: ADD_TODO_FAILED,
      payload: { id: ref.id, message: error.message },
    })
  }

  return ref.id
}

export const fetchTodos = () => async (dispatch, getState, getFirebase) => {
  dispatch({ type: FETCH_TODOS })

  const db = getFirebase().firestore()
  const ref = db.collection("todos").orderBy("timestamp", "desc")

  return ref.onSnapshot(querySnapshot => {
    let items = []

    querySnapshot.forEach(doc =>
      items.push({
        id: doc.id,
        ...doc.data(),
      })
    )
    dispatch({ type: FETCH_TODOS_COMPLETED, payload: items })
  })
}
