import type { ReactNode } from "react";

export default function Button({
    children,
    onClick,
}: {
    children: ReactNode;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}) {
    return (
        <button onClick={onClick} className="button">
            {children}
        </button>
    );
}
