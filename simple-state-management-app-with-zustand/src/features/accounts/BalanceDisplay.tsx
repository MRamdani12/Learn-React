function formatCurrency(value: number) {
    return new Intl.NumberFormat("en", {
        style: "currency",
        currency: "USD",
    }).format(value);
}

function BalanceDisplay({ balance }: { balance: number }) {
    return <div className="balance">{formatCurrency(balance)}</div>;
}

export default BalanceDisplay;
