"use server";
import mon from "mongoose";
import Sta from "../app/api/models/Staff.model";
import Stu from "../app/api/models/Student.model";
import Cla from "../app/api/models/class.model";
import { Resend } from 'resend';

mon
  .connect(
    "mongodb+srv://dasarinirmala110:Nl6E1dNdl6ERFPlF@asynccluster.cuqbtxk.mongodb.net/Async?retryWrites=true&w=majority"
  )
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("Error connecting to MongoDB Atlas:", err));

const currentDate = new Date();
const year = currentDate.getFullYear();
const month = currentDate.getMonth() + 1;
const date = currentDate.getDate();
const dat = `${year}-${month < 10 ? "0" + month : month}-${
  date < 10 ? "0" + date : date
}`;

export async function scheckGlo(cla, sec, opt) {
  const { others } = await Cla.findOne({ name: cla, section: sec });
  try {
    return others.dates[opt].Gval;
  } catch (error) {
    if (error instanceof TypeError) {
      return 0;
    }
  }
}

export async function saddsub(sub, name, cla, sec) {
  const res = await Sta.updateOne(
    { name: name },
    { $set: { [`subjects.${cla}_${sec}`]: sub } }
  );
}

export async function scla(name) {
  try {
    const { subjects } = await Sta.findOne({ name: name });
    return subjects;
  } catch (error) {
    if (error instanceof TypeError) {
      return {};
    }
  }
}

export async function saddatt(cla, sec, sub, da, temp, glo) {
  let studentKeys = Object.keys(temp);
  const updatePromises = [];
  var prom;
  for (let ss of studentKeys) {
    prom = Cla.updateOne(
      { name: cla, section: sec },
      {
        $inc: {
          [`students.${ss}.AC`]: parseInt(temp[ss]),
          [`students.${ss}.TC`]: parseInt(glo),
          [`students.${ss}.subjects.${sub}.AC`]: parseInt(temp[ss]),
          [`students.${ss}.subjects.${sub}.TC`]: parseInt(glo),
        },
      }
    );
    if (parseInt(temp[ss]) != parseInt(glo)) {
      prom = Cla.updateOne(
        { name: cla, section: sec },
        {
          $inc: {
            [`others.dates.${da}.students.${ss}`]:
              parseInt(glo) - parseInt(temp[ss]),
          },
        }
      );
    }

    updatePromises.push(prom);
  }

  await Promise.all(updatePromises);

  await Cla.updateOne(
    { name: cla, section: sec },
    {
      $push: {
        [`others.dates.${da}.subjects`]: sub,
      },
      $inc: {
        [`others.dates.${da}.Gval`]: parseInt(glo),
      },
    }
  );
}

export async function getstu(cla, sec, sub) {
  const { students, others } = await Cla.findOne({ name: cla, section: sec });

  let final = [];
  try {
    const update = []
    let dates = Object.keys(others.dates);
    for (let date of dates) {
      const date1 = new Date(date);
      const differenceInMilliseconds = Math.abs(date1 - currentDate);
      const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);
      if (differenceInDays > 3) {
        const {others} = await Cla.find({name : cla, section : sec})
        // await sendmail(others);
        const prom = Cla.updateOne(
          { name: cla, section: sec },
          { $unset: { [`others.dates.${date}`]: "" } }
        );
        update.push(prom)
      } else {
        for (let ds of others.dates[date].subjects) {
          if (ds === sub) {
            final.push(date);
          }
        }
      }
    }
    await Promise.all(update)
  } catch (error) {
    if (error instanceof TypeError) {
      final = [];
    }
  }
  console.log(final);
  return { students, final };
}

export async function checksub(cla, sec, sub, name) {
  const { subjects } = await Sta.findOne({ name: name });
  console.log(cla, sec, sub, subjects);
  if (subjects[`${cla}_${sec}`] == sub) {
    return true;
  }
  return false;
}

export async function checkcre(cla, sec, name) {
  const { others } = await Cla.findOne({ name: cla, section: sec });

  if (others.Creator == name) {
    return true;
  }
  return false;
}

export async function seasub(val1, val2) {
  try {
    const { subjects } = await Cla.findOne({ name: val1, section: val2 });
    return subjects;
  } catch (error) {
    return false;
  }
}
export async function sgetatt(sub, val1, val2) {
  try {
    const { students } = await Cla.findOne({ name: val1, section: val2 });
    return students;
  } catch (error) {
    return false;
  }
}
export async function getmycla(uid) {
  try {
    const cla = await Cla.find()
    return cla;
  } catch (error) {
    return false
  }
  // try {
  //   const { others } = await Sta.findOne({ name: uid });
  //   return others.myclass;
  // } catch (error) {
  //   return false;
  // }
}


export async function sendmail(others){
  let seckey = 're_SPeypNUV_L5fdTdrPvq8SPYDPTr8nrsVZ';
const resend = new Resend(seckey);
const { data, error } = await resend.emails.send({
  from: 'ASYNC <onboarding@resend.dev>',
  to: ['dasarinirmala110@gmail.com'],
  subject: 'Hello World',
  html: '<strong>It works!</strong>',
});

if (error) {
  return console.error({ error });
}

console.log({ data });
  return data;
}


export async function getstaff(){
  return await Sta.find()
}