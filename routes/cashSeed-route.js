import express from 'express'
import CashSeederSchema from '../models/CashSeederSchema.model'
import _ from 'lodash'


const router = express();


router.all('/*' , (req , res , next)=>{


    req.app.locals.layout = 'admin'
    next()

})



router.get('/' ,(req , res)=>{
        res.render('admin/cashseed')
})



router.post('/create' , (req , res)=>{

    
    const body  = _.pick(req.body , ['seeder'])




    const cashseed = new CashSeederSchema;

    cashseed.seeder = body.seeder


    cashseed.save().then(()=>{

        console.log('dave')
    })    



  

})




module.exports = router