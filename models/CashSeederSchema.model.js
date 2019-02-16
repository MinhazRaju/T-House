import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const CashSeeder = new Schema({


    seeder:{
        type:String
      
    }



})



module.exports = mongoose.model('cashseeder' , CashSeeder)



