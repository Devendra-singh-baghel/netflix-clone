import { useEffect, useRef, useState } from "react";

function ExpandableText({ text }) {
    const [expanded, setExpanded] = useState(false);
    const [isClamped, setIsClamped] = useState(false);
    const textRef = useRef(null);

    useEffect(() => {
        if (textRef.current) {
            setIsClamped(textRef.current.scrollHeight > textRef.current.clientHeight);
        }
    }, [text]);

    if (!text) return null;

    return (
        <div className="max-w-[700px] mb-2.5 lg:mb-5 text-xs md:text-sm">
            <p
                ref={textRef}
                className={`${expanded ? "" : `line-clamp-1 md:line-clamp-2`} `}
            >
                {text}
            </p>
            {isClamped && (
                <button
                    onClick={() => setExpanded(!expanded)}
                    className="text-blue-200 font-medium mt-1 cursor-pointer"
                >
                    {expanded ? "Show Less" : "Show More"}
                </button>
            )}
        </div>
    );
}

export default ExpandableText;
