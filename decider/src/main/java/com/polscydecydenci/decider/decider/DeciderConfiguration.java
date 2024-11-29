package com.polscydecydenci.decider.decider;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class DeciderConfiguration {
    private List<String> categories;
    private List<String> items;
}
