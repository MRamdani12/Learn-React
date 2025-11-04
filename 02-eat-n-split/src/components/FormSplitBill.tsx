import type { FriendType } from "../types/Friend";
import Button from "./Button";
import { useState } from "react";

type FormSplitBillProps = {
    friend: FriendType;
    onSplitBill: (newBalance: number) => void;
};

export default function FormSplitBill({
    friend,
    onSplitBill,
}: FormSplitBillProps) {
    const [bill, setBill] = useState<number>(0);
    const [yourExpense, setYourExpense] = useState<number>(0);
    const [friendExpense, setFriendExpense] = useState<number>(0);
    const [whoPay, setWhoPay] = useState("you");

    function handleFriendExpense(e: React.ChangeEvent<HTMLInputElement>) {
        if (bill === null || bill === 0) {
            return;
        }
        if (Number(e.target.value) < bill) {
            setYourExpense(Number(e.target.value));
            setFriendExpense(bill - Number(e.target.value));
        }
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        let newBalance = 0;

        if (whoPay === "you") {
            newBalance = friend.balance - friendExpense;
        } else {
            newBalance = friend.balance + yourExpense;
        }

        onSplitBill(newBalance);
    }

    return (
        <form className="form-split-bill" onSubmit={(e) => handleSubmit(e)}>
            <h2>Split a Bill with {friend.name}</h2>

            <label>💰 Bill value</label>
            <input
                onChange={(e) => setBill(Number(e.target.value))}
                value={bill ?? ""}
                type="text"
            />
            <label>🧍‍♀️ Your expense</label>
            <input
                onChange={(e) => handleFriendExpense(e)}
                value={yourExpense ?? ""}
                type="text"
            />
            <label>👫 {friend.name} expense</label>
            <input value={friendExpense ?? ""} disabled type="text" />
            <label>🤑 Who is paying the bill</label>
            <select onChange={(e) => setWhoPay(e.target.value)} value={whoPay}>
                <option value="you">You</option>
                <option value={friend.name}>{friend.name}</option>
            </select>
            <Button>Split Bill</Button>
        </form>
    );
}
