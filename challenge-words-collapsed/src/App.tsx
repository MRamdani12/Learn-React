import { useState } from "react";

export default function App() {
    return (
        <div>
            <TextExpander>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos,
                dicta doloremque. Quisquam quibusdam sapiente nisi corrupti
                debitis doloremque necessitatibus quasi similique, dolorem rerum
                odio dolor at omnis expedita, officia exercitationem.
            </TextExpander>
            <TextExpander collapsedTo={10} color="#ff0000" isOpen={true}>
                Hic quidem suscipit autem illo! Assumenda nobis voluptas porro
                quos nisi nihil aperiam alias aliquid, autem laboriosam culpa!
                Fugit nostrum veritatis architecto?
            </TextExpander>
            <TextExpander>
                Quisquam quibusdam sapiente nisi corrupti debitis doloremque
                necessitatibus quasi similique, dolorem rerum odio dolor at
                omnis expedita, officia exercitationem.
            </TextExpander>
        </div>
    );
}

type TextExpanderProps = {
    /** The full text to display (collapsed by default). */
    children: string;
    /**Use this to choose from where the text will collapsed @default 5**/
    collapsedTo?: number;
    color?: string;
    /**Use if you want to choose if the text is collapsed first or not @default true**/
    isOpen?: boolean;
};

function TextExpander({
    children,
    collapsedTo = 5,
    color = "#0000ff",
    isOpen = false,
}: TextExpanderProps) {
    const collapsedText = children.split(" ").slice(0, collapsedTo).join(" ");
    const [isClicked, setIsClicked] = useState(isOpen);

    if (collapsedTo > collapsedText.length) {
        console.error(
            "Collapsed To is too much for the amount of words on the text!"
        );
        return;
    }

    return (
        <p>
            {isClicked ? children : `${collapsedText}...`}
            <button
                onClick={() => setIsClicked(!isClicked)}
                style={{
                    background: "none",
                    border: "none",
                    color: color,
                    cursor: "pointer",
                }}
            >
                Show {isClicked ? "Less" : "More"}
            </button>
        </p>
    );
}
