import express from 'express';
import CashInSchema from '../models/CashInSchema.model'
import CashOutSchema from '../models/CashOutSchema.model'
import CashSeederSchema from '../models/CashSeederSchema.model'
import _ from 'lodash'
import { Mongoose } from 'mongoose';
import { Session } from 'inspector';

const Json2csvParser = require('json2csv').Parser

 


const router = express();


router.all('/*' , (req , res , next)=>{

    req.app.locals.layout = 'admin'
    next()

})




router.get('/' , (req , res)=>{
    

    CashSeederSchema.find({}).then((readData)=>{

        req.session.cashid = readData[0]._id
        req.session.bankid = readData[1]._id
        res.render('admin')

    })

   

   
})




router.post('/cashInEvent' , (req , res)=>{
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


router.post('/cashOutEvent' , (req , res)=>{
    console.log(req.header('x'))
    const body = _.pick(req.body , ['sector' , 'amount', 'body'])
    
    const cashInput = new CashOutSchema;

    cashInput.seeder = body.sector
    cashInput.amount = body.amount,
    cashInput.description = body.body   
    cashInput.random = new Date().valueOf()
    cashInput.seederId = body.sector
    

    cashInput.save().then(()=>{       
     

        res.redirect('/admin/cashOutReport')

    })  

})


router.get('/cashInReport' , (req , res , next)=>{
   
        const cashid =  req.session.cashid
        const bankid =  req.session.bankid      


  
    CashInSchema.find({}).populate('seeder').then((readData)=>{

           
           

     



       if(readData.length == 0){

        CashSeederSchema.find({}).then((s)=>{

            res.render('admin/accounts/cashin' , {s:s})

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
                        seederId:cashid
                       
                    }},
                    {$group:{
                        _id:null,
                        cashcount:{$sum:1}
                    }}
                ]).then((cashCountdata)=>{
                          
                       
                        const cash = cashCountdata[0].cashcount
                    

                 
                     
                  CashInSchema.aggregate([
                    {$match:{
                        seederId:bankid
                       
                    }},
                    {$group:{
                        _id:null,
                        bankcount:{$sum:1}
                    }}
                ]).then((bankCountdata)=>{
                    
                    console.log(bankCountdata)

                  const bank = bankCountdata[0].bankcount

                  CashInSchema.find({seederId:cashid}).then(readCashSum=>{
                    const  cashsum = []

                    for (let index = 0; index < readCashSum.length; index++) {
                        
                        cashsum.push(readCashSum[index].amount)
                        
                    }
        
                    const cashamount =  _.sum(cashsum)

                    CashInSchema.find({seederId:bankid}).then(readBankSum=>{
                        const banksum = []
                        for (let index = 0; index < readBankSum.length; index++) {
                            
                            banksum.push(readBankSum[index].amount)
                            
                        }
            
                        const bankamount =  _.sum(banksum)
                        res.render('admin/accounts/cashin' , {fetchCashInData:readData , total:add, seederFetch:readSeedData , count:count , cash:cash , bank:bank , cashamount, bankamount})
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

            
          

            res.render('admin/accounts/cashin' , {fetchCashInEditData:readData , fetchCashSeederData:readData2})

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
     
    const cashid =  req.session.cashid
    const bankid =  req.session.bankid

    



    CashOutSchema.find({}).populate('seeder').then((readData)=>{

       
       

 



   if(readData.length == 0){

    CashSeederSchema.find({}).then((s)=>{

        res.render('admin/accounts/cashout' , {s:s})

    })
   
    
   }
   

     
    const sum  = []

    for (let index = 0; index < readData.length; index++) {
        sum.push(readData[index].amount)     
    }
    const add  =  _.sum(sum)     

    CashSeederSchema.find({}).then((readSeedData)=>{

        CashOutSchema.find({}).countDocuments().then(count=>{


           
            CashOutSchema.aggregate([
                {$match:{
                    seederId:cashid
                   
                }},
                {$group:{
                    _id:null,
                    cashcount:{$sum:1}
                }}
            ]).then((cashCountdata)=>{
                      
                   
                    const cash = cashCountdata[0].cashcount
                

             
                 
                CashOutSchema.aggregate([
                {$match:{
                    seederId:bankid
                   
                }},
                {$group:{
                    _id:null,
                    bankcount:{$sum:1}
                }}
            ]).then((bankCountdata)=>{
                
                console.log(bankCountdata)

              const bank = bankCountdata[0].bankcount

              CashOutSchema.find({seederId:cashid}).then(readCashSum=>{
                const  cashsum = []

                for (let index = 0; index < readCashSum.length; index++) {
                    
                    cashsum.push(readCashSum[index].amount)
                    
                }
    
                const cashamount =  _.sum(cashsum)

                CashOutSchema.find({seederId:bankid}).then(readBankSum=>{
                    const banksum = []
                    for (let index = 0; index < readBankSum.length; index++) {
                        
                        banksum.push(readBankSum[index].amount)
                        
                    }
        
                    const bankamount =  _.sum(banksum)
                    res.render('admin/accounts/cashout' , {fetchCashInData:readData , total:add, seederFetch:readSeedData , count:count , cash:cash , bank:bank , cashamount, bankamount})
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




router.post('/cashOutEvent' , (req , res)=>{


    console.log(req.header('x'))
    const body = _.pick(req.body , ['sector' , 'amount', 'body'])
    
    const cashOutput = new CashOutSchema;

    cashOutput.seeder = body.sector
    cashOutput.amount = body.amount,
    cashOutput.description = body.body   
    cashOutput.random = new Date().valueOf()
    cashOutput.seederId = body.sector
    

    cashOutput.save().then(()=>{       
     

        res.redirect('/admin/cashOutReport')

    })  



})


router.get('/cashOutReport/edit/:id' , (req , res)=>{
    
    CashOutSchema.findOne({_id:req.params.id}).then((readData)=>{


        CashSeederSchema.find({}).then(readData2=>{

            
          

            res.render('admin/accounts/cashout' , {fetchCashInEditData:readData , fetchCashSeederData:readData2})

        })

        

    })


})    

router.post('/cashOutReport/update/:id' , (req , res)=>{

        
    CashOutSchema.findOneAndUpdate({_id:req.params.id} , {$set:{

        seeder:req.body.sector,
        amount:req.body.amount,
        description:req.body.body,
        seederId:req.body.sector

       


    }}).then(()=>{

        res.redirect('/admin/cashOutReport')
       



    })


   

})









module.exports = router








