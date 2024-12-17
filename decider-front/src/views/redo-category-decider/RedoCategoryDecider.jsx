import React, {useState} from "react";
import "./RedoCategoryDecider.scss";
import {useStore} from "../../store";
import Comparator from "../../components/comparator/Comparator";
import ProgressBar from "../../components/progress-bar/ProgressBar";

const RedoCategoryDecider = () => {
    const store = useStore();
    const [currentPairNumber, setCurrentPairNumber] = useState(0);
    const redoCategoryPairs = store.redoCategoryPairs;

    const nextDestiny = store.redoItemPairs.length > 0 ? "/redo-item-decider" : "/summary";
    const nextDestinySummary = store.redoItemPairs.length > 0 ? "Continue" : "Summary";

    return (
        <div className="redo-category-decider">
            <ProgressBar progress={currentPairNumber} total={redoCategoryPairs.length - 1}/>
            <Comparator pair={redoCategoryPairs[currentPairNumber]}
                        pairNumber={currentPairNumber}
                        numberOfPairs={redoCategoryPairs.length}
                        updatePair={store.updateCategoryPair}
                        setPairNumber={setCurrentPairNumber}
                        nextDestination={nextDestiny}
                        nextDestinationMessage={nextDestinySummary}
                        previousDestination="/summary"
                        previousDestinationMessage="Summary"
                        incrementPage={() => {}}
                        decrementPage={() => {}}
            />
        </div>
    );
}

export default RedoCategoryDecider;