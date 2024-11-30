package com.polscydecydenci.decider.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ItemMatrix {
    private String category;
    private double[][] comparison;
}
