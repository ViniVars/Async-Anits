"use client";
import React, { useEffect, useState } from "react";
import { saddsub, scla, seasub } from "../../../actions/server";
import { useRouter } from "next/navigation";
import Navbar from '../../../components/Navbar'
import Link from "next/link";
export default function page() {
  var subjects = 0;
  const [k, setK] = useState(false);
  const [sub, setSub] = useState(false);
  const route = useRouter()


  async function run() {
    subjects = await scla(sessionStorage.getItem('uid'));
    setSub(subjects);
    setK(Object.keys(subjects));
    console.log(Object.keys(subjects))
  }

 
  useEffect(() => {
    if(!sessionStorage.getItem('uid')){
      route.push('/')
    }
    run();
  }, []);

  return (
      <div className="dashbg set">
      <Navbar/>
      <div className="dashmain">

      {k ? (
  k.length > 0 ? (
    k.map((ks) => (
      <Link key={ks} id={ks} href={`Dashboard/${ks}_${sub[ks]}`}>
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
              <div className="card-title">Subject :</div>
              <div className="card-menu">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </div>
            </div>
            <div className="card-time">{sub[ks].toUpperCase()}</div>
            <p className="recent">{ks.split("_")[0]}{ks.split("_")[1]}</p>
          </div>
        </div>
      </Link>
    ))
  ) : (
    <div className="dashmain1 set">

      <h2 className='text-center text-xl'><strong className="text-3xl"> Welcome!</strong> Here You can find All Your Subjects And Add Attendence by clicking <br /> on their respective Cards..</h2>
    </div>
  )
) : (
  <div className="dashmain1 set">
    <div class="loader"></div>
  </div>
)}

      </div>
          </div>
  
  );
}
