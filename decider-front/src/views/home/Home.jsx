import React from "react";
import "./Home.scss";

const Home = () => {
    return (
        <div className="home">
            <div className="header">
                <img className="logo" src={`${process.env.PUBLIC_URL}/icons/logo.svg`} alt="Decider logo"/>
                <h1>Decider</h1>
                <img className="logo" src={`${process.env.PUBLIC_URL}/icons/logo.svg`} alt="Decider logo"/>
            </div>
            <h2 className="description">
                Decider is a simple app that helps you make decisions.
                Just enter your options, answer a few questions, and let Decider do the rest.
            </h2>
        </div>
    );
}

export default Home;