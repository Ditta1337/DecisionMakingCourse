package com.polscydecydenci.decider.model;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
public class AlgorithmOutput {
    private List<DeciderQuestion> itemQuestions; //item questions to correct
    private List<Pair> categoryQuestions; //category questions to correct
    private List<String> alternativesRanking; //items ratings
    private double categoryMatrixConsistencyRatio;
    private List<CategoryAndConsistency> itemsMatrixConsistencyRatio;
}
