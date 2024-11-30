import React from "react";
import Button from "../../button/Button";
import "./ContentObject.scss";

const ContentObject = ({object, removeObject}) => {
    return (
        <li className="content-object">
            <div className="object-name">
                {object}
            </div>
            <Button type="danger" onClick={() => removeObject(object)}>Remove</Button>
        </li>
    )
}

export default ContentObject;