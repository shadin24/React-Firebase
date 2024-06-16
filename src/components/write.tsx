import React, { useState } from "react";
import app from "../firebase";
import { getDatabase, ref, set, push } from "firebase/database";
import { useNavigate } from "react-router-dom";


const Write: React.FC = () => {
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");

  const saveData = async () => {
    const db = getDatabase(app);
    const newDocRef = push(ref(db, "nature/fruits"));
    set(newDocRef, {
      fruits: input1,
      price: input2,
    })
      .then(() => alert("Value Entered  Succsssed"))
      .catch((error) => {
        alert("error :" +error.message);
      });
  };

  const handlechange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput1(e.target.value);
  };
  const handlechange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput2(e.target.value);
  };
  const navigate = useNavigate()

  return (
    <div className="">
      <h1>Write Page</h1>
      <input type="text" value={input1} onChange={handlechange1} />
      <input type="text" value={input2} onChange={handlechange2} />
      <button onClick={saveData}>Save Data</button>

      <button className="button1" onClick={()=>navigate("/")}> GO HOMEPAGE</button>
      <button className="button1" onClick={()=>navigate("/Read")}> GO READ PAGE</button>
    </div>
  );
};

export default Write;
