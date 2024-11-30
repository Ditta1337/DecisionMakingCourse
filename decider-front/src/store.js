import {create} from "zustand";

export const useStore = create((set) => ({
    state: {
        categories: [],
        items: [],
        category_pairs: [],
        item_pairs: [],
    },
    actions: {
        setCategories: (categories) => set(state => ({state: {...state.state, categories}})),
        addCategory: (category) => set(state => ({
            state: {
                ...state.state,
                categories: [...state.state.categories, category]
            }
        })),
        deleteCategory: (category) => set(state => ({
            state: {
                ...state.state,
                categories: state.state.categories.filter(cat => cat !== category)
            }
        })),
        setItems: (items) => set(state => ({state: {...state.state, items}})),
        addItem: (item) => set(state => ({state: {...state.state, items: [...state.state.items, item]}})),
        deleteItem: (item) => set(state => ({
            state: {
                ...state.state,
                items: state.state.items.filter(it => it !== item)
            }
        })),
        deleteState: () => set({state: {categories: [], items: []}}),
        setCategoryPairs: (category_pairs) => set(state => ({state: {...state.state, category_pairs}})),
        setItemPairs: (item_pairs) => set(state => ({state: {...state.state, item_pairs}})),
        updateCategoryPair: (category_pair) => set(state => ({
            state: {
                ...state.state, category_pairs:
                    state.state.category_pairs.map(pair =>
                        pair.item1 === category_pair.item1 && pair.item2 === category_pair.item2 ?
                            category_pair : pair)
            }
        })),
        updateItemPair: (item_pair) => set(state => ({
            state: {
                ...state.state, item_pairs:
                    state.state.item_pairs.map(pair =>
                        pair.item1 === item_pair.item1 && pair.item2 === item_pair.item2 ?
                            item_pair : pair)
            }
        })),
    },
    selectors: {
        getCategories: (state) => state.state.categories,
        getItems: (state) => state.state.items
    }
}));