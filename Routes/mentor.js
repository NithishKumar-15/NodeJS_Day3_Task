import Express  from "express";
import { db } from "../DBCONNECTION/dbconnection.js";

const mentorRouter=Express.Router();

const collection=db.collection("Mentor");
const collectionStudent=db.collection("Student");


//API to add mentor
mentorRouter.post("/",async(req,res)=>{
    try{
        const data={
            mentorId:Date.now(),
            ...req.body};
        await collection.insertOne(data);
        res.send({message:"Data inserted successfully"});
    }catch(e){
        res.status(500).send({message:"Internal server error:"+e});
    }
});

// API to assign students to a mentor
mentorRouter.put('/:mentorId',async(req,res)=>{
    try{
    const studentsData=req.body.Student;
    const mentorID=req.params.mentorId;
    
    const mentorName=await collection.findOne({mentorId:Number(mentorID)});
    console.log(mentorName.Name);

    let data=[];
    for(let a of studentsData){
        const std1=await collectionStudent.findOne({Studentname:a,mentor:"NotAssigned"},{projection:{Studentname:1,_id:0}});
        if(std1!=null){
            data.push(a);
        }
    }

    await collection.updateOne({mentorId:Number(mentorID)},{$set:{students:data}});

     studentsData.forEach(async(element) => {
        await collectionStudent.updateOne({Studentname:element},{$set:{mentor:"Assigned",mentorName:mentorName.Name}});
     });

    res.send({message:"Data inserted successfully",data});
    }catch(e){
        res.status(500).send({message:"Internal server error:"+e});
    }

})


//API to show all students for a particular mentor
mentorRouter.get('/:mentorName',async(req,res)=>{
    try{
    const mentorName=req.params.mentorName;
    const students=await collection.findOne({Name:mentorName});
    if(students!=null){
        res.send({...students.students});
    }else{
        res.send({message:`The mentor Name is not present in document the ${mentorName}`})
    }
    }catch(e){
        res.status(500).send({message:"Internal server error:"+e});
    }
})

export default mentorRouter;