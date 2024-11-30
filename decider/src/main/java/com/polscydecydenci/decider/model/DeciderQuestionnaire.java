package com.polscydecydenci.decider.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
@Setter
@Getter
@AllArgsConstructor
public class DeciderQuestionnaire {
    private List<DeciderQuestion> itemQuestions;
    private List<Pair> categoryQuestions;
}
