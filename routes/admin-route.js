import express from 'express';
import CashInSchema from '../models/CashInSchema.model'
import CashSeederSchema from '../models/CashSeederSchema.model'
import _ from 'lodash'
import { Mongoose } from 'mongoose';

const Json2csvParser = require('json2csv').Parser

 


const router = express();


router.all('/*' , (req , res , next)=>{

    req.app.locals.layout = 'admin'
    next()

})




router.get('/' , (req , res)=>{
    res.render('admin')
})




router.post('/createEvent' , (req , res)=>{
    console.log(req.header('x'))
    const body = _.pick(req.body , ['sector' , 'amount', 'body'])
    
    const cashInput = new CashInSchema;

    cashInput.seeder = body.sector
    cashInput.amount = body.amount,
    cashInput.description = body.body   
    cashInput.random = new Date().valueOf()
    cashInput.seederId = body.sector
    

    cashInput.save().then(()=>{       
     

        res.redirect('/admin/cashInReport')

    })  

})

router.get('/cashInReport' , (req , res , next)=>{
   
    CashInSchema.find({}).populate('seeder').then((readData)=>{

           
           

     



       if(readData.length == 0){

        CashSeederSchema.find({}).then((s)=>{

            res.render('admin/accounts' , {s:s})

        })
       
        
       }
       

         
        const sum  = []

        for (let index = 0; index < readData.length; index++) {
            sum.push(readData[index].amount)     
        }
        const add  =  _.sum(sum)     

        CashSeederSchema.find({}).then((readSeedData)=>{

            CashInSchema.find({}).countDocuments().then(count=>{


               
                CashInSchema.aggregate([
                    {$match:{
                        seederId:"5c6b0549ad44070a34136163"
                       
                    }},
                    {$group:{
                        _id:null,
                        cashcount:{$sum:1}
                    }}
                ]).then((cashCountdata)=>{
                          
                       
                        const cash = cashCountdata[0].cashcount
                    

                 
                     
                  CashInSchema.aggregate([
                    {$match:{
                        seederId:"5c6b0544ad44070a34136162"
                       
                    }},
                    {$group:{
                        _id:null,
                        bankcount:{$sum:1}
                    }}
                ]).then((bankCountdata)=>{
                    
                    console.log(bankCountdata)

                  const bank = bankCountdata[0].bankcount

                  CashInSchema.find({seederId:"5c6b0549ad44070a34136163"}).then(readCashSum=>{
                    const  cashsum = []

                    for (let index = 0; index < readCashSum.length; index++) {
                        
                        cashsum.push(readCashSum[index].amount)
                        
                    }
        
                    const cashamount =  _.sum(cashsum)

                    CashInSchema.find({seederId:"5c6b0544ad44070a34136162"}).then(readBankSum=>{
                        const banksum = []
                        for (let index = 0; index < readBankSum.length; index++) {
                            
                            banksum.push(readBankSum[index].amount)
                            
                        }
            
                        const bankamount =  _.sum(banksum)
                        res.render('admin/accounts' , {fetchCashInData:readData , total:add, seederFetch:readSeedData , count:count , cash:cash , bank:bank , cashamount, bankamount})
                    })     



                    
                })       
               
                 
                  
                
                   
                })   
                
                   
                }).catch(e=>{

                    console.log(e)

                })


                
               
        
               
                

            })

            
    
        })
    

        

    })
    


})



router.get('/cashInReport/edit/:id' , (req , res)=>{

    CashInSchema.findOne({_id:req.params.id}).then((readData)=>{


        CashSeederSchema.find({}).then(readData2=>{

            
          

            res.render('admin/accounts' , {fetchCashInEditData:readData , fetchCashSeederData:readData2})

        })

        

    })


})    


router.post('/cashInReport/update/:id' , (req , res)=>{

        
    CashInSchema.findOneAndUpdate({_id:req.params.id} , {$set:{

        seeder:req.body.sector,
        amount:req.body.amount,
        description:req.body.body,
        seederId:req.body.sector

       


    }}).then(()=>{

        res.redirect('/admin/cashInReport')
       



    })


   

})







router.get('/cashOutReport' , (req , res)=>{
    res.render('admin/')


})




router.get('/cashInReport/csv' , (req , res)=>{

   
   

    CashInSchema.find({}).populate('seeder').then((myData)=>{


   
    
        var fields = ['random' , 'date' ,'seeder.seeder', 'amount' , 'description']
        var opts = {fields}

        const parser = new Json2csvParser(opts)
        const csv = parser.parse(myData);

        console.log(csv)
        
            res.attachment('haha.csv')
            res.status(200).send(csv);


    }).catch(e=>{

        console.log(e)
    })




})













module.exports = router








