import express from 'express'
import socketIo from 'socket.io'
import http from 'http';
import path from 'path'
import hbs from 'express-handlebars'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import upload from 'express-fileupload'

import {getDate , select} from './helpers/custom.function'

const publicPath =  path.join(__dirname , 'public')


const app = express()
const server  = http.createServer(app)


mongoose.connect('mongodb://localhost:27017/T-House' , {useNewUrlParser:true, useCreateIndex:true} )
mongoose.connection.on('open' , ()=> console.log('connnectd')).on('error' ,   ()=> console.log('error uP'))





app.set('view engine' , 'handlebars')
app.engine('handlebars' , hbs({defaultLayout:"font" , helpers:{getDate , select}}))
app.use(express.static(publicPath))
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(upload())

const registerRoute = (route , path) =>{

    app.use(route , path)



} 




import fontRouter from './routes/font-route'
import adminRouter from './routes/admin-route';
import cashSeed from './routes/cashSeed-route'


registerRoute('/' , fontRouter)

registerRoute('/admin' ,  adminRouter)
registerRoute('/admin/cashSeed' , cashSeed)






server.listen(1000 , ()=>{
    console.log('server up ')

})





