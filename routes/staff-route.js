import express from 'express'

const router = express.Router();

   
    router.get('/*' , (req , res , next)=>{


        req.app.locals.layout = 'admin'
           next() 



    })



    router.get('/' , (req , res)=>{

        res.render('admin/staff')
    })








module.exports = router

