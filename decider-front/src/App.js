import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./views/home/Home";
import Card from "./components/card/Card";
import CategoryDecider from "./views/category-decider/CategoryDecider";
import ItemDecider from "./views/item-decider/ItemDecider";
import Summary from "./views/summary/Summary";
import RedoItemDecider from "./views/redo-item-decider/RedoItemDecider";
import RedoCategoryDecider from "./views/redo-category-decider/RedoCategoryDecider";

const App = () => {

    return (
        <Card>
            <Router>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/category-decider" element={<CategoryDecider/>}/>
                    <Route path="/item-decider" element={<ItemDecider/>}/>
                    <Route path={"/summary"} element={<Summary/>}/>
                    <Route path={"/redo-item-decider"} element={<RedoItemDecider/>}/>
                    <Route path={"/redo-category-decider"} element={<RedoCategoryDecider/>}/>
                    <Route path="*" element={<Home/>}/>
                </Routes>
            </Router>
        </Card>
    );
}

export default App;
