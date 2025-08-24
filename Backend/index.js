const express=require('express')
const connectDB = require('./Services/Connection')
const routes = require('./Routes/Routes');
const app=express()
const cors = require('cors');

app.use(express.json());
app.use(cors());


app.use('/', routes);

connectDB()

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})