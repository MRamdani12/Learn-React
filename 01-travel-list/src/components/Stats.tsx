import type { ItemType } from "../types/Item";

type statsType = {
    items: ItemType[];
};

export default function Stats({ items }: statsType) {
    if (!items.length) {
        return (
            <h2 className="stats">
                Start adding some items to your packing list 🚀
            </h2>
        );
    }

    const numPacked = items.filter((item) => item.isPacked).length;
    const percentage = Math.round((numPacked / items.length) * 100);

    return (
        <h2 className="stats">
            {percentage === 100
                ? "You got everything! Ready to go ✈️"
                : `💼 You have ${items.length} items on your list, and you already packed ${numPacked} (${percentage}%)`}
        </h2>
    );
}
