import { useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store";
import { createCustomer } from "./CustomerSlice";

function Customer() {
    const [fullName, setFullName] = useState("");

    const dispatch = useDispatch<AppDispatch>();

    function handleClick() {
        dispatch(createCustomer(fullName));
    }

    return (
        <div>
            <h2>Create new customer</h2>
            <div className="inputs">
                <div>
                    <label>Customer full name</label>
                    <input
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />
                </div>
                <button onClick={handleClick}>Create new customer</button>
            </div>
        </div>
    );
}

export default Customer;
