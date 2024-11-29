package com.polscydecydenci.decider.decider;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
@Service
public class DeciderService {
    public List<DeciderQuestion> createQuestionList(DeciderConfiguration configuration) {
        int itemsSize = configuration.getItems().size();
        List<String> items = configuration.getItems();
        List<DeciderQuestion> questionList = new ArrayList<>();
        for (String category : configuration.getCategories()) {
            List<Pair> pairList = new ArrayList<>();
            for (int i = 0; i < itemsSize - 1; i++) {
                for (int j = i + 1; j < itemsSize; j++) {
                    pairList.add(new Pair(items.get(i), items.get(j), .0));
                }
            }
            questionList.add(new DeciderQuestion(category, .0, pairList));
        }
        return questionList;
    }
}
