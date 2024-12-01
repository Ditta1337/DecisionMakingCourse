import React, {useEffect} from "react";
import "./Summary.scss";
import axios from "axios";
import {useStore} from "../../store";
import {BACKEND_URL} from "../../consts";

const Summary = () => {
    const store = useStore();

    useEffect(() => {
        axios.post(BACKEND_URL + "/decider/answers", {
            item_questions: store.itemPairs,
            category_questions: store.categoryPairs,
        }).then((response) => {
            console.log(response.data);
        }).catch((error) => {
                console.error(error);
            }
        );
    }, []);

    return (
        <div className="summary">
            <h1>Summary</h1>
            <p>Summary content</p>
        </div>
    );
}

export default Summary;