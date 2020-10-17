import React, { useState } from "react";

const Item = (props) => {
  return (
    <div className="block">
      <button className="btn" onClick={props.onAdd}>
        Add to cart
      </button>
    </div>
  );
}

export default function() {
  const [count, setCount] = useState(0);
  const topSectionRef = React.useRef();

  React.useEffect(()=>{
    const topSection = topSectionRef.current;

    window.addEventListener('scroll', ()=>{
      const {scrollY} = window;
      if(scrollY > 100){        
        topSection.style.position = "sticky";
        topSection.style.top = 0;
      } else {        
        topSection.style.position = "static";
      }
    })    
  },[])

  return (
    <div className="container2">
      <div className="block-wrapper">
        <div ref={topSectionRef} className="top-section">
          <i>{count}</i>
          <button
            onClick={() => {
              alert(count);
            }}
          >
            Show count
          </button>
          <button
            onClick={() => {
              setCount(0);
            }}
          >
            Reset count
          </button>
        </div>
        {Array.from('1234567890').map((item)=><Item key={item}
          onAdd={() => {
            setCount(count + 1);
          }}
        />)}        
      </div>
    </div>
  );
}
