import { MongoClient } from "mongodb";
const url="localhost:27017";
const dbName="NodeJSDay3Task";


const dbUser="nithishkumarmurugesan2001";
const dbPassword="tzzBUJOevjJUzjMX";
const cluster="cluster0.yslorn1.mongodb.net";

//const localUrl=`mongodb://${url}`;

const cloudUrl=`mongodb+srv://${dbUser}:${dbPassword}@${cluster}/?retryWrites=true&w=majority&appName=Cluster0`;

const client=new MongoClient(cloudUrl);

const db=client.db(dbName);

async function ConnectToDb(){
    try{
        await client.connect();
        console.log("Connection success")
    }catch(e){
        console.log("Error:"+e);
        process.exit(1);
    }
}

export {db,client}
export default ConnectToDb;