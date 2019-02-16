import mongoose from 'mongoose'

const Schema = mongoose.Schema;


const cashIn = new Schema({


    sector:{
        type:String,
        
    },
    amount:{
        type:Number, 
     
    },
    description:{
        type:String,
      
    },
    date:{

        type:Date,
        default: new Date()
    },
    random:{
        type:Number,
        default:null
    },
    createdAt:{
        type:Date
    }    
    




})





module.exports = mongoose.model('cashins' , cashIn )








