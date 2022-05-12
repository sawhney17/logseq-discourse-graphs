import React, { useState } from "react";
import { ReactDOM } from "react";


const DiscourseContext=  () => {
    //create usestate to track items in a list
    const [items, setItems] = useState(["Click Number: 0"]);
    const [clickCount, setClickCount] = useState(1);

      return (
          <div>
        <button onClick={()=>{
            let items2 = items
            setClickCount(clickCount+1)
            items2.push(`Click Number: ${clickCount}`)
            setItems(items2)}}><b>Discourse Context</b></button>
        {items.map(item => <div>{item}</div>)}
        </div>
      );
  }

  export default DiscourseContext;