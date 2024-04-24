'use client'
import React, { useEffect, useState } from "react";
import { sgetatt, seasub } from "../../../actions/server";
import Navbar from "../../../components/Navbar";
import { useRouter } from "next/navigation";

export default function Page() {
  const [a, setA] = useState(false);
  const [k, setK] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const route = useRouter();

  useEffect(()=>{
      if(!sessionStorage.getItem('uid')){
        route.push('/')
      }
  })
  async function getstuatt() {
    console.log(selectedOption, input1, input2);
    const res = await sgetatt(selectedOption, input1, input2);
    setA(res);
    setK(Object.keys(res).sort());
  }

  const handleDropdownChange = (e) => {
    console.log(e.target.value);
    setSelectedOption(e.target.value);
  };

  const handleInputChange1 = (e) => {
    setInput1(e.target.value);
    setK(false)
    setDropdownOptions(false)
    getDropdownOptions(e.target.value, input2);
  };

  const handleInputChange2 = (e) => {
    setInput2(e.target.value);
    setK(false)
    setDropdownOptions(false)
    getDropdownOptions(input1, e.target.value);
  };

  const getDropdownOptions = async (value1, value2) => {
    if (value1 && value2) {
      const res = await seasub(value1, value2);
      try {
        res.unshift("OverAll");
        setDropdownOptions(res);
        setSelectedOption(res[0]);
      } catch (error) {
        return;
      }
    }
  };

  return (
    <div className="dark:bg-gray-800 h-screen w-screen py-10 dashbg set">
      <Navbar/>
      <div className="dashmain2 overflow-x-auto">

      <div className="input-group inpgrp flex flex-col items-center justify-center space-y-4">
        <input
          type="text"
          value={input1}
          onChange={handleInputChange1}
          placeholder="Enter Class"
          className="border border-gray-300 px-3 py-2 rounded-md"
          />
        <input
          type="text"
          value={input2}
          onChange={handleInputChange2}
          placeholder="Enter Section"
          className="border border-gray-300 px-3 py-2 rounded-md"
          />
        <select
  onChange={handleDropdownChange}
  className="border border-gray-600 bg-gray-800 text-white px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
>
  {dropdownOptions.length > 0 ? (
    dropdownOptions.map((option, index) => (
      <option   className="hover:bg-gray-600" key={index} value={option || "No Options"}>
        {option}
      </option>
    ))
    ) : (
      <option value="No Options">No Options</option>
      )}
</select>

<button type="button" class="button" onClick={getstuatt}>
          <span class="button__text">Get Details</span>
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
        {/* <button onClick={addsub}>Submit</button> */}
      </div>
      <div className="mt-8 flex justify-center align-middle">
        {k ? (
          <table className="dark:text-white border border-gray-300">
            <thead>
              <tr className="bg-red-500 text-white">
                <th className="px-4 py-2">Student ID</th>
                <th className="px-4 py-2">Attended Classes</th>
                <th className="px-4 py-2">Total Classes</th>
                <th className="px-4 py-2">Percentage(%)</th>
              </tr>
            </thead>
            <tbody>
              {k.map((ks) => (
                <>
                <tr key={ks}>
                  <td className="border px-4 py-2 flex justify-center align-middle">{ks}</td>
                  <td className="border px-4 py-2 text-center">
                    {selectedOption !== "OverAll"
                      ? a[ks].subjects[selectedOption].AC
                      : a[ks].AC}
                  </td>
                  <td className="border px-4 py-2 flex justify-center align-middle">
                    {selectedOption !== "OverAll"
                      ? a[ks].subjects[selectedOption].TC
                      : a[ks].TC}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {selectedOption !== "OverAll"
                      ? (
                        ((a[ks].subjects[selectedOption].AC) / (a[ks].subjects[selectedOption].TC)
                        ) * 100).toFixed(2)
                      : (((a[ks].AC) / (a[ks].TC)) * 100).toFixed(2)}
                  </td>
                </tr>
                        </>
              ))}
            </tbody>
          </table>
        ) : (
          <div>Loading....</div>
          )}
      </div>
    </div>
          </div>
  );
}
