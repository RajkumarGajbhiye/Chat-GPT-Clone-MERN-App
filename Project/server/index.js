const config = require("./config.js");
const mongoose = require("mongoose");
const express= require("express");
const cors= require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const colors = require("colors");
const authRouter = require('./routes/authRoute.js');
const openAIRouter = require ("./routes/openAIRoute.js")
const globalErrorHandling = require("./controllers/errorController.js");


//here we connect mongoose

const DB_Connection_String = process.env.DATABASE_CONNECTION_STRING.replace(
    "<mongodb_user>",
    process.env.DATABASE_USERNAME
).replace(
    "<mongodb_password>",
    process.env.DATABASE_PASSWORD 
)

mongoose.set("strictQuery",false)
mongoose.connect(DB_Connection_String,{
    useNewUrlParser : true
}).then(con=> console.log("Database connection established.....".bgBlue))

const app = express();

//middleware
app.use(express.json())
app.use(cors())
app.use(bodyParser.urlencoded({extended:false}))
app.use(morgan('dev'))
app.use('/api/v1/auth',authRouter)
app.use('/api/v1/openai',openAIRouter)
app.use(globalErrorHandling);


const port = process.env.PORT || 5000
app.listen(port,()=>console.log(`Server Running at port ${port}...`.rainbow.bgWhite))
