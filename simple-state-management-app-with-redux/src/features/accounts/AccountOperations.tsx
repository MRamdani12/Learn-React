import { useState } from "react";

import { depositAccount, payLoan, requestLoan, withdraw } from "./AccountSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";

function AccountOperations() {
    const [depositAmount, setDepositAmount] = useState<number>(0);
    const [withdrawalAmount, setWithdrawalAmount] = useState<number>(0);
    const [loanAmount, setLoanAmount] = useState<number>(0);
    const [loanPurpose, setLoanPurpose] = useState("");
    const [currency, setCurrency] = useState("USD");

    const dispatch = useAppDispatch();
    const [loan, loanDesc, isLoading] = useAppSelector((state) => [
        state.account.loan,
        state.account.loanPurpose,
        state.account.isLoading,
    ]);

    function handleDeposit() {
        if (!depositAmount) return;

        dispatch(depositAccount(depositAmount, currency));
        setDepositAmount(0);
    }

    function handleWithdrawal() {
        if (!withdrawalAmount) return;

        dispatch(withdraw(withdrawalAmount));
        setWithdrawalAmount(0);
    }

    function handleRequestLoan() {
        if (!loanAmount || !loanPurpose) return;

        dispatch(requestLoan(loanAmount, loanPurpose));
        setLoanAmount(0);
        setLoanPurpose("");
    }

    function handlePayLoan() {
        dispatch(payLoan());
    }

    return (
        <div>
            <h2>Your account operations</h2>
            <div className="inputs">
                <div>
                    <label>Deposit</label>
                    <input
                        type="number"
                        value={depositAmount}
                        onChange={(e) => setDepositAmount(+e.target.value)}
                    />
                    <select
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                    >
                        <option value="USD">US Dollar</option>
                        <option value="EUR">Euro</option>
                        <option value="GBP">British Pound</option>
                    </select>

                    <button
                        disabled={isLoading ? true : false}
                        onClick={handleDeposit}
                    >
                        {isLoading
                            ? "Converting Currency..."
                            : `Deposit ${depositAmount}`}
                    </button>
                </div>

                <div>
                    <label>Withdraw</label>
                    <input
                        type="number"
                        value={withdrawalAmount}
                        onChange={(e) => setWithdrawalAmount(+e.target.value)}
                    />
                    <button onClick={handleWithdrawal}>
                        Withdraw {withdrawalAmount}
                    </button>
                </div>

                <div>
                    <label>Request loan</label>
                    <input
                        type="number"
                        value={loanAmount}
                        onChange={(e) => setLoanAmount(+e.target.value)}
                        placeholder="Loan amount"
                    />
                    <input
                        value={loanPurpose}
                        onChange={(e) => setLoanPurpose(e.target.value)}
                        placeholder="Loan purpose"
                    />
                    <button onClick={handleRequestLoan}>Request loan</button>
                </div>

                <div>
                    <span>
                        Pay back {loan} ({loanDesc}){" "}
                    </span>
                    <button onClick={handlePayLoan}>Pay loan</button>
                </div>
            </div>
        </div>
    );
}

export default AccountOperations;
