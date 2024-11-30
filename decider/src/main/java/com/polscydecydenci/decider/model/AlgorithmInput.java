package com.polscydecydenci.decider.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class AlgorithmInput {
    List<String> alternativesNames;
    List<String> criteriaNames;
    private double[][] criteriaComparison;
    private double[][][] alternativesComparison;
}
