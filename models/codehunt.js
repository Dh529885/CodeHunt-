const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const codeSchema = new mongoose.Schema(
  {
    name:{type: String, required: true},
    code: {type: String, required:true},
    completed: Boolean,
  });



const Codehunt = mongoose.model('Codehunt', codeSchema);


module.exports = Codehunt;
