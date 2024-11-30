package com.polscydecydenci.decider.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
public class Pair {
    private String item1;
    private String item2;
    private double decider;
}
