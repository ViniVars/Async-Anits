"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getmycla } from "../../../actions/server";
import Link from "next/link";
import Navbar from "../../../components/Navbar";

export default function page() {
  const [dat, setDat] = useState([]);
  const [h, setH] = useState(true);
  const route = useRouter();

  useEffect(() => {
    if (!sessionStorage.getItem("uid")) {
      route.push("/");
    }
    async function fetchData() {
      const response = await getmycla();
      // const response = await getmycla(sessionStorage.getItem("uid"));
      console.log(response)
      if (response) {
        setDat(response);
      }
      // const response = await fetch("/api/creclass");
      // const data = await response.json();
    }
    fetchData();
  }, [h]);

  // async function addStu(e){
  //   route.push(`/CreateClass/${e.target.id}`)
  // }

  async function create() {
    // setH(0)
    let name = document.querySelector(".name").value;
    let section = document.querySelector(".section").value;
    const response = await fetch("/api/creclass", {
      next: { revalidate: 10 },
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cla: name,
        section: section,
        name: sessionStorage.getItem("uid"),
      }),
    });
    const data = await response.json();
    if (data.work == "Done") {
      console.log("Class Created");
      setH(!h);
    } else {
      console.log("Fk yOU");
    }
  }
  return (
    <>
      <div className="dashbg set">
        <Navbar />
        <div className="dashmain2">
          <div className="input-group inpgrp flex flex-col items-center justify-center space-y-4">
            <input
              type="text"
              // value={input1}
              // onChange={handleInputChange1}
              placeholder="Enter Class"
              className="border border-gray-300 px-3 py-2 rounded-md name"
            />
            <input
              type="text"
              // value={input2}
              // onChange={handleInputChange2}
              placeholder="Enter Section"
              className="border border-gray-300 px-3 py-2 rounded-md section"
            />
            <button type="button" class="button" onClick={create}>
              <span class="button__text">Create</span>
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
            {dat ? (
              dat.map((dats) => {
                return (
                  <Link key={dats.id} id={dats.id} href={`CreateClass/${dats.name}_${dats.section}`}>
                  <div className="card work">
                    <div className="img-section">
                      <svg xmlns="http://www.w3.org/2000/svg" height="77" width="76">
                        <path
                          fillRule="nonzero"
                          fill="#3F9CBB"
                          d="m60.91 71.846 12.314-19.892c3.317-5.36 3.78-13.818-2.31-19.908l-26.36-26.36c-4.457-4.457-12.586-6.843-19.908-2.31L4.753 15.69c-5.4 3.343-6.275 10.854-1.779 15.35a7.773 7.773 0 0 0 7.346 2.035l7.783-1.945a3.947 3.947 0 0 1 3.731 1.033l22.602 22.602c.97.97 1.367 2.4 1.033 3.732l-1.945 7.782a7.775 7.775 0 0 0 2.037 7.349c4.49 4.49 12.003 3.624 15.349-1.782Zm-24.227-46.12-1.891-1.892-1.892 1.892a2.342 2.342 0 0 1-3.312-3.312l1.892-1.892-1.892-1.891a2.342 2.342 0 0 1 3.312-3.312l1.892 1.891 1.891-1.891a2.342 2.342 0 0 1 3.312 3.312l-1.891 1.891 1.891 1.892a2.342 2.342 0 0 1-3.312 3.312Zm14.19 14.19a2.343 2.343 0 1 1 3.315-3.312 2.343 2.343 0 0 1-3.314 3.312Zm0 7.096a2.343 2.343 0 0 1 3.313-3.312 2.343 2.343 0 0 1-3.312 3.312Zm7.096-7.095a2.343 2.343 0 1 1 3.312 0 2.343 2.343 0 0 1-3.312 0Zm0 7.095a2.343 2.343 0 0 1 3.312-3.312 2.343 2.343 0 0 1-3.312 3.312Z"
                        ></path>
                      </svg>
                    </div>
                    <div className="card-desc">
                      <div className="card-header">
                        <div className="card-title">You Created :</div>
                        <div className="card-menu">
                          <div className="dot"></div>
                          <div className="dot"></div>
                          <div className="dot"></div>
                        </div>
                      </div>
                      <div className="card-time">{dats.name} {dats.section}</div>
                      <p className="recent">Click to add Subjects</p>
                    </div>
                  </div>
                </Link>
                );
              })
            ) : (
              <div className="dashmain1 set">
                <div class="loader"></div>
              </div>
            )}
            {/* {dat ? (
              dat.map((dats) => {
                return (
                  <Link key={dats} id={dats} href={`CreateClass/${dats.split('_')[0]}_${dats.split('_')[1]}`}>
                  <div className="card work">
                    <div className="img-section">
                      <svg xmlns="http://www.w3.org/2000/svg" height="77" width="76">
                        <path
                          fillRule="nonzero"
                          fill="#3F9CBB"
                          d="m60.91 71.846 12.314-19.892c3.317-5.36 3.78-13.818-2.31-19.908l-26.36-26.36c-4.457-4.457-12.586-6.843-19.908-2.31L4.753 15.69c-5.4 3.343-6.275 10.854-1.779 15.35a7.773 7.773 0 0 0 7.346 2.035l7.783-1.945a3.947 3.947 0 0 1 3.731 1.033l22.602 22.602c.97.97 1.367 2.4 1.033 3.732l-1.945 7.782a7.775 7.775 0 0 0 2.037 7.349c4.49 4.49 12.003 3.624 15.349-1.782Zm-24.227-46.12-1.891-1.892-1.892 1.892a2.342 2.342 0 0 1-3.312-3.312l1.892-1.892-1.892-1.891a2.342 2.342 0 0 1 3.312-3.312l1.892 1.891 1.891-1.891a2.342 2.342 0 0 1 3.312 3.312l-1.891 1.891 1.891 1.892a2.342 2.342 0 0 1-3.312 3.312Zm14.19 14.19a2.343 2.343 0 1 1 3.315-3.312 2.343 2.343 0 0 1-3.314 3.312Zm0 7.096a2.343 2.343 0 0 1 3.313-3.312 2.343 2.343 0 0 1-3.312 3.312Zm7.096-7.095a2.343 2.343 0 1 1 3.312 0 2.343 2.343 0 0 1-3.312 0Zm0 7.095a2.343 2.343 0 0 1 3.312-3.312 2.343 2.343 0 0 1-3.312 3.312Z"
                        ></path>
                      </svg>
                    </div>
                    <div className="card-desc">
                      <div className="card-header">
                        <div className="card-title">You Created :</div>
                        <div className="card-menu">
                          <div className="dot"></div>
                          <div className="dot"></div>
                          <div className="dot"></div>
                        </div>
                      </div>
                      <div className="card-time">{dats.split('_')[0]} {dats.split('_')[1]}</div>
                      <p className="recent">Click to add Subjects</p>
                    </div>
                  </div>
                </Link>
                );
              })
            ) : (
              <div className="dashmain1 set">
                <div class="loader"></div>
              </div>
            )} */}
          </div>
        </div>
      </div>

      {/* {dat.length > 0 ? (
        dat.map((dats) => {
          return (
            <Link key={dats} id={dats} href={`CreateClass/${dats.split('_')[0]}_${dats.split('_')[1]}`}>
        <div className="card work">
          <div className="img-section">
            <svg xmlns="http://www.w3.org/2000/svg" height="77" width="76">
              <path
                fillRule="nonzero"
                fill="#3F9CBB"
                d="m60.91 71.846 12.314-19.892c3.317-5.36 3.78-13.818-2.31-19.908l-26.36-26.36c-4.457-4.457-12.586-6.843-19.908-2.31L4.753 15.69c-5.4 3.343-6.275 10.854-1.779 15.35a7.773 7.773 0 0 0 7.346 2.035l7.783-1.945a3.947 3.947 0 0 1 3.731 1.033l22.602 22.602c.97.97 1.367 2.4 1.033 3.732l-1.945 7.782a7.775 7.775 0 0 0 2.037 7.349c4.49 4.49 12.003 3.624 15.349-1.782Zm-24.227-46.12-1.891-1.892-1.892 1.892a2.342 2.342 0 0 1-3.312-3.312l1.892-1.892-1.892-1.891a2.342 2.342 0 0 1 3.312-3.312l1.892 1.891 1.891-1.891a2.342 2.342 0 0 1 3.312 3.312l-1.891 1.891 1.891 1.892a2.342 2.342 0 0 1-3.312 3.312Zm14.19 14.19a2.343 2.343 0 1 1 3.315-3.312 2.343 2.343 0 0 1-3.314 3.312Zm0 7.096a2.343 2.343 0 0 1 3.313-3.312 2.343 2.343 0 0 1-3.312 3.312Zm7.096-7.095a2.343 2.343 0 1 1 3.312 0 2.343 2.343 0 0 1-3.312 0Zm0 7.095a2.343 2.343 0 0 1 3.312-3.312 2.343 2.343 0 0 1-3.312 3.312Z"
              ></path>
            </svg>
          </div>
          <div className="card-desc">
            <div className="card-header">
              <div className="card-title">You Created :</div>
              <div className="card-menu">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </div>
            </div>
            <div className="card-time">{dats.split('_')[0]} {dats.split('_')[1]}</div>
            <p className="recent">Click to add Subjects</p>
          </div>
        </div>
      </Link>
            // <div onClick={addStu} id={`${dats.split('_')[0]}_${dats.split('_')[1]}`}>
            //   {dats.split('_')[0]}
            //   {dats.split('_')[1]}
            // </div>
          );
        })
      ) : (
        <div>Connecting To Server....</div>
      )}
      <div className="input-group">
        <input type="text" className="name c1" />
        <input type="text" className="section c1" />
        <button onClick={create}>Submit</button>
      </div> */}
    </>
  );
}
