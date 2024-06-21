import { MongoClient } from "mongodb";
const url="localhost:27017";
const dbName="NodeJSDay3Task";

const localUrl=`mongodb://${url}`;

const client=new MongoClient(localUrl);

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