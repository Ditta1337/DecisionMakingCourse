package com.polscydecydenci.decider.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class DeciderQuestion {
    private String category;
    private List<Pair> pairs;
}
