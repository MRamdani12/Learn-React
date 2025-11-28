import { useState } from "react";
import { store } from "../../store";

function Customer() {
    const [fullName, setFullName] = useState("");

    const createCustomer = store((state) => state.createCustomer);

    function handleClick() {
        createCustomer(fullName);
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
