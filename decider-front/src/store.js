import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useStore = create(
    persist(
        (set) => ({
            categories: [],
            items: [],
            categoryPairs: [],
            itemPairs: [],
            currentCategoryPair: 0,
            currentItemPair: 0,
            setCategories: (categories) => set({ categories }),
            addCategory: (category) => set(state => ({
                categories: [...state.categories, category]
            })),
            deleteCategory: (category) => set(state => ({
                categories: state.categories.filter(cat => cat !== category)
            })),
            setItems: (items) => set({ items }),
            addItem: (item) => set(state => ({ items: [...state.items, item] })),
            deleteItem: (item) => set(state => ({
                items: state.items.filter(it => it !== item)
            })),
            deleteState: () => set({ categories: [], items: [] }),
            setCategoryPairs: (categoryPairs) => set({ categoryPairs }),
            setItemPairs: (itemPairs) => set({ itemPairs }),
            updateCategoryPair: (category_pair) => set(state => ({
                categoryPairs: state.categoryPairs.map(pair =>
                    pair.item1 === category_pair.item1 && pair.item2 === category_pair.item2 ?
                        category_pair : pair)
            })),
            updateItemPair: (item_pair) => set(state => ({
                itemPairs: state.itemPairs.map(pair =>
                    pair.category === item_pair.category ?
                        { ...pair, pairs: pair.pairs.map(p =>
                            p.item1 === item_pair.item1 && p.item2 === item_pair.item2 ?
                                item_pair : p) } : pair)
            })),
            incrementCurrentCategoryPair: () => set(state => ({
                currentCategoryPair: state.currentCategoryPair + 1
            })),
            decrementCurrentCategoryPair: () => set(state => ({
                currentCategoryPair: state.currentCategoryPair - 1
            })),
            incrementCurrentItemPair: () => set(state => ({
                currentItemPair: state.currentItemPair + 1
            })),
            decrementCurrentItemPair: () => set(state => ({
                currentItemPair: state.currentItemPair - 1
            })),
            resetCurrentCategoryPair: () => set({ currentCategoryPair: 0 }),
            resetCurrentItemPair: () => set({ currentItemPair: 0 }),
        }),
        {
            name: "store",
            getStorage: () => localStorage,
        }
    )
);