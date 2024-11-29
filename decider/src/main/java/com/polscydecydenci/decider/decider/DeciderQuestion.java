package com.polscydecydenci.decider.decider;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
@Getter
@Setter
@AllArgsConstructor
public class DeciderQuestion {
    private String category;
    private double weight;
    private List<Pair> pairs;
}
