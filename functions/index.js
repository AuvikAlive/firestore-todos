const functions = require("firebase-functions")
const express = require("express")
const { Router, Request } = express
const admin = require("firebase-admin")
const cors = require("cors")

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
})
const db = admin.firestore()
const router = Router()

router.get("/", async (req, res, next) => {
  try {
    const todoSnapshot = await db.collection("todos").get()
    const todos = []
    todoSnapshot.forEach(doc => {
      todos.push({
        id: doc.id,
        data: doc.data(),
      })
    })
    return res.json(todos)
  } catch (e) {
    return next(e)
  }
})

router.post("/", async (req, res, next) => {
  try {
    const text = req.body.text
    if (!text) throw new Error("Text is blank")
    const data = { text }
    const ref = await db.collection("todos").add(data)
    return res.json({
      id: ref.id,
      data,
    })
  } catch (e) {
    return next(e)
  }
})

const app = express()
app.use(cors({ origin: true }))
app.use(express.json())
app.use("/api", router)

exports.api = functions.https.onRequest(app)
