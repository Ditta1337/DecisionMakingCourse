import React from "react";
import {useStore} from "../../store";
import Button from "../button/Button";
import "./FileSaver.scss";

const FileSaver = () => {
    const store = useStore();

    const handleExport = () => {
        const data = {
            categories: store.categories,
            items: store.items
        };
        const blob = new Blob([JSON.stringify(data, null, 2)], {type: "application/json"});
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "decider.json";
        a.click();
        URL.revokeObjectURL(url);
    }

    return (
        <div className="file-saver">
            <div className="message">Do you want to export your setting to JSON file?</div>
            <Button type="primary" onClick={handleExport}>Export</Button>
        </div>
    );
}

export default FileSaver;