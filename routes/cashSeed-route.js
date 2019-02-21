import express from 'express'
import CashSeederSchema from '../models/CashSeederSchema.model'
import _ from 'lodash'


const router = express();


router.all('/*' , (req , res , next)=>{


    req.app.locals.layout = 'admin'
    next()

})



router.get('/' ,(req , res)=>{


    CashSeederSchema.find({}).then((readData)=>{

          

        res.render('admin/cashseed' , {fetchCashSeed:readData})

    })


     
})



router.post('/create' , (req , res)=>{

    
    const body  = _.pick(req.body , ['seeder'])

    const cashseed = new CashSeederSchema;

    cashseed.seeder = body.seeder

    cashseed.save().then(()=>{



       res.redirect('/admin/cashSeed')
    })    

})



router.get('/edit/:id' , (req , res)=>{


    CashSeederSchema.findOne({_id:req.params.id}).then((data)=>{


        res.render('admin/cashseed' , {editCashSeed:data})

    })    




})


router.post('/update/:id' , (req  , res)=>{

        CashSeederSchema.findOneAndUpdate({_id:req.params.id} , {$set:{

            seeder:req.body.seeder
        }}).then(()=>{
           
            res.redirect('/admin/cashSeed')

        })

})    




router.get('/delete/:id' , (req ,res)=>{

    CashSeederSchema.findOneAndDelete({_id:req.params.id}).then(()=>{
        res.redirect('/admin/cashSeed')
    })

})







module.exports = router