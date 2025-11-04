type AccordionItemProps = {
    title: string;
    text: string;
    number: number;
    isOpened: boolean;
    onItemClick: (number: number) => void;
};
export default function AccordionItem({
    title,
    text,
    number,
    isOpened,
    onItemClick,
}: AccordionItemProps) {
    return (
        <div
            onClick={() => onItemClick(number)}
            className={`accordion ${isOpened ? "active" : null}`}
        >
            <div className="acc-number">
                {number < 10 ? `0${number + 1}` : number}
            </div>
            <div className="acc-text">
                <h2>{title}</h2>
                {isOpened && <p>{text}</p>}
            </div>
        </div>
    );
}
