import {create} from "zustand";

export const useStore = create((set) => ({
    state: {
        categories: [],
        items: []
    },
    actions: {
        setCategories: (categories) => set(state => ({...state, categories})),
        addCategory: (category) => set(state => ({...state, categories: [...state.categories, category]})),
        deleteCategory: (category) => set(state => ({...state, categories: state.categories.filter(cat => cat !== category)})),
        setItems: (items) => set(state => ({...state, items})),
        addItem: (item) => set(state => ({...state, items: [...state.items, item]})),
        deleteItem: (item) => set(state => ({...state, items: state.items.filter(it => it !== item)})),
        deleteState: () => set({categories: [], items: []})
    },
    selectors: {
        getCategories: (state) => state.categories,
        getItems: (state) => state.items
    }
}));

