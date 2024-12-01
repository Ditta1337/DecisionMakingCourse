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

    const store = useStore();

    const handleDecide = () => {
        if (store.categories.length < 2) {
            alert("Please add at least two categories");
            return;
        }
        if (store.items.length < 2) {
            alert("Please add at least two items to compare");
            return;
        }

        axios.post(`${BACKEND_URL}/decider/configuration`, {
            categories: store.categories,
            items: store.items
        }).then(response => {
            const category_pairs = response.data.category_questions;
            const item_pairs = response.data.item_questions;

            if (!category_pairs?.length || !item_pairs?.length) {
                console.error("Invalid response from server");
                return;
            }

            store.setCategoryPairs(category_pairs);
            store.setItemPairs(item_pairs);
            store.resetCurrentCategoryPair();
            store.resetCurrentItemPair();

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
                <ContentAdder objectType="Categories" objects={store.categories}
                              addObject={store.addCategory} removeObject={store.deleteCategory}/>
                <ContentAdder objectType="Items" objects={store.items} addObject={store.addItem}
                              removeObject={store.deleteItem}/>
            </div>
            <FileSaver/>
            <div className="decide">
                <Button onClick={handleDecide}>Decide</Button>
            </div>
        </div>
    );
}

export default Home;