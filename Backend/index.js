const express=require('express')
const connectDB = require('./Services/Connection')
const routes = require('./Routes/routes');


const app=express()

connectDB()

app.use('/', routes);

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})