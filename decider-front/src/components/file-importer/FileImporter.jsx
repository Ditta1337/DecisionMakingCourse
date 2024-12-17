import React, {useCallback, useState} from "react";
import { useDropzone } from "react-dropzone";
import Button from "../button/Button";
import "./FileImporter.scss";
import {useStore} from "../../store";
import Helper from "./helper/Helper";

const FileImporter = () => {
    const requiredKeys = ["categories", "items"];
    const [fileName, setFileName] = useState(null);
    const [isParsed, setIsParsed] = useState(null);

    const store = useStore();

    const onDrop = useCallback((acceptedFiles) => {
        setFileName(null);
        setIsParsed(null);
        if (acceptedFiles.length > 0) {
            const file = acceptedFiles[0];
            if (file.type === "application/json") {
                const reader = new FileReader();
                reader.onload = () => {
                    try {
                        const fileContent = JSON.parse(reader.result);

                        const hasRequiredKeys = requiredKeys.every(key => key in fileContent);
                        if (!hasRequiredKeys) {
                            throw new Error("Missing required keys");
                        }

                        store.setCategories(fileContent.categories);
                        store.setItems(fileContent.items);

                        setFileName(file.name);
                        setIsParsed(true);
                    } catch (error) {
                        console.error("Error parsing JSON:", error);
                        setIsParsed(false);
                    }
                };
                reader.readAsText(file);
            }
        }
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: "application/json",
        multiple: false
    });

    return (
        <div className="file-importer">
            <Helper/>
            <div {...getRootProps({className: "dropzone"})}>
                <input {...getInputProps()} />
                <p>Drag & drop a JSON file here, or click to select one</p>
                <Button>Import JSON</Button>
                {isParsed === false && <p className="error">Error parsing JSON file</p>}
                {fileName && <p className="success">Loaded {fileName}</p>}
            </div>
        </div>
    );
};

export default FileImporter;