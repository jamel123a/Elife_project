package com.example.bgreenscreen.services.videos;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.beans.factory.annotation.Value;

import com.example.bgreenscreen.dto.UpdateVideoDto;
import com.example.bgreenscreen.model.Video;
import com.example.bgreenscreen.model.VideoStatus;
import com.example.bgreenscreen.repository.VideoRepository;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;
import java.util.Optional;
import java.util.List;



@Service
public class VideoService   {


    @Value("${upload.directory}")
    private String uploadDirectory;

    @Autowired
    private VideoRepository videoRepository;

    public Video uploadVideo(MultipartFile file, Video video, String userId, boolean isAdmin) {

        // to check exist or no 
         Optional<Video> existingVideo = videoRepository.findByTitle(video.getTitle());
            if (existingVideo.isPresent()) {
                throw new IllegalArgumentException("A video with the same title already exists.");
            }
        // Validate file type
        if (!isValidFileType(file)) {
            throw new IllegalArgumentException("Only video files are allowed.");
        }

        // Save the file to the specified directory
        String fileName = saveFile(file);

        // Generate video ID from title
        video.setId(generateVideoId(video.getTitle()));
        video.setVideoUrl(fileName); 
        video.setViews(0);
        video.setUserId(userId);
        video.setVideoStatus(isAdmin ? VideoStatus.PUBLIC : VideoStatus.ATTENDE);

        // Save video to the database
        return videoRepository.save(video);

    
    }

    private String generateVideoId(String title) {
        // Replace spaces with hyphens and make lowercase
        return title.toLowerCase().replaceAll("\\s+", "-");
    }

    private boolean isValidFileType(MultipartFile file) {
        // Check if the file content type is a video type
        String contentType = file.getContentType();
        if (contentType != null) {
            return contentType.startsWith("video/");
        }
        return false;
    }

    private String saveFile(MultipartFile file) {
        try {
            String originalFileName = StringUtils.cleanPath(file.getOriginalFilename());
            String fileName = UUID.randomUUID().toString() + "_" + originalFileName;
            Path directoryPath = Paths.get(uploadDirectory);
            Path filePath = directoryPath.resolve(fileName);

            // Create directories if they do not exist
            if (!Files.exists(directoryPath)) {
                Files.createDirectories(directoryPath);
            }

            // Log debug information
            System.out.println("Saving file to: " + filePath.toAbsolutePath());

            // Save the file to test
            Files.copy(file.getInputStream(), filePath);

            // Log success to test
            System.out.println("File saved successfully: " + fileName);

            return filePath.toString();
        } catch (IOException e) {
            System.err.println("Failed to save video file: " + e.getMessage());
            throw new RuntimeException("Failed to save video file", e);
        }
    }

    public List<Video> getAllPublicVideos() {
        return videoRepository.findByVideoStatus(VideoStatus.PUBLIC);
    }


    public List<Video> getAllAttendeVideos() {
        return videoRepository.findByVideoStatus(VideoStatus.ATTENDE);
    }

    public Optional<Video> getVideoById(String videoId) {
        return videoRepository.findById(videoId);
    }

     public Optional<Video> updateVideo(String videoId, UpdateVideoDto updateVideoDto) {
        return videoRepository.findById(videoId).map(video -> {
            video.setTitle(updateVideoDto.getTitle());
            video.setDescription(updateVideoDto.getDescription());
            video.setTags(updateVideoDto.getTags());
            return videoRepository.save(video);
        });
    }
    public void deleteVideoById(String videoId) {
        videoRepository.deleteById(videoId);
    }

    public Video updateVideoStatus(String videoId, VideoStatus newStatus) {
        Optional<Video> videoOptional = videoRepository.findById(videoId);
        if (videoOptional.isPresent()) {
            Video video = videoOptional.get();
            video.setVideoStatus(newStatus);
            return videoRepository.save(video);
        } else {
            throw new IllegalArgumentException("Video not found");
        }
    }


}
