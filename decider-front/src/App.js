import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./views/home/Home";
import Card from "./components/card/Card";

const App = () => {

    return (
        <Card>
            <Router>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/category-decider" element={<h1>Decider</h1>}/>
                </Routes>
            </Router>
        </Card>
    );
}

export default App;
