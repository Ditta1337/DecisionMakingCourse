import React, {useState} from "react";
import "./RedoItemDecider.scss";
import {useStore} from "../../store";
import Comparator from "../../components/comparator/Comparator";
import ProgressBar from "../../components/progress-bar/ProgressBar";

const RedoItemDecider = () => {
    const store = useStore();
    const [currentPairNumber, setCurrentPairNumber] = useState(0);
    const redoItemPairs = store.redoItemPairs;


    const itemPairsWithCategory = redoItemPairs.flatMap((pair) =>
        pair.pairs.map((itemPair) => ({
            ...itemPair,
            category: pair.category,
        }))
    );

    const previousDestiny = store.redoCategoryPairs.length > 0 ? "/redo-category-decider" : "/summary";
    const previousDestinySummary = store.redoCategoryPairs.length > 0 ? "Back" : "Summary";

    const doNothing = () => {};

    return (
        <div className="redo-item-decider">
            <ProgressBar progress={currentPairNumber} total={itemPairsWithCategory.length - 1}/>
            <Comparator pair={itemPairsWithCategory[currentPairNumber]}
                        category={itemPairsWithCategory[currentPairNumber].category}
                        pairNumber={currentPairNumber}
                        numberOfPairs={itemPairsWithCategory.length}
                        updatePair={store.updateItemPair}
                        setPairNumber={setCurrentPairNumber}
                        nextDestination="/summary"
                        nextDestinationMessage="Summary"
                        previousDestination={previousDestiny}
                        previousDestinationMessage={previousDestinySummary}
                        incrementPage={doNothing}
                        decrementPage={doNothing}
            />
        </div>
    );
}

export default RedoItemDecider;