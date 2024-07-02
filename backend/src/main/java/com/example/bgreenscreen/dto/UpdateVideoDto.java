package com.example.bgreenscreen.dto;

import java.util.Set;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor

public class UpdateVideoDto {
    private String title;
    private String description;
    private Set<String> tags;
}