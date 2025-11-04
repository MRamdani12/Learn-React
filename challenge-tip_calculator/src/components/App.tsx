import { useState } from "react";
import Bill from "./Bill";
import Service from "./Service";

type serviceNumberType = 0 | 0.05 | 0.1 | 0.2;

export default function App() {
    const [bill, setBill] = useState(0);
    const [tip, setTip] = useState<serviceNumberType>(0);
    const [friendTip, setFriendTip] = useState<serviceNumberType>(0);
    const average = (bill * tip + bill * friendTip) / 2;
    const total = average + bill;

    function handleBill(bill: number) {
        setBill(bill);
    }

    function handleTip(value: serviceNumberType) {
        setTip(value);
    }

    function handleFriendTip(value: serviceNumberType) {
        setFriendTip(value);
    }

    return (
        <>
            <Bill onBill={handleBill} value={bill}>
                How much was the bill?
            </Bill>
            <Service onService={handleTip} value={tip}>
                How did you like the service?
            </Service>
            <Service onService={handleFriendTip} value={friendTip}>
                How did your friend like the service?
            </Service>
            <h1>
                You pay ${total.toFixed()} (${bill} + ${average} tip)
            </h1>
            <button>reset</button>
        </>
    );
}
