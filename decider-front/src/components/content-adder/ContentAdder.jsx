import React, { useState } from "react";
import ContentObject from "./content-object/ContentObject";
import "./ContentAdder.scss";
import Button from "../button/Button";

const ContentAdder = ({ objectType, objects, addObject, removeObject }) => {
    const [inputValue, setInputValue] = useState("");

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleAddObject = () => {
        if (inputValue.trim() !== "") {
            addObject(inputValue);
            setInputValue("");
        }
    };

    const handleKeyUp = (e) => {
        if (e.key === "Enter") {
            handleAddObject();
        }
    };

    return (
        <div className="content-adder">
            <div className="object-type">{objectType}:</div>
            <ul className="object-list">
                {objects.map((object, index) => (
                    <ContentObject key={index} object={object} removeObject={removeObject} />
                ))}
            </ul>
            <div className="object-input">
                <input
                    type="text"
                    placeholder="Add new"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyUp={handleKeyUp}
                />
                <Button type="primary" onClick={handleAddObject}>Add</Button>
            </div>
        </div>
    );
};

export default ContentAdder;