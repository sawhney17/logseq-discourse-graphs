import React, { FC, useEffect, useState } from 'react';
import { render } from "react-dom";
import { returnedQuery, returnQueries } from './utils';
const QueryFormat = () =>{
  const [sections, setSections] = useState([])
  const [responses, setResponses] = useState(null);


  useEffect(() => {
    returnQueries().then((queries) => {
      setSections(queries)
    })
    }, [])

  return (
    <div className='grid grid-cols-4'>
      <div className='col-span-1 w-full h-full bg-black'>
        <div className="">
          {
             sections.map((section, index) => {
              if (section.value.length != 0){
              console.log(sections)
              return (
                <div className='p-2'>
                  <button onClick={() => { setResponses(index) }}>{section.connection}</button>
                </div>
              )
            }
            })
          }
          {/* {console.log(sections2)}
          {console.log("sections2")} */}
          {/* <label>{somethignselse}</label> */}
        </div>
      </div>
      <div className='col-span-3'>
        <div>
          {
            responses == null ? "Check out Discourse Connections here!" :
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