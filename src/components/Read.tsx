import React, { useState } from "react";
import app from "../firebase";
import { getDatabase, ref, get } from "firebase/database";
import { useNavigate } from "react-router-dom";


interface Fruit {
    fruits: string;
    price: number;
}


function Read() {
    const navigate = useNavigate()
    const[fruitArray,setFruitArray] = useState<Fruit[]>([])
    const fetchdata = async ()=>{

        const db = getDatabase(app)
        const fruitRef = ref(db,"nature/fruits")
        const snapshot = await get(fruitRef)

        if(snapshot.exists()){
            setFruitArray(Object.values(snapshot.val()))
        }
        else{
            alert("Error")
        }

    }



  return (
    <div>
        <h1>Read Page</h1>
        <button onClick={fetchdata}>Display Data</button>
        <ul>
            {fruitArray.map((items ,index)=>{
                return <li key={index}>{items.fruits}:{items.price}</li>
            })}
        </ul>
        <button className="button1" onClick={()=>navigate("/")}> GO HOMEPAGE</button>
      <button className="button1" onClick={()=>navigate("/UpdateRead")}> GO UPDATE PAGE</button>
    </div>
  )
}

export default Read;
