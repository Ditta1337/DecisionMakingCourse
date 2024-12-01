import React, {useState} from "react";
import "./CategoryDecider.scss";
import {useStore} from "../../store";
import Comparator from "../../components/comparator/Comparator";

const CategoryDecider = () => {
    const storeState = useStore(state => state.state);
    const [currentPairNumber, setCurrentPairNumber] = useState(0);
    const categoryPairs = storeState.category_pairs;
    return (
        <div className="category-decider">
            <Comparator pair={categoryPairs[currentPairNumber]} pairNumber={currentPairNumber}
                        numberOfPairs={categoryPairs.length} setPairNumber={setCurrentPairNumber}/>
        </div>
    );
}

export default CategoryDecider;