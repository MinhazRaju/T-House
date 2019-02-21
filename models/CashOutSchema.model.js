import mongoose from 'mongoose'

const Schema = mongoose.Schema;


const cashOut = new Schema({


  
    seeder:{
        type: Schema.Types.ObjectId,
        ref:'cashseeder'

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
    seederId:{

        type:String
    }
    
    




})





module.exports = mongoose.model('cashout' , cashOut )








