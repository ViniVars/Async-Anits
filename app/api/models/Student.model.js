import { Schema, model } from 'mongoose';

// Define the schema
const userSchema = new Schema({
   name: String,
   email: String,
   password: String,
   phone: Number,
   _enabled: Boolean
});

let User;

// Check if the model has already been declared
if (!modelAlreadyDeclared()) {
    // Create the model
    User = model('Student', userSchema);
}

// Function to check if the model has already been declared
function modelAlreadyDeclared() {
    try {
        // Try to access the model, will throw an error if not declared
        User = model('Student');
        return true;
    } catch (error) {
        return false;
    }
}

export default User;
