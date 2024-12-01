import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./views/home/Home";
import Card from "./components/card/Card";
import CategoryDecider from "./views/category-decider/CategoryDecider";
import ItemDecider from "./views/item-decider/ItemDecider";

const App = () => {

    return (
        <Card>
            <Router>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/category-decider" element={<CategoryDecider/>}/>
                    <Route path="/item-decider" element={<ItemDecider/>}/>
                </Routes>
            </Router>
        </Card>
    );
}

export default App;
