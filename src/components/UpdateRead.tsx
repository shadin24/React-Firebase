import React, { useState } from "react";
import app from "../firebase";
import { getDatabase, ref, get,remove } from "firebase/database";
import { useNavigate } from "react-router-dom";

interface Fruit {
    fruits: string;
    price: number;
    fruitId?: string;
}

function UpdateRead() {
    const navigate = useNavigate();
    const [fruitArray, setFruitArray] = useState<Fruit[]>([]);

    const fetchData = async () => {
        const db = getDatabase(app);
        const fruitRef = ref(db, "nature/fruits");
        const snapshot = await get(fruitRef);

        if (snapshot.exists()) {
            const myData = snapshot.val();
            const tempArray = Object.keys(myData).map((myFiredId) => {
                return {
                    ...myData[myFiredId],
                    fruitId: myFiredId,
                };
            });

            setFruitArray(tempArray);
        } else {
            alert("Error");
        }
    };

    const deleteFruit = async (fruitId?: string) => {
        
            const db = getDatabase(app);
            const fruitRef = ref(db, `nature/fruits/${fruitId}`);
            await remove(fruitRef);
            window.location.reload();

         
    
        
    };

    return (
        <div>
            <h1>Update Page</h1>
            <button onClick={fetchData}>Display Data</button>
            <ul>
                {fruitArray.map((item, index) => (
                    <li key={index}>
                        {item.fruits}: {item.price}: {item.fruitId}
                        <button className="button1" onClick={() => navigate(`/UpdateWrite/${item.fruitId}`)}> Update</button>
                        <button className="button1" onClick={() => deleteFruit(item.fruitId)}> Delete</button>
                    </li>
                ))}
            </ul>
            <button className="button1" onClick={() => navigate("/")}>GO HOMEPAGE</button>
            <button className="button1" onClick={() => navigate("/read")}>GO READ PAGE</button>
        </div>
    );
}

export default UpdateRead;
