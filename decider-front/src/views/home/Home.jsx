import React, {useState} from "react";
import "./Home.scss";
import axios from "axios";

const Home = () => {

    const [greeting, setGreeting] = useState("");

    axios.get("http://localhost:8089/api/test/hello").then(
        response => {
            setGreeting(response.data);
        }
    )

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
            <h1>{greeting}</h1>
        </div>
    );
}

export default Home;