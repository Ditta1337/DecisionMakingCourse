import React from "react";
import "./Home.scss";
import Button from "../../components/button/Button";
import FileImporter from "../../components/file-importer/FileImporter";
import ContentAdder from "../../components/content-adder/ContentAdder";
import {useStore} from "../../store";
import FileSaver from "../../components/file-saver/FileSaver";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {BACKEND_URL} from "../../consts";

const Home = () => {
    const navigate = useNavigate();
    const storeActions = useStore(state => state.actions);
    const storeState = useStore(state => state.state);

    const handleDecide = () => {
        if (storeState.categories.length < 2) {
            alert("Please add at least two categories");
            return;
        }
        if (storeState.items.length < 2) {
            alert("Please add at least two items to compare");
            return;
        }

        axios.post(`${BACKEND_URL}/decider/configuration`, {
            categories: storeState.categories,
            items: storeState.items
        }).then(response => {
            const category_pairs = response.data.category_pairs;
            const item_pairs = response.data.item_pairs;

            if (!category_pairs?.length || !item_pairs?.length) {
                console.error("Invalid response from server");
                return;
            }

            storeActions.setCategoryPairs(response.data.category_pairs);
            storeActions.setItemPairs(response.data.item_pairs);

            navigate("/category-decider");
        }).catch(error => {
            console.error(error);
        });
    }

    return (
        <div className="home">
            <div className="header">
                <h1 className="title">Decydent</h1>
            </div>
            <h2 className="description">
                <span className="title">Decydent</span> is a simple app that helps you make decisions.
                Just enter your options, answer a few questions, and let <span className="title">Decydent</span> do the
                rest.
            </h2>
            <FileImporter/>
            <div className="adder">
                <ContentAdder objectType="Categories" objects={storeState.categories}
                              addObject={storeActions.addCategory} removeObject={storeActions.deleteCategory}/>
                <ContentAdder objectType="Items" objects={storeState.items} addObject={storeActions.addItem}
                              removeObject={storeActions.deleteItem}/>
            </div>
            <FileSaver/>
            <div className="decide">
                <Button onClick={handleDecide}>Decide</Button>
            </div>
        </div>
    );
}

export default Home;