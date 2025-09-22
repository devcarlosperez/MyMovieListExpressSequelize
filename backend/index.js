const express = require("express")

const app = express()

app.use(express.json())

app.use(express.urlencoded({extended: true}))

app.get("/", (req, res) => {
  res.json({message: "Welcome to my movie list"})
})

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})