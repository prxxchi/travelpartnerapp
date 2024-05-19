const connectToMongo = require('./db');
const express = require('express')
const cors = require('cors')

connectToMongo();


const app = express()
const port = 8000

app.use(cors())

app.use(express.json())

app.use('/api/user',require('./Routes/user.route.js'));

app.get("/", async(req,res)=>{
    res.send("hello purvi")
})



app.listen(port, () => {
  console.log(`Purvi server listening at : http://localhost:${port}`)
})