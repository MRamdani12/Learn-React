import type { ReactNode } from "react";

type BillProps = {
    children: ReactNode;
    value: number;
    onBill: (bill: number) => void;
};

export default function Bill({ children, value, onBill }: BillProps) {
    return (
        <div>
            {children} <br />
            <input
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    onBill(Number(e.target.value))
                }
                value={value}
                type="text"
            />
        </div>
    );
}
