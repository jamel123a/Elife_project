package com.example.bgreenscreen.model;

import java.util.Set;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name ="video")
public class Video {

    @Id
    private String id;
    private String title;
    private String videoUrl; // URL to the video file
    private int views;
    private String description;
    private Set<String> tags;
    private VideoStatus  videoStatus;
    private String UserId;




    public void setStatusToPublic() {
        this.videoStatus = VideoStatus.PUBLIC;
    }
    
}

