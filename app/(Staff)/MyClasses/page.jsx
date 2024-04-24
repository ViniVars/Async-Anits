"use client";
import React, { useEffect, useState } from "react";
import { getstaff, saddsub, scla, seasub } from "../../../actions/server";
import Navbar from "../../../components/Navbar";
import { useRouter } from "next/navigation";
export default function page() {
  var subjects = 0;
  const [k, setK] = useState(false);
  const [sub, setSub] = useState(false);
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [dropdownOptionsSub, setDropdownOptionsSub] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedOptionSub, setSelectedOptionSub] = useState("");

  async function run() {
    subjects = await scla(sessionStorage.getItem("uid"));
    setSub(subjects);
    setK(Object.keys(subjects));
    let staff = await getstaff()
    setDropdownOptionsSub(staff);
    setSelectedOptionSub(staff[0].uid)
    // console.log(staff[0].uid)
  }
  const route = useRouter();

  useEffect(() => {
    if (!sessionStorage.getItem("uid")) {
      route.push("/");
    }
    run();
  }, []);
  async function addsub() {
    if (selectedOption) {
      await saddsub(
        selectedOption,
        // sessionStorage.getItem("uid"),
        selectedOptionSub,
        input1,
        input2,
      );
      // run();
    }
  }

  const handleDropdownChange = (e) => {
    console.log(e.target.value);
    setSelectedOption(e.target.value);
  };

  const handleDropdownChangeSub = (e) => {
    console.log(e.target.value);
    setSelectedOptionSub(e.target.value);
  };

  const handleInputChange1 = (e) => {
    setInput1(e.target.value);
    getDropdownOptions(e.target.value, input2);
  };

  const handleInputChange2 = (e) => {
    setInput2(e.target.value);
    getDropdownOptions(input1, e.target.value);
  };

  const getDropdownOptions = async (value1, value2) => {
    // Logic to generate options based on inputs
    if (value1 && value2) {
      const res = await seasub(value1, value2);
      console.log(res);
      setDropdownOptions(res);
      setSelectedOption(res[0]);
    }
  };
  return (
    <div className="dashbg set">
      <Navbar />
      <div className="dashmain2">
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
                <option
                  className="hover:bg-gray-600"
                  key={index}
                  value={option || "No Options"}
                >
                  {option}
                </option>
              ))
            ) : (
              <option value="No Options">No Class</option>
            )}
          </select>
          <select
            onChange={handleDropdownChangeSub}
            className="border border-gray-600 bg-gray-800 text-white px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
          >
            {dropdownOptionsSub.length > 0 ? (
              dropdownOptionsSub.map((option, index) => (
                <option
                  className="hover:bg-gray-600"
                  key={index}
                  id={option.uid}
                  value={option.name || "No Options"}
                >
                  {option.name} ( {option.uid})
                </option>
              ))
            ) : (
              <option value="No Options">Not assigned</option>
            )}
          </select>

          <button type="button" class="button" onClick={addsub}>
            <span class="button__text">Add Sub</span>
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
        <div className="cardmaincov">
          {k ? (
            k.map((ks) => {
              return (
                <div className="card work" key={ks}>
                  <div className="img-section">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="77"
                      width="76"
                    >
                      <path
                        fill-Rule="nonzero"
                        fill="#3F9CBB"
                        d="m60.91 71.846 12.314-19.892c3.317-5.36 3.78-13.818-2.31-19.908l-26.36-26.36c-4.457-4.457-12.586-6.843-19.908-2.31L4.753 15.69c-5.4 3.343-6.275 10.854-1.779 15.35a7.773 7.773 0 0 0 7.346 2.035l7.783-1.945a3.947 3.947 0 0 1 3.731 1.033l22.602 22.602c.97.97 1.367 2.4 1.033 3.732l-1.945 7.782a7.775 7.775 0 0 0 2.037 7.349c4.49 4.49 12.003 3.624 15.349-1.782Zm-24.227-46.12-1.891-1.892-1.892 1.892a2.342 2.342 0 0 1-3.312-3.312l1.892-1.892-1.892-1.891a2.342 2.342 0 0 1 3.312-3.312l1.892 1.891 1.891-1.891a2.342 2.342 0 0 1 3.312 3.312l-1.891 1.891 1.891 1.892a2.342 2.342 0 0 1-3.312 3.312Zm14.19 14.19a2.343 2.343 0 1 1 3.315-3.312 2.343 2.343 0 0 1-3.314 3.312Zm0 7.096a2.343 2.343 0 0 1 3.313-3.312 2.343 2.343 0 0 1-3.312 3.312Zm7.096-7.095a2.343 2.343 0 1 1 3.312 0 2.343 2.343 0 0 1-3.312 0Zm0 7.095a2.343 2.343 0 0 1 3.312-3.312 2.343 2.343 0 0 1-3.312 3.312Z"
                      ></path>
                    </svg>
                  </div>
                  <div className="card-desc">
                    <div className="card-header">
                      <div className="card-title">Subject : </div>
                      <div className="card-menu">
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                      </div>
                    </div>
                    <div className="card-time">{sub[ks].toUpperCase()}</div>
                    <p className="recent">
                      {ks.split("_")[0]}
                      {ks.split("_")[1]}
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="dashmain1 set">
              <div class="loader"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
