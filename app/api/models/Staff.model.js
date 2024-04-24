import { Schema, model } from 'mongoose';

// Define the schema
const userSchema = new Schema({
   name: String,
   uid: String,
    others : Object,
    details : Object,
   password: String,
    subjects : Object,
});

// let User = model('Staff') || model('Staff', userSchema) ;
// let User = model('Staff', userSchema) || model('Staff');
// let User

// // Check if the model has already been declared
if (!modelAlreadyDeclared()) {
    // Create the model
    var User = model('Staff', userSchema);
}

// Function to check if the model has already been declared
function modelAlreadyDeclared() {
    try {
        // Try to access the model, will throw an error if not declared
        User = model('Staff');
        return true;
    } catch (error) {
        return false;
    }
}
export default User;
