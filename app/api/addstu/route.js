import mon from 'mongoose';
import Col from '../models/Staff.model';
import Stu from '../models/Student.model';
import Cla from '../models/class.model';

// Connect to MongoDB Atlas
mon.connect('mongodb+srv://dasarinirmala110:Nl6E1dNdl6ERFPlF@asynccluster.cuqbtxk.mongodb.net/Async?retryWrites=true&w=majority')
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Error connecting to MongoDB Atlas:', err));


export async function POST(req) {
    const { cla,  section, name } = await req.json();
    console.log(cla , section, name)
    const {subjects} = await Cla.findOne({name : cla, section : section});
    // console.log("Sub", subjects);
    subjects.map( async sub => {
        await Cla.updateOne({name : cla, section : section}, {$set : {[`students.${name}.subjects.${sub}`] : {AC : 0, TC : 0}, [`students.${name}.TC`] : 0,[`students.${name}.AC`] : 0  }});
    })
    await Stu.create({name : name, password : `${cla}_${section}`})
    return new Response(JSON.stringify({work : 'Done'}));

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


