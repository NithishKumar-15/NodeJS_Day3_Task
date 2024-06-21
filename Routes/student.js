import Express from "express";
import { ObjectId } from "mongodb";

// importing db from dbconnection
import { db } from "../DBCONNECTION/dbconnection.js";

const studentRouter=Express.Router();

const collection=db.collection("Student");


//API for add student to database 
studentRouter.post("/",async(req,res)=>{
    try{
        const data={mentor:"NotAssigned",
                    studentId:Date.now(),
                    ...req.body
                }
        await collection.insertOne(data);
        res.send({message:"Data inserted successfully"});
    }catch(e){
        res.status(500).send({message:"Internal server error:"+e});
    }
});


//API to change mentor for particular student
studentRouter.put("/:studentId",async(req,res)=>{

    try{
        const studId=req.params.studentId;
        const oldMentor=await collection.findOne({studentId:Number(studId)});
        await collection.updateOne({studentId:Number(studId)},{$set:{mentorName:req.body.mentorName,prevMentor:oldMentor.mentorName}})
        console.log(oldMentor.mentorName);
        res.send({message:"Data Updated successfully"});
    }catch(e){
        res.status(500).send({message:"Internal server error:"+e});
    }
})


//API to show previously assigned mentor for particular student
studentRouter.get("/:studentName",async(req,res)=>{

    try{
        const studentName=req.params.studentName;
        const previousStudent=await collection.findOne({Studentname:studentName});
        if(previousStudent!=null){
            const previousMentor=previousStudent.prevMentor
            res.send({previousMentor});
        }else{
            res.send({message:`The student Name is not present in document the ${studentName}`})
        }

    }catch(e){
        res.status(500).send({message:"Internal server error:"+e});
    }
})

export default studentRouter;