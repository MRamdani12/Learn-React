import { useState } from "react";
import type { ItemType } from "../types/Item";

type formProps = {
    onAddItem: (newItem: ItemType) => void;
};

export default function Form({ onAddItem }: formProps) {
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState(1);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!description) {
            return;
        }

        const newItem = {
            id: Date.now(),
            quantity: quantity,
            description: description,
            isPacked: false,
        };

        onAddItem(newItem);
    }

    return (
        <div className="form-container">
            <form
                action="#"
                onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                    handleSubmit(e);
                    setQuantity(1);
                    setDescription("");
                }}
            >
                <p>What do you need for your 😍 trip?</p>
                <input
                    value={quantity}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setQuantity(Number(e.target.value))
                    }
                    placeholder="0"
                    type="number"
                    min={0}
                    step={1}
                />
                <input
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setDescription(e.target.value)
                    }
                    value={description}
                    placeholder="Item..."
                    type="text"
                />
                <button type="submit">ADD</button>
            </form>
        </div>
    );
}
