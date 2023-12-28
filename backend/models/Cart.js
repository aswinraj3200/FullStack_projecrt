const mongoose=require('mongoose');


const CartSchema = new mongoose.Schema({
    title:{ type:String,required:true},
    userId:{type: String},
    productId: {type:String, required: true},
    quantity: {type:Number,default:1},
    id: {type:Number, required : false},
    quantity: { type: Number, default: 1 },
    price:{type:Number},
    image:{type: String},     
},
{timestamps:true});

module.exports=mongoose.model("Cart",CartSchema)