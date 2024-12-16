import React, {useEffect} from "react";
import "./Summary.scss";
import axios from "axios";
import {useStore} from "../../store";
import {BACKEND_URL} from "../../consts";

const Summary = () => {
    const store = useStore();


    useEffect(() => {
        console.log({
            item_questions: store.itemPairs,
            category_questions: store.categoryPairs,
        })
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
            <div className="header">
                <div className="title">Summary</div>
            </div>
            <div className="results">

            </div>
        </div>
    );
}

export default Summary;