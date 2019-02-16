import express from 'express'

const router = express()


router.all('/*' , (req , res , next)=>{

    req.app.locals.layout = 'font'
    next()

})


router.get('/' , (req , res)=>{
    res.render('font')
})





module.exports = router


