import { createStore, compose, applyMiddleware } from "redux"
import { createBrowserHistory } from "history"
import thunk from "redux-thunk"
import firebase from "firebase/app"
import "firebase/firestore"
import { reactReduxFirebase, getFirebase } from "react-redux-firebase"
import { reduxFirestore } from "redux-firestore"
import { routerMiddleware } from "connected-react-router"
import { firebaseConfig } from "../config/firebase"
import { createRootReducer } from "./createRootReducer"

firebase.initializeApp(firebaseConfig)
const firestoreDB = firebase.firestore()
firestoreDB.settings({ timestampsInSnapshots: true })
firestoreDB.enablePersistence()

const firebaseStore = reactReduxFirebase(firebase, {
  userProfile: "users",
  useFirestoreForProfile: true,
})

const fireStore = reduxFirestore(firebase)
const history = createBrowserHistory()
const router = routerMiddleware(history)
const middleware = applyMiddleware(thunk.withExtraArgument(getFirebase), router)
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  createRootReducer(history),
  composeEnhancers(firebaseStore, fireStore, middleware)
)

export { history, store }
