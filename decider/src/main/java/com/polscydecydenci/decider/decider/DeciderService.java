package com.polscydecydenci.decider.decider;

import com.polscydecydenci.decider.model.*;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.File;
import java.io.InputStreamReader;
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
    public AlgorithmOutput checkAnswersList(DeciderQuestionnaire deciderQuestionnaire) {
        HashMap<String, Integer> items = makeNameToIntegerMap(deciderQuestionnaire.getItemQuestions().getFirst().getPairs());
        HashMap<String, Integer> categories = makeNameToIntegerMap(deciderQuestionnaire.getCategoryQuestions());
        double[][][] itemMatrices = new double[categories.size()][items.size()][items.size()];
        for(int i = 0;i < categories.size();i++){
            DeciderQuestion question = deciderQuestionnaire.getItemQuestions().get(i);
            itemMatrices[i] = makeComparisonMatrix(items, question.getPairs(), items.size());
        }
        double[][] categoryMatrix = makeComparisonMatrix(categories, deciderQuestionnaire.getCategoryQuestions(), categories.size());
        AlgorithmInput algorithmInput = new AlgorithmInput(items.keySet().stream().toList(),categories.keySet().stream().toList(), categoryMatrix ,itemMatrices);

        JSONObject jsonObject = executePython(algorithmInput.toJson());
        AlgorithmOutput algorithmOutput = new AlgorithmOutput();

        JSONArray jsonArray = jsonObject.getJSONArray("final_alternatives_vector");
        ArrayList<Double> alternativesVector = new ArrayList<>();
        for(int i = 0;i < jsonArray.length(); i++)alternativesVector.add(jsonArray.getDouble(i));
        algorithmOutput.setFinalAlternativesVector(alternativesVector);
        JSONObject errors = jsonObject.getJSONObject("errors");
        QuestionSorter.sortQuestionsAndValidateRatios(errors, algorithmOutput, items, categories);
//        for(DeciderQuestion dq: algorithmOutput.getItemQuestions()){
//            System.out.println(dq.getCategory());
//            for(Pair pair: dq.getPairs()){
//                System.out.println(pair.getItem1());
//                System.out.println(pair.getItem2());
//                System.out.println(pair.getDecider());
//            }
//        }
        return algorithmOutput;
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
    private JSONObject executePython(String input) {
        try {
            ClassPathResource resource = new ClassPathResource("deciderAlgorithm.py");
            File file = resource.getFile();

            ProcessBuilder processBuilder = new ProcessBuilder("python", file.getAbsolutePath(), input);

            System.out.println(processBuilder.command());
            System.out.println(processBuilder);
            processBuilder.environment().putAll(System.getenv());
            Process process = processBuilder.start();

            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            StringBuilder output = new StringBuilder();
            String line = "jd";
            while ((line = reader.readLine()) != null) {
                output.append(line);
            }

            return new JSONObject(output.toString());
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}