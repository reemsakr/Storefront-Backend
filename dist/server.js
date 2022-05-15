"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
const index_routes_1 = __importDefault(require("./routes/index_routes"));
const app = (0, express_1.default)();
const address = "0.0.0.0:3000";
app.use((0, morgan_1.default)('dev'));
app.use(body_parser_1.default.json());
app.use('/api', index_routes_1.default);
app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.listen(3000, function () {
    console.log(`starting app on: ${address}`);
});
// import  express,{Request,Response} from "express";
// import bodyParser from 'body-parser';
// import routes from './routes/index';
// import morggan from 'morgan';
// import errorMiddlewarwe from "./middleware/error.middleware";
// import dashboardRoutes from './handler/;
// const app:express.Application=express();
// const address:string="0.0.0.4000";
// app.use(morggan('dev'));
// app.use(bodyParser.json());
// app.use('/api',routes);
// app.use('/ser',dashboardRoutes);
// app.get('/',function(reg:Request,res:Response){
//     throw new Error('Error exist');
//     res.send('Hello World');
// });
// app.use((_req:Request,res:Response)=>{
// res.status(400).json({
//     message :"ooh you are lost !"
// });
// });
// app.use(errorMiddlewarwe);
// app.listen(4000,function(){
//     console.log(`starting app on port :${address}`);
// });
