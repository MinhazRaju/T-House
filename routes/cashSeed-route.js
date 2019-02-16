import express from 'express'

const router = express();


router.all('/*' , (req , res , next)=>{


    req.app.locals.layout = 'admin'
    next()

})



router.get('/' ,(req , res)=>{

        res.render('admin/cashseed')

} )




module.exports = router