import React, {useState} from "react";
import "./ItemDecider.scss";
import {useStore} from "../../store";
import Comparator from "../../components/comparator/Comparator";
import ProgressBar from "../../components/progress-bar/ProgressBar";

const ItemDecider = () => {
    const store = useStore();
    const [currentPairNumber, setCurrentPairNumber] = useState(store.currentItemPair);
    const itemPairs = store.itemPairs;

    const itemPairsWithCategory = itemPairs.flatMap((pair) =>
        pair.pairs.map((itemPair) => ({
            ...itemPair,
            category: pair.category,
        }))
    );

    return (
        <div className="item-decider">
            <ProgressBar progress={currentPairNumber} total={itemPairsWithCategory.length - 1}/>
            <Comparator pair={itemPairsWithCategory[currentPairNumber]}
                        category={itemPairsWithCategory[currentPairNumber].category}
                        pairNumber={currentPairNumber}
                        numberOfPairs={itemPairsWithCategory.length}
                        updatePair={store.updateItemPair}
                        setPairNumber={setCurrentPairNumber}
                        nextDestination="/summary"
                        nextDestinationMessage="Summary"
                        previousDestination="/category-decider"
                        previousDestinationMessage="Back"
                        incrementPage={store.incrementCurrentItemPair}
                        decrementPage={store.decrementCurrentItemPair}
            />
        </div>
    );
}

export default ItemDecider;