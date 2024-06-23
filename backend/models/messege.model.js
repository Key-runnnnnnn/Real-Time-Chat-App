import mongoose from 'mongoose';

const messegeSchema = new mongoose.Schema({
  senderId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true
  },
  receiverId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true
  },
  messege:{
    type:String,
    required:true
  }
},{timestamps:true});//timestamps will automatically add createdAt and updatedAt fields

const Messege = mongoose.model('Messege',messegeSchema);

export default Messege;