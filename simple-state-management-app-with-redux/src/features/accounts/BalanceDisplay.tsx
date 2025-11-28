import { useSelector } from "react-redux";
import type { RootState } from "../../store";

function formatCurrency(value: number) {
    return new Intl.NumberFormat("en", {
        style: "currency",
        currency: "USD",
    }).format(value);
}

function BalanceDisplay() {
    const balanceAmount = useSelector((state: RootState) =>
        state.account ? state.account.balance : 0
    );

    return <div className="balance">{formatCurrency(balanceAmount)}</div>;
}

export default BalanceDisplay;
