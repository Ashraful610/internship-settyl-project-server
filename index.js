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
        // employee collection database
        const employeesCollection = client.db("employees").collection("employee");        
        console.log('connection with database ')
           
        // get all employees api
        app.get('/employees', async(req , res) => {
            const query = {}
            const employees = await employeesCollection.find(query).toArray();
            res.send(employees);
        })

        // get one employee for update api
        app.get('/employee/:id', async(req , res) => {
            const id = req.params?.id;
            const query = {_id:ObjectId(id)}
            const employee = await employeesCollection.findOne(query);
            res.send(employee);
        })
 
        // create a new employee api
        app.post('/employee',async (req, res) =>{
            const employee = req.body
            const result = await employeesCollection.insertOne(employee)
            res.send(result)
        })
         
        // update employee details api
        app.put('/employee/:id',async (req, res) =>{
            const id = req.params.id
            const filter = {_id:ObjectId(id)}
            const options = {upsert:true}
            const employee = req.body
            const updateDoc = {$set:{...employee}}
            const result = await employeesCollection.updateOne(filter , updateDoc , options)
            res.send(result)
        })

    }
    finally{}
}
run().catch(console.dir)

app.get('/', (req, res) => {
    res.send('welcomet to settyl website')
})

app.listen(port , ()=>{
    console.log('listening on port ' + port)
})