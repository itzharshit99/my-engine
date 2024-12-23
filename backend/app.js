
import express from 'express';
import morgan from 'morgan';
import connect from './db/db.js';
import userRoutes from "./routes/user.route.js";
import cookieParser from 'cookie-parser';
connect();
const app = express();
//middlewares
app.use(morgan('dev'))
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

//routes
app.use('/users',userRoutes);
app.get('/',(req,res)=>{
  res.send("hello");

})
export default app;
