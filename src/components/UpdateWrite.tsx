import React, { useState, useEffect } from "react";
import app from "../firebase";
import { getDatabase, ref, set, get } from "firebase/database";
import { useNavigate, useParams } from "react-router-dom";

const UpdateWrite: React.FC = () => {
    const { firebseId } = useParams<{ firebseId: string }>();

    const [input1, setInput1] = useState("");
    const [input2, setInput2] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            if (firebseId) {
                const db = getDatabase(app);
                const fruitRef = ref(db, `nature/fruits/${firebseId}`);
                const snapshot = await get(fruitRef);

                if (snapshot.exists()) {
                    const targetObject = snapshot.val();
                    setInput1(targetObject.fruits);
                    setInput2(targetObject.price);
                } else {
                    alert("Error fetching data");
                }
            }
        };
        fetchData();
    }, [firebseId]);

    const overwriteData = async () => {
        if (firebseId) {
            const db = getDatabase(app);
            const newDocRef = ref(db, `nature/fruits/${firebseId}`);
            set(newDocRef, {
                fruits: input1,
                price: input2,
            })
            .then(() => alert("Value updated successfully"))
            .catch((error) => {
                alert("Error: " + error.message);
            });
        }
    };

    const handleChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput1(e.target.value);
    };
    const handleChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput2(e.target.value);
    };
    const navigate = useNavigate();

    return (
        <div>
            <h1>Update Page</h1>
            <input type="text" value={input1} onChange={handleChange1} />
            <input type="text" value={input2} onChange={handleChange2} />
            <button onClick={overwriteData}>Update Data</button>

            <button className="button1" onClick={() => navigate("/")}>GO HOMEPAGE</button>
            <button className="button1" onClick={() => navigate("/read")}>GO READ PAGE</button>
        </div>
    );
};

export default UpdateWrite;
