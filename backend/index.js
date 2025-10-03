const express = require("express")
const cors = require("cors")

const app = express()

const corsOptions = {
  origin: "http://localhost:8100"
}

app.use(cors(corsOptions))

app.use(express.json())

app.use(express.urlencoded({extended: true}))

const db = require("./models")

// db.sequelize.sync()

db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.")
})

app.get("/", (req, res) => {
  res.json({message: "Welcome to my movie list"})
})

require("./routes/movie.routes.js")(app)
require("./routes/user.routes.js")(app)

const port = process.env.PORT || 8080

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`)
})