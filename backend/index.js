const express=require("express");
const app=express();
const mongoose=require("mongoose")
const userRoute=require("./routes/users")
const authRoute=require("./routes/auth")
const productRoute=require("./routes/products")
const cartRoute=require("./routes/carts")
const orderRoute=require("./routes/orders")
const dotenv=require("dotenv");
const cors=require("cors");



app.use('/public/uploads', express.static(__dirname + '/public/uploads'));
dotenv.config();
//connect to mongoDB
dbUrl="mongodb://0.0.0.0/ekart";

mongoose.connect(dbUrl,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

.then(()=>console.log("Connected to MongoDB"))
.catch((err)=>console.log("Error Connecting MongoDB", err.message))

//to check API
app.use('/public/uploads', express.static(__dirname + '/public/uploads'));
app.use(cors()) 
app.use(express.json());
app.use("/api/auth",authRoute);
app.use("/api/users",userRoute);
app.use("/api/products",productRoute);
app.use("/api/carts",cartRoute);
app.use("/api/orders",orderRoute);

app.listen(3000,()=>{
    console.log("server is sucess");
})