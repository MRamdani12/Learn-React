import { useState } from "react";
import type { ItemType } from "../types/Item";
import Item from "./Item.tsx";

type PackageListProp = {
    items: ItemType[];
    onPackedItem: (newItem: boolean, id: number) => void;
    onDeleteItem: (id: number) => undefined;
    onClearList: () => undefined;
};

const options = ["input", "description", "packed"] as const;
type Options = (typeof options)[number];

const isOption = (v: string): v is Options =>
    (options as readonly string[]).includes(v);

export default function PackageList({
    items,
    onPackedItem,
    onDeleteItem,
    onClearList,
}: PackageListProp) {
    const [sortBy, setSortBy] = useState<Options>("input");
    let sortedItems: ItemType[];

    switch (sortBy) {
        case "input": {
            sortedItems = items.slice();
            break;
        }

        case "description": {
            sortedItems = items
                .slice()
                .sort((a, b) => a.description.localeCompare(b.description));

            break;
        }

        case "packed": {
            sortedItems = items
                .slice()
                .sort((a, b) => Number(a.isPacked) - Number(b.isPacked));

            break;
        }
    }

    return (
        <div className="package-list-wrapper">
            <ol className="package-list">
                {sortedItems.map((i) => {
                    return (
                        <Item
                            item={i}
                            onPackedItem={onPackedItem}
                            onDeleteItem={onDeleteItem}
                            key={i.id}
                        />
                    );
                })}
            </ol>
            <div className="actions">
                <select
                    value={sortBy}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                        isOption(e.target.value)
                            ? setSortBy(e.target.value)
                            : console.error("Value Uknown")
                    }
                >
                    {options.map((opt) => {
                        return (
                            <option key={opt} value={opt}>
                                Sort By {opt}
                            </option>
                        );
                    })}
                </select>
                <button onClick={onClearList}>Clear List</button>
            </div>
        </div>
    );
}
