import React, {useState} from "react";
import "./CategoryDecider.scss";
import {useStore} from "../../store";
import Comparator from "../../components/comparator/Comparator";
import ProgressBar from "../../components/progress-bar/ProgressBar";

const CategoryDecider = () => {
    const store = useStore();
    const [currentPairNumber, setCurrentPairNumber] = useState(store.currentCategoryPair);
    const categoryPairs = store.categoryPairs;

    return (
        <div className="category-decider">
            <ProgressBar progress={currentPairNumber} total={categoryPairs.length - 1}/>
            <Comparator pair={categoryPairs[currentPairNumber]}
                        pairNumber={currentPairNumber}
                        numberOfPairs={categoryPairs.length}
                        updatePair={store.updateCategoryPair}
                        setPairNumber={setCurrentPairNumber}
                        nextDestination="/item-decider"
                        nextDestinationMessage="Continue"
                        previousDestination="/"
                        previousDestinationMessage="Home"
                        incrementPage={store.incrementCurrentCategoryPair}
                        decrementPage={store.decrementCurrentCategoryPair}
            />
        </div>
    );
}

export default CategoryDecider;