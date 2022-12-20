import React, { useState } from 'react';

export default function DataLists(props) {
  const [userInput, setUserInput] = useState("");
  const itemsList = props.items;
 
  function onInputChange(e) {
    setUserInput(e.target.value);
  }

  function getUserInput() {
    return props.setOption(userInput);
  }
  
  return (
    <>
      <div>
        <input
          list={props.list}
          type={props.type}
          className={props.className}
          placeholder={props.placeHolder}
          onChange={onInputChange}
          value={userInput}
        />
        <datalist id={props.list} className="dataList">
          {itemsList.map((item) => <option key={item.name.toString()}>{item.name}</option>)}
        </datalist>
        <button className={props.btnClass} onClick={getUserInput}>Submit</button>
      </div>
    </>
  );
}