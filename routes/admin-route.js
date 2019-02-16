import express from 'express';
import CashInSchema from '../models/CashInSchema.model'
import _ from 'lodash'

const router = express();


router.all('/*' , (req , res , next)=>{

    req.app.locals.layout = 'admin'
    next()

})




router.get('/' , (req , res)=>{
    res.render('admin')
})


router.get('/createEvent' , (req , res)=>{

    res.render('admin/accounts/create')
    console.log(req.body)


})

router.post('/createEvent' , (req , res)=>{

    const body = _.pick(req.body , ['sector' , 'amount', 'body'])
    
    const cashInput = new CashInSchema;

    cashInput.sector = body.sector,
    cashInput.amount = body.amount,
    cashInput.description = body.body
    cashInput.random = new Date().valueOf()
    cashInput.createdAt = new Date().getTime

    cashInput.save().then(()=>{
        console.log('saved')
    })  

})

router.get('/cashInReport' , (req , res)=>{
   
    CashInSchema.find({}).then((readData)=>{

        res.render('admin/accounts' , {fetchCashInData:readData})

    })
    
    


router.get('/createEvent/edit/:id' , (req , res)=>{

    CashInSchema.findOne({_id:req.params.id}).then((readData)=>{

        res.render('admin/accounts/edit' , {fetchCashInData:readData})

    })


})    

   
   
    






    


})


router.get('/cashOutReport' , (req , res)=>{


    res.render('admin/')



})














module.exports = router








