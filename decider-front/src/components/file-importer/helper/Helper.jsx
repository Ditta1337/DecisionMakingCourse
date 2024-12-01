import React, { useState, useRef } from "react";
import "./Helper.scss";

const Helper = () => {
    const [showPopper, setShowPopper] = useState(false);
    const helperRef = useRef(null);

    return (
        <div>
            <div
                className="helper"
                ref={helperRef}
                onMouseEnter={() => setShowPopper(true)}
                onMouseLeave={() => setShowPopper(false)}
            >
                ?
            </div>
            {showPopper && (
                <div className="popper">
                    <div className="popper-content">
                        Example JSON file:
                        <pre>
                            <code dangerouslySetInnerHTML={{
                                __html: `{
    "categories": ["Category 1", "Category 2"],
    "items": ["Item 1", "Item 2"]
}`
                            }}/>
                        </pre>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Helper;
