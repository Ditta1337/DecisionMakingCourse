import React, {useState, useRef} from "react";
import {usePopper} from "react-popper";
import "./Helper.scss";

const Helper = () => {
    const [showPopper, setShowPopper] = useState(false);
    const helperRef = useRef(null);
    const popperRef = useRef(null);
    const {styles, attributes} = usePopper(helperRef.current, popperRef.current, {
        placement: "top"
    });

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
                <div ref={popperRef} style={styles.popper} {...attributes.popper}>
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