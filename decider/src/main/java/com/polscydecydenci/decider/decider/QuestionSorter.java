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
import java.util.Objects;

public class QuestionSorter {
    @AllArgsConstructor
    private static class Question{
        private int item1Index;
        private int item2Index;
        private int categoryIndex; //if category index is -1 it means that the question is about categories
        private double consistencyRatio;
    }
    public static void sortQuestionsAndValidateRatios(JSONObject errors, AlgorithmOutput algorithmOutput, HashMap<String, Integer> items, HashMap<String, Integer> categories){
        boolean necceseryToReturnQuestions = false;
        double categoryMatrixConsistencyRatio = errors.getJSONObject("criteria").getDouble("consistency ratio");
        if(categoryMatrixConsistencyRatio > 0.1)necceseryToReturnQuestions = true;
        algorithmOutput.setCategoryMatrixConsistencyRatio(categoryMatrixConsistencyRatio);

        List<Question> questionsToSort = new ArrayList<>();
        JSONArray categoriesPairs = errors.getJSONObject("criteria").getJSONArray("list of pairs");
        for(int i = 0;i < categoriesPairs.length(); i++){
            JSONArray currentPair = categoriesPairs.getJSONArray(i);
            int item1Index = currentPair.getJSONArray(0).getInt(0);
            int item2Index = currentPair.getJSONArray(0).getInt(1);
            if(item1Index > item2Index){
                int temp = item1Index;
                item1Index = item2Index;
                item2Index = temp;
            }
            double consistencyRatio = currentPair.getJSONArray(1).getDouble(0);
            if(consistencyRatio > 0.1)necceseryToReturnQuestions = true;
            questionsToSort.add(new Question(item1Index, item2Index, -1, consistencyRatio));
        }
        List<CategoryAndConsistency> itemsMatrixConsistencyRatio = new ArrayList<>();
        String template = "alternatives for criterion ";
        for(int i = 0;i < categories.size(); i++){
            JSONObject alternatives = errors.getJSONObject(template + i);
            double matrixConsistencyRatio = alternatives.getDouble("consistency ratio");
            if(matrixConsistencyRatio > 0.1) necceseryToReturnQuestions = true;
            itemsMatrixConsistencyRatio.add(new CategoryAndConsistency(findKeyByValue(categories, i), matrixConsistencyRatio));
            JSONArray currentListOfPairs = alternatives.getJSONArray("list of pairs");
            for(int j = 0;j < currentListOfPairs.length(); j++){
                JSONArray currentPair = currentListOfPairs.getJSONArray(j);
                int item1Index = currentPair.getJSONArray(0).getInt(0);
                int item2Index = currentPair.getJSONArray(0).getInt(1);
                if(item1Index > item2Index){
                    int temp = item1Index;
                    item1Index = item2Index;
                    item2Index = temp;
                }
                double consistencyRatio = currentPair.getJSONArray(1).getDouble(0);
                if(consistencyRatio > 0.1)necceseryToReturnQuestions = true;
                questionsToSort.add(new Question(item1Index, item2Index, i, consistencyRatio));
            }
        }
        algorithmOutput.setItemsMatrixConsistencyRatio(itemsMatrixConsistencyRatio);
        if(!necceseryToReturnQuestions){
            algorithmOutput.setCategoryQuestions(List.of());
            algorithmOutput.setItemQuestions(List.of());
            return;
        }
        questionsToSort.sort((question1, question2) -> Double.compare(question2.consistencyRatio, question1.consistencyRatio));
        ArrayList<Pair> categoryQuestions = new ArrayList<>();
        ArrayList<DeciderQuestion> itemQuestions = new ArrayList<>();
        for(int i = 0;i < categories.size(); i++)itemQuestions.add(new DeciderQuestion(findKeyByValue(categories, i), new ArrayList<>()));
        for(int i = 0;i < 5; i++){
            if(questionsToSort.size() == i)break;
            Question currentQuestion = questionsToSort.get(i);
            if(currentQuestion.categoryIndex == -1){
                categoryQuestions.add(new Pair(findKeyByValue(categories, currentQuestion.item1Index), findKeyByValue(categories, currentQuestion.item2Index), 0));
            }
            else if(currentQuestion.consistencyRatio > 0.1){
                itemQuestions.get(currentQuestion.categoryIndex).getPairs().add(new Pair(findKeyByValue(items, currentQuestion.item1Index), findKeyByValue(items, currentQuestion.item2Index), 0));
            }
        }
        algorithmOutput.setItemQuestions(itemQuestions);
        algorithmOutput.setCategoryQuestions(categoryQuestions);
        algorithmOutput.setCategoryQuestions(categoryQuestions);
    }
    private static String findKeyByValue(HashMap<String, Integer> map, Integer value){
        for(String key: map.keySet()){
            if(Objects.equals(map.get(key), value)){
                return key;
            }
        }
        return null;
    }
}