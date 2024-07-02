package com.example.bgreenscreen.dto;

import lombok.Data;

@Data
public class AuthenticationResquest {
    private String email;
    private String password;
}