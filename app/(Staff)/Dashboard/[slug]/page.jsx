"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  checksub,
  getstu,
  saddatt,
  scheckGlo,
} from "../../../../actions/server";
import Navbar from "../../../../components/Navbar";

export default function page({ params }) {
  const [cla, setCla] = useState("");
  const [sec, setSec] = useState("");
  const [k, setK] = useState("");
  const [sub, setSub] = useState("");
  const [opt, setOpt] = useState(false);
  const [glo, setGlo] = useState("");
  // const [submit, setSubmit] = useState({});
  const route = useRouter();

  const today = new Date(); // Get today's date
  const lastTwoDays = [formatDate(today)]; // Initialize array with today's date
  // const data = ["VARSHITH", "VINI", "TOXIC", "MONKEY"];
  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Add leading zero if needed
    const day = String(date.getDate()).padStart(2, "0"); // Add leading zero if needed
    return `${year}-${month}-${day}`;
  }

  for (let i = 1; i <= 2; i++) {
    const prevDay = new Date();
    prevDay.setDate(today.getDate() - i);
    lastTwoDays.unshift(formatDate(prevDay)); // Add to the beginning of the array
  }
  const [f, setF] = useState(lastTwoDays);
  function handleselect(e) {
    setOpt(e.target.value);
    setGlo("");
    console.log(e.target.value);
  }

  async function run() {
    const id = params.slug;

    let Cla = id.split("_")[0];
    let Sec = id.split("_")[1];
    let Sub = id.split("_")[2];
    const boo = await checksub(Cla, Sec, Sub, sessionStorage.getItem("uid"));
    if (!boo) {
      route.push("/Dashboard");
      return;
    }
    const { students, final } = await getstu(Cla, Sec, Sub);
    try {
      setK(Object.keys(students).sort());
    } catch (error) {
      if (error instanceof TypeError) {
        return setK(["NO Students"]);
      }
    }
    setCla(Cla);
    setSub(Sub);
    setSec(Sec);
    const filteredF = f.filter((item) => !final.includes(item));
    setOpt(filteredF[0]);
    setF(filteredF);
  }


  useEffect(()=>{
      if(!sessionStorage.getItem('uid')){
        route.push('/')
      }
      run()
  }, [])
  async function addatt() {
    if (opt) {
      let temp = {};
      k.map((ks, index) => {
        let inp = document.querySelector(`#id${index}`).value;
        temp[ks] = inp;
      });
      await saddatt(cla, sec, sub, opt, temp, glo);
      run()
      setGlo('')
      k.map((ks, index) => {
        document.querySelector(`#id${index}`).value = '';
      });
      
    }
  }
  async function checkGlo(e) {
    setGlo(e.target.value);
    const res = await scheckGlo(cla, sec, opt);
    // console.log(res, res + e.target.value)
    if (8 - (parseInt(res) + parseInt(e.target.value)) < 0) {
      // console.log(8 - res);
      setGlo("");
    }
  }
  return (
    
    <div className="dashbg set gap-8 h-screen w-screen bg-white headmainatt">
      <Navbar/>
      <div className="dashmain2 set gap-6 sigma">

      <div className="headatt set gap-3">
        <div className="set gap-6">
          <div className="input-group">
            <input
              type="text"
              onChange={checkGlo}
              value={glo}
              className="border border-black"
              placeholder="Total Classes"
              />
          </div>
          {f && f.length > 0 ? (
            <>
              
              <select
                className="border border-gray-600 bg-gray-800 text-white px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
                onChange={handleselect}
                >
                {f.map((fs) => {
                  return (
                    <option className="hover:bg-gray-600" value={fs} key={fs}>
                      {fs}
                    </option>
                  );
                })}
              </select>
            </>
          ) : (
            <div>Upto Date!!</div>
            )}
        </div>
      </div>
      <div>
        {k && k.length > 0 ? (
          <table className="bg-gray-900 text-white border-collapse border border-gray-800">
            <thead>
              <tr className="bg-red-500">
                <th className="border border-gray-800 px-4 py-2">Name</th>
                <th className="border border-gray-800 px-4 py-2">Attendance</th>
              </tr>
            </thead>
            <tbody>
              {k.map((ks, index) => (
                <>
                <tr key={ks} className="border border-gray-800">
                  <td className="border border-gray-800 px-4 py-2">{ks}</td>
                  <td className="border border-gray-800 px-4 py-2">
                    <input
                      type="text"
                      className="bg-gray-800 text-white p-2 rounded focus:outline-none"
                      id={`id${index}`}
                      placeholder="Enter attendance"
                      />
                  </td>
                </tr>
                      </>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="dashbg set">
            <div class="loader1">
              <div class="loader-square"></div>
              <div class="loader-square"></div>
              <div class="loader-square"></div>
              <div class="loader-square"></div>
              <div class="loader-square"></div>
              <div class="loader-square"></div>
              <div class="loader-square"></div>
            </div>
          </div>
        )}
      </div>
      <div>
        {/* <button class="button type1 text-center border-white outline-white">
  <span class="btn-txt set text-center text-white" onClick={addatt1}>Submit</span>
</button> */}

        <button type="button" class="button" onClick={addatt}>
          <span class="button__text">Post</span>
          <span class="button__icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke-linejoin="round"
              stroke-linecap="round"
              stroke="currentColor"
              height="24"
              fill="none"
              class="svg"
              >
              <line y2="19" y1="5" x2="12" x1="12"></line>
              <line y2="12" y1="12" x2="19" x1="5"></line>
            </svg>
          </span>
        </button>
      </div>
      {/* <button onClick={addatt}>Submit Attendence</button> */}
      </div>
    </div>

    // <div>
    // {k && k.length > 0 ? (
      //   k.map((ks) => {
        //     return <div key={ks}>{ks}</div>;
    //   })
    // ) : (
      //   <div className="loader"></div>
      // )}
      // </div>
      );
    }
    