package com.polscydecydenci.decider.model;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Getter;
import lombok.Setter;
import org.json.JSONArray;

import java.util.List;
@Setter
@Getter
public class AlgorithmOutput {
    private List<DeciderQuestion> itemQuestions; //item questions to correct
    private List<Pair> categoryQuestions; //category questions to correct
    private List<Double> finalAlternativesVector; //items ratings
    private double categoryMatrixConsistencyRatio;
    private List<CategoryAndConsistency> itemsMatrixConsistencyRatio;
}
