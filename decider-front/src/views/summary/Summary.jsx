import React, {useEffect} from "react";
import "./Summary.scss";
import axios from "axios";
import {useStore} from "../../store";
import {BACKEND_URL} from "../../consts";
import Button from "../../components/button/Button";
import {useNavigate} from "react-router-dom";

const Summary = () => {
    const store = useStore();
    const navigate = useNavigate();
    const [loading, setLoading] = React.useState(true);
    const [ranking, setRanking] = React.useState([]);
    const [categoryMatrixConsistencyRate, setCategoryMatrixConsistencyRate] = React.useState(0);
    const [itemMatrixConsistencyRates, setItemMatrixConsistencyRates] = React.useState([]);
    const [itemQuestions, setItemQuestions] = React.useState([]);
    const [categoryQuestions, setCategoryQuestions] = React.useState([]);
    const [numOfInconsistentQuestions, setNumOfInconsistentQuestions] = React.useState(0);

    useEffect(() => {
        axios.post(BACKEND_URL + "/decider/answers", {
            item_questions: store.itemPairs,
            category_questions: store.categoryPairs,
        }).then((response) => {
            setRanking(response.data.alternatives_ranking);
            setCategoryMatrixConsistencyRate(response.data.category_matrix_consistency_ratio);
            setItemMatrixConsistencyRates(response.data.items_matrix_consistency_ratio);
            setItemQuestions(response.data.item_questions);
            store.setRedoItemPairs(response.data.item_questions);
            setCategoryQuestions(response.data.category_questions);
            store.setRedoCategoryPairs(response.data.category_questions);
            let numOfInconsistentQuestions = response.data.category_questions.length;
            response.data.item_questions.forEach((item) => {
                numOfInconsistentQuestions += item.pairs.length;
            });
            setNumOfInconsistentQuestions(numOfInconsistentQuestions);
            setLoading(false);
        }).catch((error) => {
                console.error(error);
            }
        );
    }, []);

    const handleRedoQuestions = () => {
        categoryQuestions.length > 0 ? navigate("/redo-category-decider") : navigate("/redo-item-decider");
    }

    const handleHome = () => {
        navigate("/");
    }

    return (
        <>
            {!loading && <div className="summary">
                <div className="header">
                    <h1 className="title">Summary</h1>
                </div>
                <div className="results">
                    Here are your <b>{ranking.length}</b> best options in order:
                    <div className="ranking">
                        {ranking.map((item, index) => (
                            <div key={index}>
                                <div>{item}</div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="consistency-rates-container">
                    <div className="category"><b>Category matrix consistency
                        rate:</b> {categoryMatrixConsistencyRate.toFixed(2)}</div>
                    <div className="item">
                        <b>Item matrix consistency rates:</b>
                        <div className="item-consistency-rates">
                            {itemMatrixConsistencyRates.map((pair, index) => (
                                <div key={index} className="item-consistency-rate">
                                    <div>Category {pair.category_name}: {pair.consistency.toFixed(2)}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                {(itemQuestions.length > 0 || categoryQuestions.length > 0) ? <div className="redo">
                    <div>Your answers weren't ideal. Would you like to redo <b>{numOfInconsistentQuestions}</b> most
                        inconsistent questions?
                    </div>
                    <div className="buttons">
                        <Button onClick={handleRedoQuestions}>Redo</Button>
                        <Button onClick={handleHome}>Home</Button>
                    </div>
                </div> : <Button onClick={handleHome}>Home</Button>}
            </div>}
        </>
    )
        ;
}


export default Summary;