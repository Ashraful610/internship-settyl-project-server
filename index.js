const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


// middle ware
app.use(cors())
app.use(express.json())
require('dotenv').config()

const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASSWORD}@cluster0.bwiu3ma.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run(){
    try{
        await client.connect();
        const employeesCollection = client.db("employees").collection("employee");        
        console.log('connection with database ')
           
        // get api 
        app.get('/employees', async(req , res) => {
            const query = {}
            const employees = await employeesCollection.find(query).toArray();
            res.send(employees);
        })

        // get employee for update 
        app.get('/employee/:id', async(req , res) => {
            const id = req.params.id;
            console.log(id)
            const query = {_id:ObjectId(id)}
            console.log(query)
            const employee = await employeesCollection.findOne(query);
            console.log(employee)
            res.send(employee);
        })
 
        // post api 
        app.post('/employee',async (req, res) =>{
            const employee = req.data
            const result = await employeesCollection.insertOne(employee)
            res.send(result)
        })
         

        // update api
        app.put('/employee/:id',async (req, res) =>{
            const id = req.params.id
            console.log(id)
            const filter = {_id:ObjectId(id)}
          console.log(filter)
            const options = {upsert:true}
            const employee = req.body
            console.log(employee)
            const updateDoc = {$set:{...employee}}
            const result = await employeesCollection.updateOne(filter , updateDoc , options)
            console.log(result)
            res.send(result)
        })

    }
    finally{

    }

}
run().catch(console.dir)








app.get('/', (req, res) => {
    res.send('welcomet to settyl website')
})

app.listen(port , ()=>{
    console.log('listening on port ' + port)
})