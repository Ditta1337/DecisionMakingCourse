package com.polscydecydenci.decider.decider;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/decider")
public class DeciderController {
    private final DeciderService deciderService;
    @PostMapping
    public List<DeciderQuestion> receiveAndReturnDeciderConfiguration(@RequestBody DeciderConfiguration deciderConfiguration){
        return deciderService.createQuestionList(deciderConfiguration);
    }
}
