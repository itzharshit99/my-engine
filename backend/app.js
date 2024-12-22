
import express from 'express';
import morgan from 'morgan';
const app = express();
//middlewares
app.use(morgan('dev'))
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//routes
app.get('/',(req,res)=>{
  res.send("hello");

})
export default app;
