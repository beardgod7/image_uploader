import   dotenv from 'dotenv';
import user from './route/routes';
import sequelize from './database/pgconfig/pgconfig'; 
import express,{Application, Request, Response, NextFunction} from "express";
import cookieParser from 'cookie-parser';
import bodyParser from "body-parser";
import cors from "cors";


const app:Application = express()
app.use(cors())
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

dotenv.config();
if (process.env.NODE_ENV !== "PRODUCTION") {
    require('dotenv').config({
      path: "privacy/.env",
    });
  }


app.use((req:Request, res:Response, next:NextFunction)=>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "auth-token, Origin, X-Requested-With, Content-Type, Accept");
  next();
});

async function syncDatabase() {
    try {
      await sequelize.sync();
      console.log('Database synchronized.');
    } catch (error) {
      console.error('Database synchronization failed:', error);
    }
  }

syncDatabase();

app.use("/api/v2/user", user)
app.listen(process.env.PORT,()=>{
    console.log( `app is running on http://localhost:${process.env.PORT}`) 
})