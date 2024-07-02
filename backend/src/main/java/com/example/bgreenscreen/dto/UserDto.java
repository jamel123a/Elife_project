package com.example.bgreenscreen.dto;


import com.example.bgreenscreen.model.Role;

import lombok.Data;

@Data
public class UserDto {
    
    private Long id;
    private String username;
    private String email;
    private String password;
    private Role role;
}