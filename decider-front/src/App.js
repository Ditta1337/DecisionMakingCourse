import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./views/home/Home";
import Card from "./components/card/Card";
import CategoryDecider from "./views/category-decider/CategoryDecider";

const App = () => {

    return (
        <Card>
            <Router>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/category-decider" element={<CategoryDecider/>}/>
                </Routes>
            </Router>
        </Card>
    );
}

export default App;
