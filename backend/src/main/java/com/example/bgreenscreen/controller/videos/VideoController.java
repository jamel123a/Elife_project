package com.example.bgreenscreen.controller.videos;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.example.bgreenscreen.dto.UpdateVideoDto;
import com.example.bgreenscreen.dto.VideoDto;
import com.example.bgreenscreen.model.Video;
import com.example.bgreenscreen.model.VideoStatus;
import com.example.bgreenscreen.services.videos.VideoService;
import com.example.bgreenscreen.model.Role;


import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Optional;




@RestController
@RequestMapping("/api/videos")
@CrossOrigin("*")
@RequiredArgsConstructor
public class VideoController {

    @Autowired
    private VideoService videoService;


    
    @PostMapping("/upload")
    public Video uploadVideo(
            @RequestParam("file") MultipartFile file,
            @ModelAttribute VideoDto videoDto,
            @AuthenticationPrincipal UserDetails userDetails,
            HttpServletRequest request) {

                String userId = userDetails.getUsername();
                boolean isAdmin = userDetails.getAuthorities().stream()
                        .anyMatch(auth -> auth.getAuthority().equals("ADMIN"));    
              
     
        // Convert VideoDto to Video entity
        Video video = convertToEntity(videoDto);

        // Upload video (service method should handle file upload and video status based on isAdmin)
        return videoService.uploadVideo(file, video, userId, isAdmin);
    }

  





    @GetMapping("/public")
    public List<Video> getAllPublicVideos() {
        return videoService.getAllPublicVideos();
    }

    @GetMapping("/attende")
    public List<Video> getAllAttendeVideos(@AuthenticationPrincipal UserDetails userDetails) {
        boolean isAdmin = userDetails.getAuthorities().stream()
                .anyMatch(authority -> authority.getAuthority().equals(Role.ADMIN.name()));
        if (!isAdmin) {
            throw new SecurityException("Access denied");
        }
        return videoService.getAllAttendeVideos();
    }

    @GetMapping("/{videoId}")
    public Video getVideoById(@PathVariable String videoId) {
        return videoService.getVideoById(videoId)
                .orElseThrow(() -> new RuntimeException("Video not found"));
    }

    @PutMapping("/{videoId}")
    public Optional<Video> updateVideo(@PathVariable String videoId,
    @RequestBody UpdateVideoDto updateVideoDto,
     @AuthenticationPrincipal UserDetails userDetails) {
        boolean isAdmin = userDetails.getAuthorities().stream()
                .anyMatch(authority -> authority.getAuthority().equals(Role.ADMIN.name()));
        if (!isAdmin) {
            throw new SecurityException("Access denied");
        }
        return videoService.updateVideo(videoId, updateVideoDto);

    }

    @DeleteMapping("/{videoId}")
    public void deleteVideo(@PathVariable String videoId, @AuthenticationPrincipal UserDetails userDetails) {
        boolean isAdmin = userDetails.getAuthorities().stream()
                .anyMatch(authority -> authority.getAuthority().equals(Role.ADMIN.name()));
                System.out.println(isAdmin);

                
        if (!isAdmin) {
            throw new SecurityException("Access denied");

        }
        videoService.deleteVideoById(videoId);
    }


    

    @PutMapping("/{videoId}/status")
    public ResponseEntity<String> updateVideoStatus(
            @PathVariable String videoId,
            @RequestParam String newStatus,
            @AuthenticationPrincipal UserDetails userDetails) {

        try {


            boolean isAdmin = userDetails.getAuthorities().stream()
            .anyMatch(authority -> authority.getAuthority().equals("ROLE_ADMIN"));

          if (!isAdmin) {
               throw new SecurityException("Only admins can update video status.");
          }
            videoService.updateVideoStatusToPublic(videoId);
            return ResponseEntity.ok("Video status updated to PUBLIC");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update video status");
        }
    }


    private Video convertToEntity(VideoDto videoDto) {
        Video video = new Video();
        video.setId(videoDto.getId());
        video.setTitle(videoDto.getTitle());
        video.setVideoUrl(videoDto.getVideoUrl());
        video.setViews(videoDto.getViews());
        video.setDescription(videoDto.getDescription());
        video.setTags(videoDto.getTags());

        return video;
    }

   
}



