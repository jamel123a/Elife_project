package com.example.bgreenscreen.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.example.bgreenscreen.model.Video;
import com.example.bgreenscreen.model.VideoStatus;

import java.util.Optional;
import java.util.List;



public interface VideoRepository extends JpaRepository<Video,String>{
    Optional<Video> findByTitle(String title);
    List<Video> findByVideoStatus(VideoStatus status);
    Page<Video> findByVideoStatus(VideoStatus status, Pageable pageable);



}