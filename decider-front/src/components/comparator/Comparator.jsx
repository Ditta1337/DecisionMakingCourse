import React, { useEffect, useState } from "react";
import "./Comparator.scss";
import Button from "../button/Button";
import { useNavigate } from "react-router-dom";

const Comparator = ({
                        pair,
                        pairNumber,
                        setPairNumber,
                        numberOfPairs,
                        updatePair,
                        nextDestination,
                        nextDestinationMessage,
                        previousDestination,
                        previousDestinationMessage,
                        incrementPage,
                        decrementPage
                    }) => {
    const navigate = useNavigate();
    const [animationClass, setAnimationClass] = useState("");

    const mapSliderValueToDecider = (value) => {
        return value >= 0 ? 1 + value : (1 / (Math.abs(value) + 1)).toFixed(2);
    }

    const mapDeciderValueToSlider = (value) => {
        if (value === 0) return 0;
        return value >= 1 ? value - 1 : -(1 / value - 1).toFixed(0);
    }

    const [sliderValue, setSliderValue] = useState(mapDeciderValueToSlider(pair.decider));

    const handleNext = () => {
        setAnimationClass("fade-out");
        mapSliderValueToDecider(sliderValue);
        setTimeout(() => {
            setPairNumber(pairNumber + 1);
            incrementPage();
            setAnimationClass("fade-in");
            setTimeout(() => setAnimationClass(""), 500);
        }, 500);
    }

    const handlePrevious = () => {
        setAnimationClass("fade-out");

        setTimeout(() => {
            setPairNumber(pairNumber - 1);
            decrementPage();
            setAnimationClass("fade-in");
            setTimeout(() => setAnimationClass(""), 500);
        }, 500);
    }

    useEffect(() => {
        if (pair.decider === 0.0) {
            pair.decider = 1;
            updatePair(pair);
        }
        setSliderValue(mapDeciderValueToSlider(pair.decider));
    }, [pair]);

    useEffect(() => {
        const updatedPair = {
            ...pair,
            decider: mapSliderValueToDecider(sliderValue)
        };
        updatePair(updatedPair);
    }, [sliderValue]);

    return (
        <div className={`comparator ${animationClass}`}>
            {pair.category && <div className="category">Category: <span className="category-name">{pair.category}</span></div>}
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
                    <div>{pair.item1} is <span className="preference-weight">{mapSliderValueToDecider(sliderValue)}</span> times more preferred
                        than {pair.item2}</div>
                )}
            </div>
            <div className="buttons">
                {pairNumber === 0 ? (
                    <Button onClick={() => navigate(previousDestination)} type="danger">
                        {previousDestinationMessage}
                    </Button>) : (
                    <Button onClick={handlePrevious}>
                        Previous
                    </Button>)}
                {pairNumber === numberOfPairs - 1 ? (
                    <Button onClick={() => navigate(nextDestination)}>
                        {nextDestinationMessage}
                    </Button>) : (
                    <Button onClick={handleNext}>
                        Next
                    </Button>)}
            </div>
        </div>
    );
};

export default Comparator;