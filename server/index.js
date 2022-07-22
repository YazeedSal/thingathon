const dotenv = require("dotenv").config()
const express = require("express")
const path = require("path")
const app = express()
const cors = require("cors")
const PORT = 8080
const MONGO_URL = "mongodb+srv://admin:admin@cluster0.bhv2r.mongodb.net/?retryWrites=true&w=majority"

const mongoose = require("mongoose")
mongoose.connect(MONGO_URL).then(() => console.log("connected to db"))


const Schema = mongoose.Schema

const thingSchema = new Schema({
    thing: String,
})

const thing = mongoose.model("thing", thingSchema)

app.use(express.static(path.join(__dirname, "../build")))
app.use(express.json())


app.use(cors())




app.get("/", async function (req, res) {
    const things = await thing.find({})
    res.send(things)
})

app.post("/", async function (req, res) {
    const newThing = req.body
    const thingDB = new thing(newThing)
    const dbRes = await thingDB.save()
    res.send(dbRes)
})

app.listen(PORT, () => console.log("connected to the port"))