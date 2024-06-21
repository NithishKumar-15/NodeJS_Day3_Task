import Express  from "express";

//importing connection function from dbconnection
import ConnectToDb from "./DBCONNECTION/dbconnection.js";

//import mentor router
import mentorRouter from "./Routes/mentor.js";

// importing student router
import studentRouter from "./Routes/student.js";

const server=Express();

//using both router
server.use(Express.json());

const port=6000;

await ConnectToDb();

//Creating the server
server.use("/mentor",mentorRouter);
server.use("/student",studentRouter);

//Listerning the port
server.listen(port,(err)=>{
    if(err){
        console.log("Error:"+e);
    }
});