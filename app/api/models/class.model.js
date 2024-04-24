import { Schema, model } from 'mongoose';

// Define the schema
const userSchema = new Schema({
   name: String,
   section: String,
    others : Object,
    students : Object,
    subjects : Object,
});

// let User = model('Class') || model('Class', userSchema) ;
// let User = model('Class', userSchema) || model('Class');
// let User

// // Check if the model has already been declared
if (!modelAlreadyDeclared()) {
    // Create the model
    var User = model('Class', userSchema);
}

// Function to check if the model has already been declared
function modelAlreadyDeclared() {
    try {
        // Try to access the model, will throw an error if not declared
        User = model('Class');
        return true;
    } catch (error) {
        return false;
    }
}
export default User;
