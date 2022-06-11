import React, { useEffect, useState } from 'react';
import { render } from "react-dom";
import { returnQueries } from './utils';

const QueryFormat = () => {
  useEffect(() => {
    returnQueries().then(queries => {
      console.log("hi")
      setSections(queries)
      //   queries.map(query => {
      // })
    })
  }, []);

  const [sections, setSections] = useState([]);
  const [responses, setResponses] = useState(null);
  useEffect(() => { console.log(sections, responses) }, [sections, responses])
  return (
    <div className='grid grid-cols-4'>
      <div className='col-span-1 w-full h-full bg-black'>
        <div className="">
          {
            sections.map((section, index) => {
              console.log(section)
              return (
                <div className='p-2'>
                  <button onClick={() => { setResponses(index) }}>{section.connection}</button>
                </div>
              )
            })
          }
        </div>
      </div>
      <div className='col-span-3'>
        <div>
          {
            responses == null ? "This message is for you" :
             sections[responses].value.map(
              (response, index) => { 
                return <button onClick={()=>{logseq.App.pushState('page', response)}} className='block'>{response.name}</button> 
              })
          }

        </div>
      </div>
    </div>
  )
};

export default QueryFormat;