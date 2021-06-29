import mongoose from 'mongoose';
const LoginSchema = new mongoose.Schema({
	
	username: {type: String,
        required: true,
        unique: true},
    email:{type: String,
        required: true}, 
	password:{type: Number,
    required:true}
})
export const User= mongoose.model('Users',LoginSchema );