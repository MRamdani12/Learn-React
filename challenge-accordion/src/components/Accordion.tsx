import { useState } from "react";
import AccordionItem from "./AccordionItem";

type AccordionProps = {
    items: {
        title: string;
        text: string;
    }[];
};

export default function Accordion({ items }: AccordionProps) {
    const [currOpenedItem, setCurrOpenedItem] = useState<number | null>(null);

    function handleClick(number: number) {
        if (currOpenedItem === number) {
            setCurrOpenedItem(null);
        } else {
            setCurrOpenedItem(number);
        }
    }

    return (
        <div className="acc-container">
            {items.map((item, i) => {
                return (
                    <AccordionItem
                        title={item.title}
                        text={item.text}
                        number={i}
                        key={item.title}
                        isOpened={i === currOpenedItem}
                        onItemClick={handleClick}
                    />
                );
            })}
        </div>
    );
}
