import mon from "mongoose";
import Sta from "../models/Staff.model";
import Col1 from "../models/Student.model";
import Cla from "../models/class.model";

// Connect to MongoDB Atlas
mon
  .connect(
    "mongodb+srv://dasarinirmala110:Nl6E1dNdl6ERFPlF@asynccluster.cuqbtxk.mongodb.net/Async?retryWrites=true&w=majority"
  )
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("Error connecting to MongoDB Atlas:", err));

export async function GET() {
  try {
    const cla = await Sta.find();
    console.log(cla);
    return Response.json(cla);
  } catch (error) {
    console.error("Error fetching data:", error);
    return Response.error(500, "Internal Server Error");
  }
}

export async function POST(req) {
  const { cla, section, name } = await req.json();
  const check = await Cla.find({ name: cla, section: section });
  console.log(check.length);
  if (check.length == 0) {
    await Cla.create({
      name: cla,
      section: section,
      others: {
        Creator: name,
      },
      subjects: [],
    });
    await Sta.updateOne(
      { name: name },
      { $push: { "others.myclass": `${cla}_${section}` } }
    );
    return new Response(JSON.stringify({ work: "Done" }));
  } else {
    // console.log("HII")
    return new Response(JSON.stringify({ work: "error" }));
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
