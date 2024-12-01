import React, {useState} from "react";
import "./Comparator.scss";
import Button from "../button/Button";

const Comparator = ({pair, category, pairNumber, setPairNumber, numberOfPairs}) => {
    const [sliderValue, setSliderValue] = useState(0);

    const mapSliderValue = (value) => {
        return value >= 0 ? 1 + value : (1 / (Math.abs(value) + 1)).toFixed(2);
    }

    return (
        <div className="comparator">
            {category && <div className="category">{category}</div>}
            <div className="pair">
                <div className="item">{pair.item1}</div>
                <img src={process.env.PUBLIC_URL + "/images/vs.png"} alt="vs"/>
                <div className="item">{pair.item2}</div>
            </div>
            <div className="slider">
                <input
                    type="range"
                    min="-8"
                    max="8"
                    value={sliderValue}
                    className="slider"
                    id="slider"
                    onChange={(e) => setSliderValue(Number(e.target.value))}
                />
            </div>
            <div className="preference">
                {sliderValue === 0 ? (
                    <div>Equal preference</div>
                ) : (
                    <div>{pair.item1} is {mapSliderValue(sliderValue)} times more preferred than {pair.item2}</div>
                )}
            </div>
            <div className="buttons">
                <Button onClick={() => setPairNumber(pairNumber - 1)} disabled={pairNumber === 0}>
                    Previous
                </Button>
                <Button onClick={() => setPairNumber(pairNumber + 1)} disabled={pairNumber === numberOfPairs - 1}>
                    Next
                </Button>
            </div>
        </div>
    )
        ;
};

export default Comparator;