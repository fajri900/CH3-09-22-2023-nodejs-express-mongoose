const mongoose = require("mongoose")

const app = require("./app")

const port = process.env.port || 3000

const database = "mongodb://127.0.0.1:27017"

mongoose
  .connect(database, {
    useNewUrlParser: true,
  })
  .then(() => console.log("DB sukses terkoneksi"))

app.listen(port, () => {
  console.log(`App running on port ${port}...`)
})
