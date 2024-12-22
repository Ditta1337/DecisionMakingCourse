package com.polscydecydenci.decider.model;

import com.fasterxml.jackson.databind.ObjectMapper;
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

    public String toJson(){
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            return objectMapper.writeValueAsString(this);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
