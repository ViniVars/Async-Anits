import mon from 'mongoose';
import Col from '../models/Staff.model';
import Col1 from '../models/Student.model';

// Connect to MongoDB Atlas
mon.connect('mongodb+srv://dasarinirmala110:Nl6E1dNdl6ERFPlF@asynccluster.cuqbtxk.mongodb.net/Async?retryWrites=true&w=majority')
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Error connecting to MongoDB Atlas:', err));

  export async function POST(req){
    // const {input} = Request;
    const done = await Col.create({name : "Gojo"})
    // await done.save()
    return Response.json({"HELLO" : "BYE"})
}

