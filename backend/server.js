const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors({
  origin: "*"
}));
app.use(express.json());

const shipmentRoutes = require('./routes/shipments');
app.use('/api/shipments',shipmentRoutes);

app.get('/',(req,res)=> res.send('Server is running'));

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
  console.log('MongoDb Connected successfully');
  app.listen(process.env.PORT || 5000,()=>{
    console.log('Server is running on port 5000');
  });
})
.catch(err => console.log(err));