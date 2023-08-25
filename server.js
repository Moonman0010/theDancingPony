const express = require("express");
const dotenv = require("dotenv").config()
const errorHandler = require("./midleware/errorHandler");
const connectToDb = require("./config/dbConnection");

connectToDb();

const app = express();

const port = process.env.PORT || 5000 ;

app.use(express.json());

app.use("/dishes", require("./Routes/dishRoutes"))
app.use("/user", require("./Routes/userRoutes"))

app.use(errorHandler)

app.listen(port, () => {
    console.log(`server has started at port ${port}`)
})
