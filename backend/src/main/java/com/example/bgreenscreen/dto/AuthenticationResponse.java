package com.example.bgreenscreen.dto;

import com.example.bgreenscreen.model.Role;

import lombok.Data;

@Data
public class AuthenticationResponse {
    private String jwt ;
    private Long userId;
    private Role role;
}