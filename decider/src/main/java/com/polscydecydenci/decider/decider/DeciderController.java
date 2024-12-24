package com.polscydecydenci.decider.decider;

import com.polscydecydenci.decider.model.AlgorithmOutput;
import com.polscydecydenci.decider.model.DeciderConfiguration;
import com.polscydecydenci.decider.model.DeciderQuestionnaire;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/decider")
public class DeciderController {
    private final DeciderService deciderService;

    @PostMapping("/configuration")
    public DeciderQuestionnaire receiveAndReturnDeciderConfiguration(@RequestBody DeciderConfiguration deciderConfiguration) {
        return deciderService.createQuestionList(deciderConfiguration);
    }

    @PostMapping("/answers")
    public AlgorithmOutput receiveAndReturnDeciderAnswers(@RequestBody DeciderQuestionnaire deciderQuestionnaire) {
        return deciderService.checkAnswersList(deciderQuestionnaire);
    }
}
