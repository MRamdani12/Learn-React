import type { ReactNode } from "react";

type ServiceProps = {
    children: ReactNode;
    value: 0 | 0.05 | 0.1 | 0.2;
    onService: (value: 0 | 0.05 | 0.1 | 0.2) => void;
};

const options = [
    { value: 0, label: "Dissatisfied" },
    { value: 0.05, label: "Okay" },
    { value: 0.1, label: "Good" },
    { value: 0.2, label: "Amazing!" },
] as const;
type Options = (typeof options)[number]["value"];

const isOptions = (value: number): value is Options =>
    options.some((opt) => opt.value === (value as Options));

export default function Service({ children, value, onService }: ServiceProps) {
    return (
        <div>
            {children} <br />
            <select
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    const v = parseFloat(e.target.value);
                    if (isOptions(v)) {
                        onService(v);
                    } else {
                        console.warn("Value Unknown");
                    }
                }}
                value={value}
            >
                {options.map((opt) => {
                    return (
                        <option value={opt.value}>
                            {opt.label} ({opt.value * 100}%)
                        </option>
                    );
                })}
            </select>
        </div>
    );
}
