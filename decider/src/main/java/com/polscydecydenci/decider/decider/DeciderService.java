package com.polscydecydenci.decider.decider;

import com.polscydecydenci.decider.model.*;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
@Service
public class DeciderService {
    public DeciderQuestionnaire createQuestionList(DeciderConfiguration configuration) {
        List<String> items = configuration.getItems();
        List<String> categories = configuration.getCategories();
        int itemsSize = items.size();
        int categoriesSize = categories.size();
        if(itemsSize > 10 || categoriesSize > 10){
            throw new IllegalArgumentException();
        }
        List<DeciderQuestion> itemQuestions = new ArrayList<>();
        List<Pair> pairList = new ArrayList<>();
        for(int i = 0;i < itemsSize - 1;i++){
            for(int j = i + 1; j < itemsSize;j++){
                pairList.add(new Pair(items.get(i), items.get(j), .0));
            }
        }
        for(String category: categories) {
            itemQuestions.add(new DeciderQuestion(category, pairList));
        }
        List<Pair> categoryQuestions = new ArrayList<>();
        for(int i = 0;i < categoriesSize - 1;i++){
            for(int j = i + 1;j < categoriesSize;j++){
                categoryQuestions.add(new Pair(categories.get(i), categories.get(j), .0));
            }
        }
        return new DeciderQuestionnaire(itemQuestions, categoryQuestions);
    }
    public AlgorithmInput checkAnswersList(DeciderQuestionnaire deciderQuestionnaire) {
        HashMap<String, Integer> items = makeNameToIntegerMap(deciderQuestionnaire.getItemQuestions().getFirst().getPairs());
        HashMap<String, Integer> categories = makeNameToIntegerMap(deciderQuestionnaire.getCategoryQuestions());
        double[][][] itemMatrices = new double[categories.size()][items.size()][items.size()];
        for(int i = 0;i < categories.size();i++){
            DeciderQuestion question = deciderQuestionnaire.getItemQuestions().get(i);
            itemMatrices[i] = makeComparisonMatrix(items, question.getPairs(), items.size());
        }
        double[][] categoryMatrix = makeComparisonMatrix(categories, deciderQuestionnaire.getCategoryQuestions(), categories.size());
        return new AlgorithmInput(items.keySet().stream().toList(),categories.keySet().stream().toList(), categoryMatrix ,itemMatrices);
    }
    private HashMap<String, Integer> makeNameToIntegerMap(List<Pair> pairs){
        HashMap<String,Integer> map = new HashMap<>();
        map.put(pairs.getFirst().getItem1(), 0);
        int i = 1;
        for(Pair pair: pairs){
            if(map.containsKey(pair.getItem2())){
                break;
            } else{
                map.put(pair.getItem2(), i++);
            }
        }
        return map;
    }
    private double[][] makeComparisonMatrix(HashMap<String, Integer> map, List<Pair> pairs, int size){
        double[][] matrix = new double[size][size];
        for(int i = 0;i < size;i++){
            matrix[i][i] = 1;
        }
        for(Pair pair: pairs){
            int item1Number = map.get(pair.getItem1()), item2Number = map.get(pair.getItem2());
            matrix[item1Number][item2Number] = pair.getDecider();
            matrix[item2Number][item1Number] = 1/pair.getDecider();
        }
        return matrix;
    }
}
