'use client'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { checkcre } from '../../../../actions/server';

const TagInput = ({params}) => {
  const [inputValue, setInputValue] = useState('');
  const [tags, setTags] = useState([]);
  const [dat, setDat] = useState(false);
  const [h, setH] = useState(true);
  const route = useRouter();
    useEffect(() => {
    if(!sessionStorage.getItem('uid')){
      route.push('/')
    }
    
    async function fetchData() {
      const res = await checkcre(params.slug.split('_')[0], params.slug.split('_')[1], sessionStorage.getItem('uid'))
      if(!res){
        route.push('/CreateClass')
      }
      const response = await fetch("/api/addsub");
      const data = await response.json();
      data.map(dats => {
          
          if(dats.section ==  params.slug.split('_')[1] && dats.name ==  params.slug.split('_')[0]){
              setDat(dats);
              console.log(dats)
          }
      })
    }
    fetchData();
  }, [h]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleNextButtonClick = () => {
    if (inputValue.trim() !== '') {
      setTags([...tags, inputValue.trim()]);
      setInputValue('');
    }
  };

  const handleTagRemove = (index) => {
    const updatedTags = [...tags];
    updatedTags.splice(index, 1);
    setTags(updatedTags);
  };

  const handleSubmit = async () => {
    const response = await fetch("/api/addsub", {
        next : {revalidate : 10},
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({tag : tags, name : params.slug.split('_')[0], section :  params.slug.split('_')[1]}),
      });
      const data = await response.json()
      if(data.work == "Done"){
        console.log('Added Subject')
        setH(!h)
      }
      else{
        console.error("User Exists");
      }
    console.log('Final Tags:', tags);
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4 bg-white rounded-md p-7 h-screen w-screen">
      <div className="flex flex-wrap items-center">
        {dat && dat.subjects.map((dats, index) => (
          <div key={index} className="flex items-center justify-center bg-blue-500 rounded-full px-3 py-1 m-1 border-blue-800">
            <span className="mr-2 text-white text-center flex items-center justify-center">{dats}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center space-x-2">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          className="border border-gray-400 px-3 py-2 rounded-md bg-gray-100 text-gray-800 placeholder-gray-400 focus:outline-none"
          placeholder="Enter tag"
        />
        <button
          onClick={handleNextButtonClick}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Next
        </button>
      </div>
      
      <div className="flex flex-wrap items-center">
        {tags.map((tag, index) => (
          <div key={index} className="flex items-center justify-center bg-blue-500 rounded-full px-3 py-1 m-1 border-blue-800">
            <span className="mr-2 text-white text-center flex items-center justify-center">{tag}</span>
            <button onClick={() => handleTagRemove(index)} className="text-white focus:outline-none">
              <h1>&times;</h1>
            </button>
          </div>
        ))}
      </div>
      <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none"
      >
        Submit
      </button>
    </div>
  );
};

export default TagInput;

