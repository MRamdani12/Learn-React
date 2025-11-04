import Logo from "./Logo";
import Form from "./Form";
import PackageList from "./PackageList";
import { useState } from "react";
import type { ItemType } from "../types/Item";
import Stats from "./Stats";

export default function App() {
    const [items, setItems] = useState<ItemType[]>([]);

    function handleAddItem(newItem: ItemType) {
        const nextItems = [...items, newItem];

        setItems(nextItems);
    }

    function handlePackedItem(checked: boolean, id: number) {
        const nextItems = items.map((i) => {
            if (i.id === id) {
                return { ...i, isPacked: checked };
            } else {
                return i;
            }
        });

        setItems(nextItems);
    }

    function handleDeleteItem(id: number) {
        const nextItems = items.filter((i) => {
            if (i.id !== id) {
                return i;
            } else {
                return;
            }
        });

        setItems(nextItems);
    }

    function handleClearList() {
        setItems([]);
    }

    return (
        <>
            <header>
                <Logo />
            </header>
            <main>
                <Form onAddItem={handleAddItem} />
                <PackageList
                    items={items}
                    onPackedItem={handlePackedItem}
                    onDeleteItem={handleDeleteItem}
                    onClearList={handleClearList}
                />
            </main>
            <footer>
                <Stats items={items} />
            </footer>
        </>
    );
}
