const mongoose = require('mongoose');

const shipmentSchema = new mongoose.Schema({
  trackingId : {
    type : String,
    required : true,
    unique : true
  },
  senderName : {type: String , required : true},
  receiverName : {type: String , required : true},
  origin : {type: String, required : true},
  destination : {type: String, required : true},
  weight : {type : String},
  status :{
    type : String,
    enum : ['Booked','In Transit','Out for Delivery', 'Delivered'],
    default : 'Booked'
  },
},{timestamps : true});

module.exports = mongoose.model('Shipment',shipmentSchema);