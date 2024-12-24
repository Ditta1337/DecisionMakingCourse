package com.polscydecydenci.decider.decider;

import com.polscydecydenci.decider.model.AlgorithmOutput;
import com.polscydecydenci.decider.model.CategoryAndConsistency;
import com.polscydecydenci.decider.model.DeciderQuestion;
import com.polscydecydenci.decider.model.Pair;
import lombok.AllArgsConstructor;
import org.json.JSONArray;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class AlgorithmOutputFormatter {
    @AllArgsConstructor
    private static class Question {
        private int item1Index;
        private int item2Index;
        private int categoryIndex; //if category index is -1 it means that the question is about categories
        private double consistencyRatio;
    }

    public static void fillAlgoritmOutput(AlgorithmOutput algorithmOutput, JSONObject jsonAlgorithmOutput, HashMap<String, Integer> itemsToIds, HashMap<String, Integer> categoriesToIds) {
        fillAlternativesRanking(algorithmOutput, jsonAlgorithmOutput, itemsToIds);

        HashMap<Integer, String> IdsToItems = reverseMap(itemsToIds);
        HashMap<Integer, String> IdsToCategories = reverseMap(categoriesToIds);
        JSONObject errors = jsonAlgorithmOutput.getJSONObject("errors");
        List<Question> questionsToSort = new ArrayList<>();
        fillConsistencyRatios(algorithmOutput, errors, IdsToCategories, questionsToSort);

        if (questionsToSort.isEmpty()) {
            algorithmOutput.setCategoryQuestions(List.of());
            algorithmOutput.setItemQuestions(List.of());
            return;
        }
        fillQuestions(algorithmOutput, questionsToSort, IdsToItems, IdsToCategories);
    }

    private static void fillAlternativesRanking(AlgorithmOutput algorithmOutput, JSONObject jsonAlgorithmOutput, HashMap<String, Integer> items) {
        JSONArray alternativesVector = jsonAlgorithmOutput.getJSONArray("final_alternatives_vector");
        ArrayList<String> alternativesRanking = new ArrayList<>(items.keySet());
        alternativesRanking.sort((item1, item2) -> Double.compare(alternativesVector.getDouble(items.get(item2)), alternativesVector.getDouble(items.get(item1))));
        algorithmOutput.setAlternativesRanking(alternativesRanking);
    }

    private static void fillConsistencyRatios(AlgorithmOutput algorithmOutput, JSONObject errors, HashMap<Integer, String> IdsToCategories, List<Question> questionsToSort) {
        double categoryMatrixConsistencyRatio = errors.getJSONObject("criteria").getDouble("consistency ratio");
        algorithmOutput.setCategoryMatrixConsistencyRatio(categoryMatrixConsistencyRatio);

        JSONArray categoriesPairs = errors.getJSONObject("criteria").getJSONArray("list of pairs");
        for (int i = 0; i < categoriesPairs.length(); i++) {
            JSONArray currentPair = categoriesPairs.getJSONArray(i);
            int item1Index = currentPair.getJSONArray(0).getInt(0);
            int item2Index = currentPair.getJSONArray(0).getInt(1);
            if (item1Index > item2Index) {
                int temp = item1Index;
                item1Index = item2Index;
                item2Index = temp;
            }
            double consistencyRatio = currentPair.getJSONArray(1).getDouble(0);
            if (consistencyRatio > 0.1) {
                questionsToSort.add(new Question(item1Index, item2Index, -1, consistencyRatio));
            }
        }
        List<CategoryAndConsistency> itemsMatrixConsistencyRatio = new ArrayList<>();
        String template = "alternatives for criterion ";
        for (int i = 0; i < IdsToCategories.size(); i++) {
            JSONObject alternatives = errors.getJSONObject(template + i);
            double matrixConsistencyRatio = alternatives.getDouble("consistency ratio");
            itemsMatrixConsistencyRatio.add(new CategoryAndConsistency(IdsToCategories.get(i), matrixConsistencyRatio));
            JSONArray currentListOfPairs = alternatives.getJSONArray("list of pairs");
            for (int j = 0; j < currentListOfPairs.length(); j++) {
                JSONArray currentPair = currentListOfPairs.getJSONArray(j);
                int item1Index = currentPair.getJSONArray(0).getInt(0);
                int item2Index = currentPair.getJSONArray(0).getInt(1);
                if (item1Index > item2Index) {
                    int temp = item1Index;
                    item1Index = item2Index;
                    item2Index = temp;
                }
                double consistencyRatio = currentPair.getJSONArray(1).getDouble(0);
                if (consistencyRatio > 0.1) {
                    questionsToSort.add(new Question(item1Index, item2Index, i, consistencyRatio));
                }
            }
        }
        algorithmOutput.setItemsMatrixConsistencyRatio(itemsMatrixConsistencyRatio);
    }

    private static void fillQuestions(AlgorithmOutput algorithmOutput, List<Question> questionsToSort, HashMap<Integer, String> idsToItems, HashMap<Integer, String> idsToCategories) {
        questionsToSort.sort((question1, question2) -> Double.compare(question2.consistencyRatio, question1.consistencyRatio));

        ArrayList<Pair> categoryQuestions = new ArrayList<>();
        ArrayList<DeciderQuestion> itemQuestions = new ArrayList<>();
        for (int i = 0; i < idsToCategories.size(); i++)
            itemQuestions.add(new DeciderQuestion(idsToCategories.get(i), new ArrayList<>()));
        for (int i = 0; i < 5; i++) {
            if (questionsToSort.size() == i) break;
            Question currentQuestion = questionsToSort.get(i);
            if (currentQuestion.categoryIndex == -1) {
                categoryQuestions.add(new Pair(idsToCategories.get(currentQuestion.item1Index), idsToCategories.get(currentQuestion.item2Index), 1));
            } else if (currentQuestion.consistencyRatio > 0.1) {
                itemQuestions.get(currentQuestion.categoryIndex).getPairs().add(new Pair(idsToItems.get(currentQuestion.item1Index), idsToItems.get(currentQuestion.item2Index), 1));
            }
        }
        algorithmOutput.setItemQuestions(itemQuestions);
        algorithmOutput.setCategoryQuestions(categoryQuestions);
        algorithmOutput.setCategoryQuestions(categoryQuestions);
    }

    private static HashMap<Integer, String> reverseMap(HashMap<String, Integer> map) {
        ArrayList<String> keys = new ArrayList<>(map.keySet());
        HashMap<Integer, String> newMap = new HashMap<>();
        for (String key : keys) {
            newMap.put(map.get(key), key);
        }
        return newMap;
    }
}