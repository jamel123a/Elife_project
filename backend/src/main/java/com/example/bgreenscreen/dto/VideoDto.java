package com.example.bgreenscreen.dto;

import java.util.Set;

import com.example.bgreenscreen.model.VideoStatus;

import lombok.Data;

@Data
public class VideoDto {

    private String id;
    private String title;
    private String videoUrl; // URL to the video file
    private int views;
    private String description;
    private Set<String> tags;
    private VideoStatus videoStatus;
}