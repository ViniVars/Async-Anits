import mon from 'mongoose';
import Col from './models/Staff.model';
import Stu from './models/Student.model';
import Cla from './models/class.model';

// Connect to MongoDB Atlas
mon.connect('mongodb+srv://dasarinirmala110:Nl6E1dNdl6ERFPlF@asynccluster.cuqbtxk.mongodb.net/Async?retryWrites=true&w=majority')
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Error connecting to MongoDB Atlas:', err));

export async function GET() {
    try {
        const staffData = await Col.find();

        // const studentData = await Col1.find();

        // Return the fetched data as JSON response
        return Response.json(staffData);
    } catch (error) {
        // Handle any errors that occur during database operations
        console.error("Error fetching data:", error);
        return Response.error(500, "Internal Server Error");
    }
}


export async function POST(req) {
    const { name, id, pass } = await req.json();
    var check
    if(id == 'Stu'){
        console.log('Stu')
        check = await Stu.find({name : name});
    }
    else{
        console.log('Col')
        check = await Col.find({name : name, password : pass});
    }
    console.log(check.length)
    if(check.length == 1){

        return new Response(JSON.stringify({work : 'Done'}));
            }
    else{
        console.log("HII")
        return new Response(JSON.stringify({work : 'World'}));
    }
}
// export async function POST(req) {
//     const { input } = await req.json();
//     console.log(input);
//     // await Col.create({name : 'ramen', email : {}})

//     // Fix the typo: 'email.OS' should be 'email.Os'
//     await Col.updateOne(
//         { name: input },
//         { 
//             // $setOnInsert: { 'email.Cns': {} }, // Change 'email.OS' to 'email.Os'
//             $set: { 'email.Os': 'Good Lord' } // Change 'email.Os' to 'email.OS' or keep it as 'email.Os' if that's the intended field name
//         }
//     );

//     return new Response({ status: 200, headers: { 'Content-Type': 'application/json' } });
// }


