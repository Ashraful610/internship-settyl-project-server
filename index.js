const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');

require('dotenv').config()

// user name -- settyl-internship-ashraful
// user password -- PZU1oMFVFWMK75SQ

const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASSWORD}@cluster0.bwiu3ma.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run(){
    try{
        await client.connect();
        const collection = client.db("test").collection("devices");        
        console.log('connection with database ')

        

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