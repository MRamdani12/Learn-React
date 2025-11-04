import { useReducer, useState } from "react";
import NowReducer from "./NowReducer";

export default function App() {
    const [now, dispatch] = useReducer(NowReducer, new Date());
    const [step, setStep] = useState(1);

    function handleClick(type: "incr" | "decr") {
        if (type === "incr") {
            dispatch({
                type: "incr",
                step: step,
            });
        } else {
            dispatch({
                type: "decr",
                step: step,
            });
        }
    }

    function handleStep(type: "incr" | "decr") {
        if (type === "incr") {
            setStep(step + 1);
        } else {
            if (step > 1) {
                setStep(step - 1);
            }
        }
    }

    return (
        <>
            <p>step</p>
            <p>{step}</p>
            <button onClick={() => handleStep("decr")}>-</button>
            <button onClick={() => handleStep("incr")}>+</button>
            <p>Incr/Decr</p>
            <button onClick={() => handleClick("decr")}>-</button>
            <button onClick={() => handleClick("incr")}>+</button>
            <br />
            <input
                onChange={(e) => {
                    setStep(Number(e.target.value));
                    console.log(e.target.value);
                }}
                value={step}
                type="number"
            />
            <p>
                {now.toLocaleDateString("en-US", {
                    weekday: undefined,
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                })}
            </p>
        </>
    );
}
