import { useState } from "react";
import type { FriendType } from "../types/Friend";
import Button from "./Button";

type FormAddFriendType = {
    isDisplayed: boolean;
    onAddFriend: (newFriend: FriendType) => void;
};

export default function FormAddFriend({
    isDisplayed,
    onAddFriend,
}: FormAddFriendType) {
    const [name, setName] = useState("");
    const [imageUrl, setImgUrl] = useState("https://i.pravatar.cc/48");

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!imageUrl || !name) return;

        const id = crypto.randomUUID();

        const newFriend = {
            id: id,
            name: name,
            image: `${imageUrl}?=${id}`,
            balance: 0,
        };

        onAddFriend(newFriend);
    }

    return (
        <form
            className="form-add-friend"
            style={{ display: isDisplayed ? "grid" : "none" }}
            onSubmit={(e) => handleSubmit(e)}
        >
            <label>👫 Friend Name</label>
            <input
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setName(e.target.value)
                }
                value={name}
                type="text"
                placeholder="John"
            />
            <label>🌄 Image URL</label>
            <input
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setImgUrl(e.target.value)
                }
                value={imageUrl}
                type="text"
                placeholder="https://i.pravatar.cc/48"
            />
            <Button>Add</Button>
        </form>
    );
}
