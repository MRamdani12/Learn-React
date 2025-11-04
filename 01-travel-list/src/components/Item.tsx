type itemProps = {
    item: {
        id: number;
        quantity: number;
        description: string;
        isPacked: boolean;
    };
    onPackedItem: (newItem: boolean, id: number) => void;
    onDeleteItem: (id: number) => void;
};

export default function Item({ item, onPackedItem, onDeleteItem }: itemProps) {
    return (
        <li className="item">
            <input
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    onPackedItem(e.target.checked, item.id);
                }}
                checked={item.isPacked}
                type="checkbox"
            />
            <span>
                {item.quantity} {item.description}
            </span>
            <button
                onClick={() => {
                    onDeleteItem(item.id);
                }}
            >
                ❌
            </button>
        </li>
    );
}
